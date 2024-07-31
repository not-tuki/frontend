import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import bottle from '../assets/Images/logo.png';
import logoadmin from '../assets/Images/logoadmin.png';
import '../App.css';

export default function LoginScreen() {
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification(); //ប្រើសម្រាប់លោត Notification​​ លើ Website



  const navigate = useNavigate(); //ប្រើសម្រាប់ប្ដុរទីតាំង​ URL​​ របស់ Website

  // គ្រប់គ្រង ការ Login
  const handleLogin = async (values) => {
    try {
      const { username, password } = values;
      console.log("Username:", username);
      console.log("Password:", password);

      
      const storedUser = JSON.parse(localStorage.getItem('user'));// ទទូលតម្លៃពី localstorage('user')

      if (storedUser && username === storedUser.username && password === storedUser.password) {
        localStorage.setItem('token', 'loggedIn');
        navigate('/shop');
        window.location.reload();
      } else {
        api.error({
          message: 'Incorrect username or password',
        });
      }
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  return (
    <>
      {contextHolder}

      <div className='parent-container'>
        <img className='logo-top' src={bottle} alt="" />
        <img className='admin-top' onClick={() => navigate("/admin")} src={logoadmin} alt="" />
        <p className='admin-top' style={{ color: 'black', marginTop: '85px', marginRight: '-0px', fontFamily: 'SF Pro Display' }}>Switch</p>
        <Form
          form={form}
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <h1 className='customer-login-title'>Customer Login</h1>

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
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Log in
            </Button>
            Or <a className='register-text' href='/register'>register now!</a>
          </Form.Item>
        </Form>

        <div  className='logo-login'>
          <img width={120} src={'https://i.pinimg.com/564x/d6/1d/5b/d61d5b241c6435b694696f969b96a799.jpg'} alt='Logo' />
        </div>
      </div>
    </>
  );
}
