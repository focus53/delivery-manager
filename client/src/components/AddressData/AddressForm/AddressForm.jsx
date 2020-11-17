import React from 'react';
import { Field, reduxForm } from 'redux-form';

// Input form for address
const AddressFrom = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field name="street" component="input" type="text" placeholder="Enter street" />
        </div>
        <div>
          <Field name="streetNumber" component="input" type="text" placeholder="Enter number of street" />
        </div>
        <div>
          <Field name="postCode" component="input" type="text" placeholder="Enter postcode" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'addressForm',
})(AddressFrom);
