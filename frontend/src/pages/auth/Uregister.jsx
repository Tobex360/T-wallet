import React from 'react';
import './login.css';
import { Input, Button, Form, message, Card, Typography, Row, Col, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import bg from "../../assets/bg.jpg"
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  LockOutlined, 
  HomeOutlined, 
  CarOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

function Uregister() {
  return (
    <>
    <div className="login-wrapper" style={{
           backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh'
        }}>
      <Card className="auth-card register-card opacity-98" variant={false}>
        <div className="auth-header">
          <div className="image-container">
            {/* <img src={driverImg} alt="Driver" className='auth-avatar' /> */}
          </div>
          <Title level={3}>Register</Title>
          <Text type="secondary">Join us to start shopping today</Text>
        </div>

        <Form layout="vertical" size="large">
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="firstname" rules={[{ required: true, message: 'Required' }]}>
                <Input placeholder="Firstname" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="lastname" rules={[{ required: true, message: 'Required' }]}>
                <Input placeholder="Lastname" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="username" rules={[{ required: true }]}>
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Row gutter={12}>
            <Col span={14}>
              <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
                <Input prefix={<MailOutlined />} placeholder="Email Address" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="phonenumber" rules={[{ required: true }]}>
                <Input prefix={<PhoneOutlined />} placeholder="Phone" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Create Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="login-btn driver-theme-btn">
              Register
            </Button>
          </Form.Item>

          <div className="auth-footer">
            <Text type="secondary">
              Already have an account? <Link to="/ulogin">Login</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
    </>
  );
}

export default Uregister;