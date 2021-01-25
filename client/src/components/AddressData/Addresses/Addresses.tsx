import { Button } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import React from 'react';
import { Routing } from '../../../Redux/delivery/deliveryInterface';
type Props = {
  routing: Routing[];
  selectedDate: string;
  storageArea: string;
  deleteAddress: (index: number, storageArea: string, id: number) => void;
};

export const Addresses: React.FC<Props> = (props) => {
  const date = props.routing.find((el) => el.date === props.selectedDate);
  const deliveries = date?.[props.storageArea] || [];

  return (
    <>
      {deliveries.map((el, index) => {
        return (
          <div key={index}>
            {`${index + 1}: ${el.address}`}{' '}
            <Button onClick={() => props.deleteAddress(index, props.storageArea, el.id)} size="small">
              <MinusOutlined />
            </Button>
          </div>
        );
      })}
    </>
  );
};
