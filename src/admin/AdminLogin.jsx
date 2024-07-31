import { Button, Form, Input, notification, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import bottle from '../assets/Images/logo.png';
import user from '../assets/Images/user.png';
import management from '../assets/Images/management.png';
import { UserOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';


export default function LoginScreen() {
  const [form] = useForm();
  const goto = useNavigate();

  //notification
  const [api, contextHolder] = notification.useNotification();

  const handleLogin = async (values) => {
    try {
      const { username, password } = values;
      console.log("Username:", username);
      console.log("Password:", password);

      // Retrieve stored user credentials from localStorage
      const storedUser = JSON.parse(localStorage.getItem('adminAccount'));

      if (storedUser && username === storedUser.username && password === storedUser.password) {
        localStorage.setItem('admin', 'loggedIn');
        window.location.reload();
        goto('/admin');

      } else {
        api.error({
          message: 'Incorrect username or password',
        });
      }
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  }

  return (
    <>
      {contextHolder}
      <div className='parent-container'>
        <img className='logo-top' src={bottle} alt="" />
        <p className='admin-top' style={{ color: 'black', marginTop: '85px', marginRight: '-0px', fontFamily: 'SF Pro Display' }}>Switch</p>
        <img onClick={() => goto("/login")} className='admin-top' src={user} alt="" />
        {/* <h1 className='admin-top'>Admin</h1> */}
        <Form
          form={form}
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <Form.Item
            label="Admin Login"
          />
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              className='custom-input'
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Username'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              className='custom-input'
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Password'
            />
          </Form.Item>



          <Form.Item>
            <Button type='none' htmlType='submit' className='login-form-button'>
              Log in
            </Button>
            Or <a className='register-text' href='/registeradmin'>register now!</a>
          </Form.Item>
        </Form>

        <div className='logo-login'>

          <Space>
            <img width={280} src={management} alt='Logo' />
          </Space>
        </div>
      </div>
    </>
  );
}
