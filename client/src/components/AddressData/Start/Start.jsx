import React from 'react';
import { Radio } from 'antd';

const Start = (props) => {
  return (
    <Radio.Group onChange={props.onChange} defaultValue={'JAC'}>
      <Radio value={'ADK'}>ADK</Radio>
      <Radio value={'JAC'}>JAC</Radio>
      <Radio value={'VER'}>VER</Radio>
    </Radio.Group>
  );
};

export default Start;
