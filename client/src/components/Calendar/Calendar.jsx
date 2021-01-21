import React, { useEffect, useState } from 'react';
import ReactCalendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';

import 'react-calendar/dist/Calendar.css';
import './OwnCalendar.css';
import { selectDateTC, setDateTC } from '../../Redux/delivery/deliveryThunkCreators';
import { haveAddressSelector } from '../../Redux/delivery/deliverySelectors';
import { tokenSelector } from '../../Redux/user/userSelectors';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const token = useSelector(tokenSelector);
  const haveAddress = useSelector(haveAddressSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDateTC(selectedDate.toDateString(), token));
    dispatch(selectDateTC(selectedDate.toDateString()));
  }, [dispatch, token, selectedDate]);

  const handleChange = (val) => {
    setSelectedDate(val);
    dispatch(selectDateTC(val.toDateString()));
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
            return haveAddress.includes(obj.date.toDateString()) && 'haveAddress';
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;
