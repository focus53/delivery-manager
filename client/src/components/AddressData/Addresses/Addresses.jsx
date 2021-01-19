import { Button } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import React from 'react';

export const Addresses = (props) => {
  const date = props.routing.find((el) => el.date === props.selectedDate);
  const deliveries = date ? date[props.storageArea] : [];

  return (
    <p>
      {deliveries.map((el, index) => {
        return (
          <div key={index}>
            {`${index + 1}: ${el.address}`}{' '}
            <Button onClick={() => props.deleteAddress(index, `${props.storageArea}`, el.id)} size="small">
              <MinusOutlined />
            </Button>
          </div>
        );
      })}
    </p>
  );
};
