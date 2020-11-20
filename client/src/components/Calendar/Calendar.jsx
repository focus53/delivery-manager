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
    this.props.setDateTC()
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

// const Calendar = (props) => {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const handleChange = (val) => {
//     setSelectedDate(val);
//     props.selectDateTC(val.toDateString());
//   };

//   const handleClick = (value, event) => {
//     //props.haveAddressTC(value.toDateString());
//   };

//   return (
//     <div className="asd">
//       <ReactCalendar
//         onChange={handleChange}
//         value={selectedDate}
//         onClickDay={handleClick}
//         tileClassName={(obj) => {
//           return props.haveAddress.includes(obj.date.toDateString()) && 'haveAddress';
//         }}
//       />
//     </div>
//   );
// };

const mapStateToProps = (state) => {
  return {
    selectedDate: state.addressReducer.selectedDate,
    haveAddress: state.addressReducer.routing.map((e) => e.date),
  };
};

export default connect(mapStateToProps, { selectDateTC, setDateTC })(CalendarClass);
