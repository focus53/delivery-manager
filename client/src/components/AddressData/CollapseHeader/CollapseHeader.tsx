import React from 'react';
import { Row, Col } from 'antd';
import { Routing } from '../../../Redux/delivery/deliveryInterface';

type Props = {
  routing: Routing[];
  selectedDate: string;
  storageArea: string;
};

export const CollapseHeader: React.FC<Props> = (props) => {
  const date = props.routing.find((el) => el.date === props.selectedDate);
  const deliveries = date?.[props.storageArea] || [];

  return (
    <Row gutter={10}>
      <Col span={8}>{props.storageArea}</Col>
      <Col span={4} offset={12}>
        {deliveries.length || ''}
      </Col>
    </Row>
  );
};
