import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Divider, Collapse, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { MapsLink } from './MapsLink/MapsLink';
import Start from './Start/Start';
import { CollapseHeader } from './CollapseHeader/CollapseHeader';
import { Addresses } from './Addresses/Addresses';
import { AddressForm } from './AddressForm/AddressForm';
import { addNewAddressTC, deleteAddressTC, selectedStorageTC } from '../../Redux/delivery/deliveryThunkCreators';
import {
  defaultLinksSelector,
  mapsLinkSelector,
  routingSelector,
  selectedDateSelector,
} from '../../Redux/delivery/deliverySelectors';
import { userIdSelector, userStoragesSelector } from '../../Redux/user/userSelectors';

const { Panel } = Collapse;

const AddressDataContainer = () => {
  const dispatch = useDispatch();

  const [addMode, setAddMode] = useState(false);
  const [start, setStart] = useState('');

  const selectedDate = useSelector(selectedDateSelector);
  const routing = useSelector(routingSelector);
  const mapsLink = useSelector(mapsLinkSelector);
  const storages = useSelector(userStoragesSelector);
  // const defaultLinks = useSelector(defaultLinksSelector);
  const userId = useSelector(userIdSelector);

  const callback = (key) => {
    dispatch(selectedStorageTC(key));
  };

  const handleSubmit = (e, street, streetNumber, postCode, timeDelivery, load, description) => {
    e.preventDefault();
    setAddMode(false);
    let newAddressToString = `${street} ${streetNumber}, ${postCode}`;
    dispatch(addNewAddressTC(newAddressToString, selectedDate, start, userId, timeDelivery, load, description));
  };

  const deleteAddress = (index, storage, deliveryId) => {
    dispatch(deleteAddressTC(index, selectedDate, storage, storages, deliveryId));
  };

  const changeHandler = (e) => {
    setStart(e.target.value);
  };

  return (
    <Row gutter={[10, 10]} style={{ minHeight: '10rem' }}>
      <Col span={24}>
        <Divider style={{ border: '#1890ff' }} orientation="left">
          {selectedDate}
        </Divider>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Collapse onChange={callback} accordion>
              {storages.map((el, index) => (
                <Panel
                  header={<CollapseHeader routing={routing} selectedDate={selectedDate} storageArea={el} />}
                  key={el}
                >
                  <Addresses
                    routing={routing}
                    selectedDate={selectedDate}
                    deleteAddress={deleteAddress}
                    storageArea={el}
                  />
                  <MapsLink
                    selectedDate={selectedDate}
                    routing={routing}
                    storageLinkMethod={`${el}`}
                    defaultLink={mapsLink[el]}
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
              <Start onChange={changeHandler} start={start} storages={storages} />
              <AddressForm handleSubmit={handleSubmit} start={start} />
            </div>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default AddressDataContainer;
