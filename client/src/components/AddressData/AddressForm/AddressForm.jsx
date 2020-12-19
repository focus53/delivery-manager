import React from 'react';
import { Field, reduxForm } from 'redux-form';

// Input form for address
const AddressFrom = (props) => {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    <form onSubmit={(e) => props.handleSubmit(e, street, streetNumber, postCode)}>
=======
    <form
      onSubmit={(e) => props.handleSubmit(e, street, streetNumber, postCode)}
    >
>>>>>>> 4b9ed97... fix: Some errors
      <Input.Group size="small">
        <Row gutter={[5, 10]}>
          <Col span={12}>
            <Input
              placeholder="Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </Col>
          <Col span={5}>
            <Input
              placeholder="Number"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
            />
          </Col>
          <Col span={7}>
            <Input
              placeholder="Postcode"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
            />
          </Col>
        </Row>
        <Button disabled={!props.start} type="primary" htmlType="submit">
          Submit <SendOutlined />
        </Button>
      </Input.Group>
    </form>
>>>>>>> 35db288... Version 1.0.11
  );
};

export default reduxForm({
  form: 'addressForm',
})(AddressFrom);
