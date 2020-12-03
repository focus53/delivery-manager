import React from 'react';
import { Row, Col } from 'antd';

export const CollapseHeader = (props) => {
  return (
    <Row gutter={10}>
      <Col span={8}>{props.storageArea}</Col>
      <Col span={4} offset={12}>
        {props.routing.some((el) => el.date === props.selectedDate)
          ? props.routing.find((el) => el.date === props.selectedDate)[props.storageArea] &&
            props.routing.find((el) => el.date === props.selectedDate)[props.storageArea].length
          : ''}
      </Col>
    </Row>
  );
};
