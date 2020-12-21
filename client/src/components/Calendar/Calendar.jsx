<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 8b22fc3... refactor: Calendar to func comp
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './OwnCalendar.css';
import { connect } from 'react-redux';
import { selectDateTC, setDateTC } from '../Redux/address-reducer';

<<<<<<< HEAD
class CalendarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: new Date() };
  }
  componentDidMount() {
<<<<<<< HEAD
    this.props.setDateTC()
=======
    this.props.setDateTC(this.state.selectedDate.toDateString(), this.props.token);
    this.props.selectDateTC(this.state.selectedDate.toDateString());
>>>>>>> 46666bc... refactor: API with token
  }

  handleChange(val) {
    this.setState({ selectedDate: val });
    this.props.selectDateTC(val.toDateString());
  }

  handleClick(value, event) {
    //props.haveAddressTC(value.toDateString());
  }
  render() {
    return (
      <div className="asd">
        <ReactCalendar
          onChange={(val) => {
            this.handleChange(val);
          }}
          value={this.selectedDate}
          onClickDay={this.handleClick}
          tileClassName={(obj) => {
            return this.props.haveAddress.includes(obj.date.toDateString()) && 'haveAddress';
          }}
        />
=======
const Calendar = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    props.setDateTC(selectedDate.toDateString(), props.token);
  }, [props.token]);

  useEffect(() => {
    props.selectDateTC(selectedDate.toDateString());
  }, [selectedDate]);

  const handleChange = (val) => {
    setSelectedDate(val);
  };

  const handleClick = (value, event) => {
    //props.haveAddressTC(value.toDateString());
  };

  return (
    <div>
      <div className="row">
        <div className="col s12 m6">
          <ReactCalendar
            onChange={(val) => {
              handleChange(val);
            }}
            value={selectedDate}
            className="card blue-grey darken-1 ownStyleCalendar"
            onClickDay={handleClick}
            tileClassName={(obj) => {
              return props.haveAddress.includes(obj.date.toDateString()) && 'haveAddress';
            }}
          />
        </div>
>>>>>>> 8b22fc3... refactor: Calendar to func comp
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
