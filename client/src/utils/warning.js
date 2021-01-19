import { message } from 'antd';

export const warning = (errorText) => {
  message.warning({
    content: errorText,
    className: 'custom-class',
    style: {
      marginTop: '10vh',
    },
  });
};
