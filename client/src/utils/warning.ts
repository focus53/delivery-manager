import { message } from 'antd';

export const warning = (errorText: string) => {
  message.warning({
    content: errorText,
    className: 'custom-class',
    style: {
      marginTop: '10vh',
    },
  });
};
