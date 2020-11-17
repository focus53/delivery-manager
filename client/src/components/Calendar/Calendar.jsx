import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './OwnCalendar.css';
import { connect } from 'react-redux';
import { selectDateTC } from '../Redux/address-reducer';

const Calendar = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (val) => {
    setSelectedDate(val);
    props.selectDateTC(val.toDateString());
  };

  const handleClick = (value, event) => {
    //props.haveAddressTC(value.toDateString());
  };

  return (
    <div className="asd">
      <ReactCalendar
        onChange={handleChange}
        value={selectedDate}
        onClickDay={handleClick}
        tileClassName={(obj) => {
          return props.haveAddress.includes(obj.date.toDateString()) && 'haveAddress';
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDate: state.addressReducer.selectedDate,
    haveAddress: state.addressReducer.routing.map((e) => e.date),
  };
};

export default connect(mapStateToProps, { selectDateTC })(Calendar);
