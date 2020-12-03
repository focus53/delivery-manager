import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AddressForm from './AddressForm/AddressForm';
import {
  addNewAddressTC,
  haveAddressTC,
  deleteAddressTC,
  updateLinkToMapsTC,
  setStartPointTC,
  setDateTC,
} from '../Redux/address-reducer';
<<<<<<< HEAD
import StartPoint from './StartPoint/StartPoint';
=======
import { Row, Col, Divider, Collapse, Button } from 'antd';
import Start from './Start/Start';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { MapsLink } from './MapsLink/MapsLink';
import { CollapseHeader } from './CollapseHeader/CollapseHeader';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

<<<<<<< HEAD
const CollapseHeader = (props) => {
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
>>>>>>> 79ae319... refactor: link to maps

=======
>>>>>>> 67b4703... refactor: CollapseHeader
// Address component
const AddressData = (props) => {
  const [addMode, setAddMode] = useState(false);
<<<<<<< HEAD
=======
  const [start, setStart] = useState('JAC');
>>>>>>> 35db288... Version 1.0.11

  const handleSubmit = (formData) => {
    setAddMode(false);
    let newAddressToString = `${formData.street} ${formData.streetNumber}, ${formData.postCode}`;
    props.addNewAddressTC(newAddressToString, props.selectedDate);
    props.updateLinkToMapsTC(props.selectedDate);
  };

  const toggleModeHandle = (e) => {
    addMode ? setAddMode(false) : setAddMode(true);
    props.haveAddressTC(props.selectedDate);
  };

  const deleteAddress = (index) => {
    props.deleteAddressTC(index, props.selectedDate);
    props.updateLinkToMapsTC(props.selectedDate);
  };

  const changeHandler = (value) => {
    props.setStartPointTC(value.start);
    props.updateLinkToMapsTC(props.selectedDate);
  };

  // useEffect(() => {
  //   props.setDateTC(props.selectedDate);
  // }, [props.selectedDate]);

  return (
    <div>
<<<<<<< HEAD
      <h3>{props.selectedDate}</h3>
      <StartPoint onChange={changeHandler} />
      <div>
        {props.routing.some((el) => el.date === props.selectedDate) &&
          props.routing
            .find((el) => el.date === props.selectedDate)
            .addresses.map((el, index) => (
              <div key={index}>
                {`${index + 1}: ${el}`} <button onClick={() => deleteAddress(index)}>-</button>
              </div>
            ))}
      </div>
      <button onClick={toggleModeHandle}>Add new address</button>
      {addMode && <AddressForm onSubmit={handleSubmit} />}
      <div>
        {props.routing.some((el) => el.date === props.selectedDate) && (
          <a target="_blank" rel="noreferrer" href={props.routing.find((el) => el.date === props.selectedDate).mapsURL}>
            Link to Google Maps
          </a>
        )}
      </div>
      {/* <button onClick={() => dateAPI.newDate(props.selectedDate, 'Amrumer str. 25, 13353')}>Click me</button> */}
=======
      <Row gutter={[10, 10]} style={{ minWidth: '108rem', minHeight: '10rem' }}>
        <Col span={5}>
          <Divider style={{ border: '#1890ff' }} orientation="left">
            {props.selectedDate}
          </Divider>
          <Row gutter={[10, 10]}>
            <Col span={20}>
              <Collapse onChange={callback} accordion>
                <Panel
                  header={
                    <CollapseHeader routing={props.routing} selectedDate={props.selectedDate} storageArea={'ADK'} />
                  }
                  key="1"
                >
                  <p>
                    {props.routing.some((el) => el.date === props.selectedDate) && (
                      <p>
                        {props.routing.find((el) => el.date === props.selectedDate).ADK &&
                          props.routing
                            .find((el) => el.date === props.selectedDate)
                            .ADK.map((el, index) => (
                              <div key={index}>
                                {`${index + 1}: ${el}`}{' '}
                                <Button
                                  icon={<MinusOutlined />}
                                  onClick={() => deleteAddress(index, 'ADK')}
                                  size="small"
                                ></Button>
                              </div>
                            ))}
                      </p>
                    )}
                  </p>
                  <MapsLink
                    selectedDate={props.selectedDate}
                    routing={props.routing}
                    storageLinkMethod={'mapsLinkADK'}
                  />
                </Panel>
                <Panel
                  header={
                    <CollapseHeader routing={props.routing} selectedDate={props.selectedDate} storageArea={'JAC'} />
                  }
                  key="2"
                >
                  <p>
                    {props.routing.some((el) => el.date === props.selectedDate) && (
                      <p>
                        {props.routing.find((el) => el.date === props.selectedDate).JAC &&
                          props.routing
                            .find((el) => el.date === props.selectedDate)
                            .JAC.map((el, index) => (
                              <div key={index}>
                                {`${index + 1}: ${el}`}{' '}
                                <Button
                                  icon={<MinusOutlined />}
                                  onClick={() => deleteAddress(index, 'JAC')}
                                  size="small"
                                ></Button>
                              </div>
                            ))}
                      </p>
                    )}
                  </p>
                  <MapsLink
                    selectedDate={props.selectedDate}
                    routing={props.routing}
                    storageLinkMethod={'mapsLinkJAC'}
                  />
                </Panel>
                <Panel
                  header={
                    <CollapseHeader routing={props.routing} selectedDate={props.selectedDate} storageArea={'VER'} />
                  }
                  key="3"
                >
                  <p>
                    {props.routing.some((el) => el.date === props.selectedDate) && (
                      <p>
                        {props.routing.find((el) => el.date === props.selectedDate).VER &&
                          props.routing
                            .find((el) => el.date === props.selectedDate)
                            .VER.map((el, index) => (
                              <div key={index}>
                                {`${index + 1}: ${el}`}{' '}
                                <Button
                                  icon={<MinusOutlined />}
                                  onClick={() => deleteAddress(index, 'VER')}
                                  size="small"
                                ></Button>
                              </div>
                            ))}
                      </p>
                    )}
                  </p>
                  <MapsLink
                    selectedDate={props.selectedDate}
                    routing={props.routing}
                    storageLinkMethod={'mapsLinkADK'}
                  />
                </Panel>
              </Collapse>
            </Col>
          </Row>

          <Row gutter={[5, 5]}>
            <Col>
              <Button icon={<PlusOutlined />} onClick={toggleModeHandle}>
                Add new address
              </Button>
            </Col>
          </Row>
          <Row gutter={[5, 5]}>
            <Col>
              {addMode && (
                <div>
                  <Start onChange={changeHandler} start={start} />
                  <AddressForm handleSubmit={handleSubmit} />
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
>>>>>>> 35db288... Version 1.0.11
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    selectedDate: store.addressReducer.selectedDate,
    routing: store.addressReducer.routing,
  };
};

export default connect(mapStateToProps, {
  addNewAddressTC,
  haveAddressTC,
  deleteAddressTC,
  updateLinkToMapsTC,
  setStartPointTC,
  setDateTC,
})(AddressData);
