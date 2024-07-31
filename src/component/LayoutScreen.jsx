import React, { useState, useEffect } from 'react';
import { Layout, Menu, Space, Modal } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import logo from '../assets/Images/logo.png';
import {
  LogoutOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const page = ['SHOP', 'CONTACT'];

const App = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname.slice(1).toUpperCase());

  useEffect(() => {
    setSelectedKey(location.pathname.slice(1).toUpperCase());
  }, [location.pathname]);

  const navigate = useNavigate();

  const handleClick = (e) => {
    setSelectedKey(e.key);
    navigate(`/${e.key.toLowerCase()}`);
  };

  const removeToken = () => {
    Modal.confirm({
      title: 'Confirm Logout  ',
      okText: 'Yes',
      okCancel: 'No',
      onOk: () => {
        localStorage.removeItem('token');
        window.location.reload();
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  };

  const items = page.map((item) => ({
    key: item,
    label: (
      <span className={`btn ${item === selectedKey ? 'btn-selected' : ''}`}>
        {item}
      </span>
    ),
    style: {
      backgroundColor: 'transparent',
      color: 'black',
      fontFamily: 'SF Pro Display',
    },
  }));

  return (
    <Layout style={{ minHeight: '160vh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 4,
          width: '100%',
          backgroundColor: '#f7f6f5',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items}
          style={{
            flex: 1,
            zIndex: 10,
            minWidth: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}
          onClick={handleClick}
        />
        <LogoutOutlined onClick={removeToken} style={{ fontSize: '15px' }} />
      </Header>
      <Content
        style={{
          padding: '0 48px',
          backgroundColor: 'transparent',
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          borderTop: '1px solid grey',
          height: '230px',
          marginTop: '20px'
        }}
      >
        <Space>
          <div>
            <img
              style={{ width: '200px', height: '200px', fontFamily: 'SF Pro Display' }}
              src={logo}
              alt=""
            />
          </div>
          <div style={{ textAlign: 'left', fontFamily: 'SF Pro Display' }}>
            <h4>Created by</h4>
            <p>1. Thang Kimlong</p>
            <p>2. Pech Puthireach</p>
            <p>3. Toy Savin</p>
          </div>
        </Space>
      </Footer>
    </Layout>
  );
};

export default App;
