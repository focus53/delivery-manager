import React, { useState } from 'react';
import { Input, Col, Row, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

// Input form for storages
export const StorageForm = (props) => {
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [postCode, setPostCode] = useState('');
  const [storageName, setStorageName] = useState('');

  return (
    <form onSubmit={(e) => props.handleSubmitNewStorage(e, street, streetNumber, postCode, storageName)}>
      <Input.Group size="small">
        <Row gutter={[5, 10]}>
          <Input placeholder="Name for storage" value={storageName} onChange={(e) => setStorageName(e.target.value)} />
        </Row>
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
        <Button type="primary" htmlType="submit">
          Submit <SendOutlined />
        </Button>
      </Input.Group>
    </form>
  );
};
