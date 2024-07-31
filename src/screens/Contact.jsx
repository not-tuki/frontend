import React from 'react';
import { Layout, Form, Input, Button, Row, Col, Typography, Space } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import forContact from '../assets/Images/forContact.png';
const { Content } = Layout;
const { Title, Text } = Typography;

const ContactPage = () => {

    return (
        <Layout>
            <Title level={2} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
                Contact Us
            </Title>
            <hr style={{ width: '100%' }} />

            <Space
                style={{ height: '400px', display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', fontSize: '20px' }}>
                <div style={{ marginRight: '200px' }}>
                    <img width={150} src='https://i.pinimg.com/564x/57/13/84/5713846d630704ce892f9c93944ba451.jpg' />
                    <li>
                        <a href="https://t.me/tukiez">Thang Kimlong</a>
                    </li>
                    <li>
                        <a href="https://t.me/pechputhireach">Pech Puthireach</a>
                    </li>
                    <li>
                        <a href="https://t.me/Vinz_FI">Toy Savin</a>
                    </li>

                </div>
                <div>
                    <img style={{ width: '300px', marginRight: '50px', marginTop: '100px' }} src={forContact} alt="" />
                </div>

            </Space>


        </Layout>

    );
};

export default ContactPage;
