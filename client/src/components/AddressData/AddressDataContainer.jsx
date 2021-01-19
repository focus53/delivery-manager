import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Divider, Collapse, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { MapsLink } from './MapsLink/MapsLink';
import Start from './Start/Start';
import { CollapseHeader } from './CollapseHeader/CollapseHeader';
import { Addresses } from './Addresses/Addresses';
import { AddressForm } from './AddressForm/AddressForm';
import { addNewAddressTC, deleteAddressTC, selectedStorageTC } from '../../Redux/delivery/deliveryThunkCreators';
import deliveryReducer from '../../Redux/delivery/deliveryReducer';

const { Panel } = Collapse;

const AddressDataContainer = (props) => {
  const [addMode, setAddMode] = useState(false);
  const [start, setStart] = useState('');

  const callback = (key) => {
    props.selectedStorageTC(key);
  };

  const handleSubmit = (e, street, streetNumber, postCode, timeDelivery, load, description) => {
    e.preventDefault();
    setAddMode(false);
    let newAddressToString = `${street} ${streetNumber}, ${postCode}`;
    props.addNewAddressTC(newAddressToString, props.selectedDate, start, props.userId, timeDelivery, load, description);
  };

  const deleteAddress = (index, storage, deliveryId) => {
    props.deleteAddressTC(index, props.selectedDate, storage, props.storages, deliveryId);
  };

  const changeHandler = (e) => {
    setStart(e.target.value);
  };

  return (
    <Row gutter={[10, 10]} style={{ minHeight: '10rem' }}>
      <Col span={24}>
        <Divider style={{ border: '#1890ff' }} orientation="left">
          {props.selectedDate}
        </Divider>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Collapse onChange={callback} accordion>
              {props.storages.map((el, index) => (
                <Panel
                  header={<CollapseHeader routing={props.routing} selectedDate={props.selectedDate} storageArea={el} />}
                  key={el}
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
          <Button
            icon={addMode ? <MinusOutlined /> : <PlusOutlined />}
            onClick={() => setAddMode((prevState) => !prevState)}
          >
            Add new address
          </Button>
        </Row>
        <Row gutter={[5, 5]}>
          {addMode && (
            <div>
              <Start onChange={changeHandler} start={start} storages={props.storages} />
              <AddressForm handleSubmit={handleSubmit} start={start} />
            </div>
          )}
        </Row>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDate: state.deliveryReducer.selectedDate,
    routing: state.deliveryReducer.routing,
    mapsLink: state.deliveryReducer.mapsLink,
    storages: state.userReducer.userStorages,
    defaultLinks: state.mapsLink,
    userId: state.userReducer.userId,
  };
};

// @TODO use useDispatch redux hook

export default connect(mapStateToProps, {
  addNewAddressTC,
  deleteAddressTC,
  selectedStorageTC,
})(AddressDataContainer);
