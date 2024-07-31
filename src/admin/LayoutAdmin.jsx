import React, { useState, useEffect } from 'react';
import { Layout, Menu, Space,Modal } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import logo from '../assets/Images/logo.png';
import {
  LogoutOutlined
} from '@ant-design/icons';


const { Header, Content, Footer } = Layout;
const pageNames = ['PRODUCT', 'ORDER-LIST'];

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getSelectedKey = (pathname) => {
    const key = pathname.split('/').pop().toUpperCase();
    return pageNames.includes(key) ? key : '';
  };

  const [selectedKey, setSelectedKey] = useState(getSelectedKey(location.pathname));

  useEffect(() => {
    setSelectedKey(getSelectedKey(location.pathname));
  }, [location.pathname]);

  const handleClick = (e) => {

    setSelectedKey(e.key);
    navigate(`/admin/${e.key.toLowerCase()}`);

  };

  const removeToken = () => {
    Modal.confirm({
      title: 'Confirm Logout  ',
      okText: 'Yes',
      okCancel: 'No',
      onOk: () => {
        localStorage.removeItem('admin');
        navigate('/adminlogin')

        window.location.reload();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const items = pageNames.map((item) => ({
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
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 4,
          width: '100%',
          backgroundColor: '#f7f6f5',
          display: 'flex',
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
          height: 'auto',
          minHeight: '100rem'
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          borderTop: '1px solid grey',
          marginTop: '20px'
        }}
      >
        <Space>
          <div >
            <img style={{ width: '200px', height: '200px', fontFamily: 'SF Pro Display' }} src={logo} alt="" />
          </div>


          <div style={{ textAlign: 'left', fontFamily: 'SF Pro Display', }}>
            <h4>Created by</h4>
            <p>1. Thang Kimlong</p>
            <p>2. Pech Puthireach</p>
            <p>3. Toy Savin</p>
          </div></Space>

      </Footer>
    </Layout>
  );
};

export default App;
