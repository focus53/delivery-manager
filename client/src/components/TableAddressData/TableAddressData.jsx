import React, { useState } from 'react';
import { Table, Tag, Card, Timeline } from 'antd';

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

const data = [
  {
    key: '1',
    number: 1,
    name: 'John Brown',
    load: 10,
    address: 'New York No. 1 Lake Park',
    descriptions: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam cum dignissimos doloremque
      incidunt`,
  },
  {
    key: '2',
    number: 2,
    name: 'John Brown',
    load: 40,
    address: 'New York No. 1 Lake Park',
    descriptions: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam cum dignissimos doloremque
      incidunt `,
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
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Descriptions',
    dataIndex: 'descriptions',
    key: 'descriptions',
  },
];

const TableAddressData = () => {
  const [tab, setTab] = useState('table');

  return (
    <>
      <Card
        style={{ width: '100%' }}
        title="Card title"
        tabList={tabList}
        onTabChange={(key) => {
          setTab(key);
        }}
      >
        {tab === 'table' && <Table columns={columns} dataSource={data} pagination={false} />}
        {tab === 'timeline' && (
          <Timeline mode="left">
            <Timeline.Item label={'2015-09-01'}>Create a services site </Timeline.Item>
            <Timeline.Item label={'2015-09-01'} color="green">
              Solve initial network problems
            </Timeline.Item>

            <Timeline.Item label={'2015-09-01'} color="red">
              Network problems being solved
            </Timeline.Item>
            <Timeline.Item label={'2015-09-01'}>Create a services site </Timeline.Item>
          </Timeline>
        )}
      </Card>
    </>
  );
};

export default TableAddressData;
