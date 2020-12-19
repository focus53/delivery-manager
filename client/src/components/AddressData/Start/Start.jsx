import React from "react";
import { Radio } from "antd";

const Start = (props) => {
  return (
    <Radio.Group onChange={props.onChange} value={props.start}>
      {props.storages.map((el) => {
        return <Radio value={el}>{el}</Radio>;
      })}
    </Radio.Group>
  );
};

export default Start;
