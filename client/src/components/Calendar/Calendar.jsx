import React, { useEffect, useState } from 'react';
import ReactCalendar from 'react-calendar';
import { connect } from 'react-redux';

import 'react-calendar/dist/Calendar.css';
import './OwnCalendar.css';
import { selectDateTC, setDateTC } from '../../Redux/delivery/deliveryThunkCreators';

const Calendar = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    props.setDateTC(selectedDate.toDateString(), props.token);
  }, [selectedDate]);

  const handleChange = (val) => {
    setSelectedDate(val);
    props.selectDateTC(val.toDateString());
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
    selectedDate: state.deliveryReducer.selectedDate,
    haveAddress: state.deliveryReducer.routing.map((e) => e.date),
    token: state.userReducer.token,
  };
};

export default connect(mapStateToProps, { selectDateTC, setDateTC })(Calendar);
