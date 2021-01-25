import React, { useState } from 'react';
import { Input, Col, Row, Button, TimePicker, InputNumber } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { DeliveryForm } from '../../../Redux/delivery/deliveryInterface';

const { TextArea } = Input;

type Props = {
  start: string;
  handleSubmit: (deliveryData: DeliveryForm) => void;
};

// Input form for address
export const AddressForm: React.FC<Props> = (props) => {
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [postCode, setPostCode] = useState('');
  const [timeDelivery, setTimeDelivery] = useState('');
  const [load, setLoad] = useState(0);
  const [description, setDescription] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit({ street, streetNumber, postCode, timeDelivery, load, description });
      }}
    >
      <Input.Group size="small">
        <Row gutter={[5, 10]}>
          <Col span={12}>
            <Input placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
          </Col>
          <Col span={5}>
            <Input placeholder="Number" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} />
          </Col>
          <Col span={7}>
            <Input placeholder="Postcode" value={postCode} onChange={(e) => setPostCode(e.target.value)} />
          </Col>
        </Row>
        <Row gutter={[5, 10]}>
          <Col span={7}>
            Time: <TimePicker onChange={(time, timeString) => setTimeDelivery(timeString)} format={'HH:mm'} />
          </Col>
        </Row>
        <Row gutter={[5, 10]}>
          <Col span={7}>
            Load:{' '}
            <InputNumber
              value={load}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value?.replace('%', '') || ''}
              onChange={(val) => {
                setLoad(Number(val) || 0);
              }}
            />
          </Col>
        </Row>
        <Row gutter={[5, 10]}>
          <Col span={10}>
            <TextArea
              rows={3}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>

        <Button disabled={!props.start} type="primary" htmlType="submit">
          Submit <SendOutlined />
        </Button>
      </Input.Group>
    </form>
  );
};
