import React, { useState } from 'react';
import { Table, Tag, Card, Timeline, Button } from 'antd';
import { connect } from 'react-redux';

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

  // This find mutates state !!!
  const data =
    props.routing.some((el) => el.date === props.selectedDate) &&
    props.routing.find((el) => el.date === props.selectedDate)[props.selectedStorage] &&
    props.routing
      .find((el) => el.date === props.selectedDate)
      [props.selectedStorage].sort((a, b) => {
        return parseInt(a.timeDelivery) - parseInt(b.timeDelivery);
      });
  return (
    <>
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedStorage: state.addressReducer.selectedStorage,
    routing: state.addressReducer.routing,
    selectedDate: state.addressReducer.selectedDate,
  };
};

export default connect(mapStateToProps)(TableAddressData);
