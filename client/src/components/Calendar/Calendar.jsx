import React, { useEffect, useState } from 'react';
import ReactCalendar from 'react-calendar';
import { connect } from 'react-redux';

import 'react-calendar/dist/Calendar.css';
import './OwnCalendar.css';
import { selectDateTC, setDateTC } from '../Redux/address-reducer';

const Calendar = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    props.setDateTC(selectedDate.toDateString(), props.token);
  }, []);
  useEffect(() => {
    props.selectDateTC(selectedDate.toDateString());
  }, [selectedDate]);

  const handleChange = (val) => {
    setSelectedDate(val);
  };

  return (
    <div className="row">
      <div className="col s12 m6">
        <ReactCalendar
          onChange={(val) => {
            handleChange(val);
          }}
          value={selectedDate}
          className="card blue-grey darken-1 ownStyleCalendar"
          tileClassName={(obj) => {
            return props.haveAddress.includes(obj.date.toDateString()) && 'haveAddress';
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDate: state.addressReducer.selectedDate,
    haveAddress: state.addressReducer.routing.map((e) => e.date),
    token: state.userReducer.token,
  };
};

export default connect(mapStateToProps, { selectDateTC, setDateTC })(Calendar);
