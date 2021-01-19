import React, { useState, useMemo } from 'react';
import { Table, Tag, Card, Timeline } from 'antd';
import { connect } from 'react-redux';
import deliveryReducer from '../../Redux/delivery/deliveryReducer';

const tabList = [
  {
    key: 'table',
    tab: 'Table',
  },
  {
    key: 'timeline',
    tab: 'Timeline',
  },
];

const columns = [
  {
    title: '№',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Load %',
    key: 'load',
    dataIndex: 'load',
    render: (load) => {
      let color;
      if (load <= 25) {
        color = 'green';
      } else if (load > 25 && load <= 50) {
        color = 'geekblue';
      } else if (load > 50 && load <= 75) {
        color = 'orange';
      } else if (load > 75) {
        color = 'red';
      }
      return (
        <Tag color={color} key={load}>
          {load}
        </Tag>
      );
    },
  },
  {
    title: 'Time',
    dataIndex: 'timeDelivery',
    key: 'timeDelivery',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];

const TableAddressData = (props) => {
  const [tab, setTab] = useState('table');

  const data = useMemo(() => {
    let data = [];
    const date = props.routing.find((el) => el.date === props.selectedDate);

    if (date !== undefined && date[props.selectedStorage]) {
      data = [...date[props.selectedStorage]];
      data.sort((a, b) => {
        return parseInt(a.timeDelivery) - parseInt(b.timeDelivery);
      });
    }
    return data;
  }, [props.routing, props.selectedStorage, props.selectedDate]);

  return (
    <Card
      style={{ width: '100%' }}
      title={props.selectedStorage}
      tabList={tabList}
      onTabChange={(key) => {
        setTab(key);
      }}
    >
      {tab === 'table' && (data ? <Table columns={columns} dataSource={data} pagination={false} /> : <Table />)}
      {tab === 'timeline' && (
        <Timeline mode="left">
          {data ? data.map((el) => <Timeline.Item label={el.timeDelivery}>{el.address}</Timeline.Item>) : <Table />}
        </Timeline>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedStorage: state.deliveryReducer.selectedStorage,
    routing: state.deliveryReducer.routing,
    selectedDate: state.deliveryReducer.selectedDate,
  };
};

export default connect(mapStateToProps)(TableAddressData);
