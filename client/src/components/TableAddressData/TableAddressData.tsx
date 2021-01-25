import React, { useState, useMemo } from 'react';
import { Table, Tag, Card, Timeline } from 'antd';
import { useSelector } from 'react-redux';
import { routingSelector, selectedDateSelector, selectedStorageSelector } from '../../Redux/delivery/deliverySelectors';
import { Delivery } from '../../Redux/delivery/deliveryInterface';

import { ColumnsType } from 'antd/es/table';

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

const columns: ColumnsType<object> = [
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

const TableAddressData: React.FC = () => {
  const [tab, setTab] = useState('table');

  const selectedStorage = useSelector(selectedStorageSelector);
  const routing = useSelector(routingSelector);
  const selectedDate = useSelector(selectedDateSelector);

  const data = useMemo(() => {
    let data: Delivery[] = [];
    const date = routing.find((el) => el.date === selectedDate);

    if (date !== undefined && date[selectedStorage]) {
      data = [...date[selectedStorage]];
      data.sort((a, b) => {
        return parseInt(a.timeDelivery) - parseInt(b.timeDelivery);
      });
    }
    return data;
  }, [routing, selectedStorage, selectedDate]);

  return (
    <Card
      onTabChange={(key) => {
        setTab(key);
      }}
      style={{ width: '100%' }}
      title={selectedStorage}
      tabList={tabList}
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

export default TableAddressData;
