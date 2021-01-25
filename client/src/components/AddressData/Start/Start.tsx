import React from 'react';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';

type Props = {
  onChange: (e: RadioChangeEvent) => void;
  storages: string[];
  start: string;
};

const Start: React.FC<Props> = (props) => {
  return (
    <Radio.Group onChange={props.onChange} value={props.start}>
      {props.storages.map((el) => {
        return <Radio value={el}>{el}</Radio>;
      })}
    </Radio.Group>
  );
};

export default Start;
