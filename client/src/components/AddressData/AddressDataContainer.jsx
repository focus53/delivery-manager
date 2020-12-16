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
  addNewAddressStorageTC,
} from '../Redux/address-reducer';
import { logoutTC } from '../Redux/user-reducer';
import { Row, Col, Divider, Collapse, Button } from 'antd';
import Start from './Start/Start';
import { PlusOutlined } from '@ant-design/icons';
import { MapsLink } from './MapsLink/MapsLink';
import { CollapseHeader } from './CollapseHeader/CollapseHeader';
import { Addresses } from './Addresses/Addresses';
import { StorageForm } from './StorageForm/StorageForm';

const { Panel } = Collapse;

function callback(key) {
  return;
}

// Address component
const AddressDataContainer = (props) => {
  const [addMode, setAddMode] = useState(false);
  const [addModeStorage, setAddModeStorage] = useState(false);
  const [start, setStart] = useState('JAC');

  const handleSubmit = (e, street, streetNumber, postCode) => {
    e.preventDefault();
    setAddMode(false);
    let newAddressToString = `${street} ${streetNumber}, ${postCode}`;
    props.addNewAddressTC(newAddressToString, props.selectedDate, start, props.userId);
  };

  const handleSubmitNewStorage = (e, street, streetNumber, postCode, storageName) => {
    e.preventDefault();
    setAddModeStorage(false);
    let newAddressStorageToString = `${street} ${streetNumber}, ${postCode}`;
    props.addNewAddressStorageTC(newAddressStorageToString, storageName);
  };

  const deleteAddress = (index, storage) => {
    props.deleteAddressTC(index, props.selectedDate, storage, props.storages);
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
            <Button icon={<PlusOutlined />} onClick={() => (addMode ? setAddMode(false) : setAddMode(true))}>
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
          <Row gutter={[5, 5]}>
            <Button
              icon={<PlusOutlined />}
              onClick={() => (addModeStorage ? setAddModeStorage(false) : setAddModeStorage(true))}
            >
              Add new storage
            </Button>
          </Row>
          <Row>
            <Button
              onClick={() => {
                props.logoutTC();
              }}
            >
              Logout
            </Button>
          </Row>
          <Row>{addModeStorage && <StorageForm handleSubmitNewStorage={handleSubmitNewStorage} />}</Row>
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
    userId: store.userReducer.userId,
  };
};

export default connect(mapStateToProps, {
  addNewAddressTC,
  haveAddressTC,
  deleteAddressTC,
  updateLinkToMapsTC,
  setStartPointTC,
  setDateTC,
  addNewAddressStorageTC,
  logoutTC,
})(AddressDataContainer);
