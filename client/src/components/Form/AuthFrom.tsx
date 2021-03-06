import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { loginTC } from '../../Redux/user/userThunkCreators';
import { Callbacks, ValidateErrorEntity } from 'rc-field-form/lib/interface';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

type Props = {
  isRegister: (isRegistered: boolean) => void;
};

const AuthForm: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const onFinish: Callbacks<{ username: string; password: string }>['onFinish'] = (values) => {
    dispatch(loginTC(values.username, values.password));
  };

  const onFinishFailed: Callbacks<{ username: string; password: string }>['onFinishFailed'] = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <div>
      <Row style={{ marginTop: '100px' }}>
        <Col span={12} offset={6}>
          <h1 style={{ textAlign: 'center', margin: '50px' }}>Log in:</h1>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                Log In
              </Button>

              <Button type="primary" style={{ marginTop: '10px' }} onClick={() => props.isRegister(true)}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AuthForm;
