import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './OwnCalendar.css';
import { connect } from 'react-redux';
import { selectDateTC, setDateTC } from '../Redux/address-reducer';

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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDate: state.addressReducer.selectedDate,
    haveAddress: state.addressReducer.routing.map((e) => e.date),
    token: state.userReducer.token,
  };
};

export default connect(mapStateToProps, { selectDateTC, setDateTC })(CalendarClass);
