import React, { useEffect, useState } from 'react';
import ReactCalendar, { OnChangeDateCallback } from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';

import 'react-calendar/dist/Calendar.css';
import './OwnCalendar.css';
import { selectDateTC, setDateTC } from '../../Redux/delivery/deliveryThunkCreators';
import { haveAddressSelector } from '../../Redux/delivery/deliverySelectors';
import { tokenSelector } from '../../Redux/user/userSelectors';

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const token = useSelector(tokenSelector);
  const haveAddress = useSelector(haveAddressSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDateTC(selectedDate.toDateString(), token));
    dispatch(selectDateTC(selectedDate.toDateString()));
  }, [dispatch, token, selectedDate]);

  const handleChange: OnChangeDateCallback = (val) => {
    const date = Array.isArray(val) ? val[0] : val;

    setSelectedDate(date);
    dispatch(selectDateTC(date.toDateString()));
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
            return haveAddress.includes(obj.date.toDateString()) ? 'haveAddress' : null;
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;
