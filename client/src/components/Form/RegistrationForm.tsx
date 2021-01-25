import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { registerTC } from '../../Redux/user/userThunkCreators';
import { FormItemProps } from 'antd/lib/form';
import { Callbacks } from 'rc-field-form/lib/interface';

const formItemLayout: FormItemProps = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
};

const tailFormItemLayout: FormItemProps = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

type Props = {
  isRegister: (register: boolean) => void;
};

const RegistrationForm: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish: Callbacks<{ email: string; password: string }>['onFinish'] = (values) => {
    dispatch(registerTC(values.email, values.password));
  };

  return (
    <Row justify="center" style={{ marginTop: '100px' }}>
      <Col span={12} offset={0}>
        <h1 style={{ textAlign: 'center', margin: '50px' }}>Registration:</h1>
        <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button style={{ margin: '5px' }} type="primary" onClick={() => props.isRegister(false)}>
              {'<'}
            </Button>
            <Button style={{ margin: '5px' }} type="primary" htmlType="submit">
              Register and Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default RegistrationForm;
