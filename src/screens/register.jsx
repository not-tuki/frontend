import React, { useState } from 'react';
import { Form, Input, Button, Layout, notification, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const { Content } = Layout;

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [api, contextHolder] = notification.useNotification();

  const onFinish = (values) => {
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      api.error({
        message: 'A user is already registered. You cannot register again.',
      });
    } else {
      Modal.confirm({
        title: 'Note : You can register only one user account this website',
        okText: 'OK',
        onOk: () => {
          localStorage.setItem('user', JSON.stringify({ username: values.username, password: values.password }));
          navigate('/login');
        },
      });

    }
  };
  const handleClick = () => {
    navigate('/login');
    window.location.reload();
  };

  return (
    <Layout style={styles.container}>
      {contextHolder}
      <p style={{ fontFamily: 'SF Pro Display', backgroundColor: 'transparent', marginRight: '90%', color: "grey" }}><img width={'30px'} onClick={handleClick} src='https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/back-256.png'></img></p>
      <Content style={styles.content}>
        <Form name="register" style={styles.form} onFinish={onFinish}>
          <h2 style={styles.title}>Register</h2>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input

              prefix={<UserOutlined />}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: 'Please confirm your Password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="text"
              className='login-form-button'
              htmlType="submit" style={styles.button}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  form: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  button: {
    width: '100%',
  },
};

export default Register;
