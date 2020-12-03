import { Button } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import React from 'react';

export const Addresses = (props) => {
  return (
    <>
      {props.routing.some((el) => el.date === props.selectedDate) && (
        <p>
          {props.routing.find((el) => el.date === props.selectedDate)[`${props.storageArea}`] &&
            props.routing
              .find((el) => el.date === props.selectedDate)
              [`${props.storageArea}`].map((el, index) => (
                <div key={index}>
                  {`${index + 1}: ${el}`}{' '}
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => props.deleteAddress(index, `${props.storageArea}`)}
                    size="small"
                  ></Button>
                </div>
              ))}
        </p>
      )}
    </>
  );
};
