import React, { useState } from 'react';
import { Table, Tag, Card, Timeline, Button } from 'antd';
import { connect } from 'react-redux';
import { MinusOutlined } from '@ant-design/icons';

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

/*const data = [
  {
    key: '1',
    number: 1,
    name: 'John Brown',
    load: 10,
    address: 'New York No. 1 Lake Park',
    time: '11-00',
    descriptions: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
  },
  {
    key: '2',
    number: 2,
    name: 'John Brown',
    load: 40,
    address: 'New York No. 1 Lake Park',
    time: '15-00',
    descriptions: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
  },
];*/

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
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Descriptions',
    dataIndex: 'descriptions',
    key: 'descriptions',
  },
];

const TableAddressData = (props) => {
  const [tab, setTab] = useState('table');

  const data =
    props.routing.some((el) => el.date === props.selectedDate) &&
    props.routing.find((el) => el.date === props.selectedDate)[props.selectedStorage] &&
    props.routing.find((el) => el.date === props.selectedDate)[props.selectedStorage];

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
        {tab === 'table' && <Table columns={columns} dataSource={data} pagination={false} />}
        {tab === 'timeline' && (
          <Timeline mode="left">
            {data.map((el) => {
              return <Timeline.Item label={el.time}>{el.address}</Timeline.Item>;
            })}
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
