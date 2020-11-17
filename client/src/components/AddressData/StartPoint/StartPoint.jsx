import React from 'react';
import { Field, reduxForm } from 'redux-form';

// Input form for start point your router
const StartPoint = (props) => {
  return (
    <form>
      <div>
        Start from:
        <div>
          <label>
            <Field name="start" component="input" type="radio" value="Allee der Kosmonauten 26, 10315" /> ADK
          </label>
        </div>
        <div>
          <label>
            <Field name="start" component="input" type="radio" value="Jacobsenweg 41, 13509" /> JAC
          </label>
        </div>
        <div>
          <label>
            <Field name="start" component="input" type="radio" value="Preishalle24-Verlorenwasser, Bad Belzig" /> VER
          </label>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({ form: 'startPoint' })(StartPoint);
