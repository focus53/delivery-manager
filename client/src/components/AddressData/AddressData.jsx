import React, { useState } from 'react';
import { connect } from 'react-redux';
import AddressForm from './AddressForm/AddressForm';
import { addNewAddressTC, haveAddressTC, deleteAddressTC, updateLinkToMapsTC, setStartPointTC } from '../Redux/address-reducer';
import StartPoint from './StartPoint/StartPoint';


// Address component
const AddressData = (props) => {
  const [addMode, setAddMode] = useState(false);

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

  return (
    <div>
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
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    selectedDate: store.addressReducer.selectedDate,
    routing: store.addressReducer.routing,
  };
};

export default connect(mapStateToProps, { addNewAddressTC, haveAddressTC, deleteAddressTC, updateLinkToMapsTC, setStartPointTC })(
  AddressData,
  addNewAddressTC
);
