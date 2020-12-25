import React from 'react';
import ReactCalendar from 'react-calendar';
import { connect } from 'react-redux';

import 'react-calendar/dist/Calendar.css';
import './OwnCalendar.css';
import { selectDateTC, setDateTC } from '../Redux/address-reducer';

class CalendarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: new Date() };
  }
  componentDidMount() {
    this.props.setDateTC(this.state.selectedDate.toDateString(), this.props.token);
    this.props.selectDateTC(this.state.selectedDate.toDateString());
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
      <div>
        <div className="row">
          <div className="col s12 m6">
            <ReactCalendar
              onChange={(val) => {
                this.handleChange(val);
              }}
              value={this.selectedDate}
              className="card blue-grey darken-1 ownStyleCalendar"
              onClickDay={this.handleClick}
              tileClassName={(obj) => {
                return this.props.haveAddress.includes(obj.date.toDateString()) && 'haveAddress';
              }}
            />
          </div>
        </div>
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
