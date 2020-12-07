import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AddressForm } from './AddressForm/AddressForm';
import {
  addNewAddressTC,
  haveAddressTC,
  deleteAddressTC,
  updateLinkToMapsTC,
  setStartPointTC,
  setDateTC,
} from '../Redux/address-reducer';
import { Row, Col, Divider, Collapse, Button } from 'antd';
import Start from './Start/Start';
import { PlusOutlined } from '@ant-design/icons';
import { MapsLink } from './MapsLink/MapsLink';
import { CollapseHeader } from './CollapseHeader/CollapseHeader';
import { Addresses } from './Addresses/Addresses';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

// Address component
const AddressDataContainer = (props) => {
  const [addMode, setAddMode] = useState(false);
  const [start, setStart] = useState('JAC');

  const handleSubmit = (e, street, streetNumber, postCode) => {
    e.preventDefault();
    setAddMode(false);
    let newAddressToString = `${street} ${streetNumber}, ${postCode}`;
    props.addNewAddressTC(newAddressToString, props.selectedDate, start);
  };

  const toggleModeHandle = (e) => {
    addMode ? setAddMode(false) : setAddMode(true);
    props.haveAddressTC(props.selectedDate);
  };

  const deleteAddress = (index, storage) => {
    props.deleteAddressTC(index, props.selectedDate, storage);
  };

  const changeHandler = (e) => {
    setStart(e.target.value);
  };

  return (
    <div>
      <Row gutter={[10, 10]} style={{ minWidth: '108rem', minHeight: '10rem' }}>
        <Col span={5}>
          <Divider style={{ border: '#1890ff' }} orientation="left">
            {props.selectedDate}
          </Divider>
          <Row gutter={[10, 10]}>
            <Col span={20}>
              <Collapse onChange={callback} accordion>
                {props.storages.map((el, index) => (
                  <Panel
                    header={
                      <CollapseHeader routing={props.routing} selectedDate={props.selectedDate} storageArea={el} />
                    }
                    key={index + 1}
                  >
                    <Addresses
                      routing={props.routing}
                      selectedDate={props.selectedDate}
                      deleteAddress={deleteAddress}
                      storageArea={el}
                    />
                    <MapsLink
                      selectedDate={props.selectedDate}
                      routing={props.routing}
                      storageLinkMethod={`${el}`}
                      defaultLink={props.mapsLink[el]}
                    />
                  </Panel>
                ))}
              </Collapse>
            </Col>
          </Row>
          <Row gutter={[5, 5]}>
            <Button icon={<PlusOutlined />} onClick={toggleModeHandle}>
              Add new address
            </Button>
          </Row>
          <Row gutter={[5, 5]}>
            {addMode && (
              <div>
                <Start onChange={changeHandler} start={start} storages={props.storages} />
                <AddressForm handleSubmit={handleSubmit} />
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    selectedDate: store.addressReducer.selectedDate,
    routing: store.addressReducer.routing,
    mapsLink: store.addressReducer.mapsLink,
    storages: store.addressReducer.storages,
    defaultLinks: store.mapsLink,
  };
};

export default connect(mapStateToProps, {
  addNewAddressTC,
  haveAddressTC,
  deleteAddressTC,
  updateLinkToMapsTC,
  setStartPointTC,
  setDateTC,
})(AddressDataContainer);
