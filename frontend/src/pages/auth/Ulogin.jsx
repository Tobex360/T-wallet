import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import { Input, Button, Form, message, Card, Typography, Divider } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import bg from "../../assets/bg.jpg"
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { GoogleLogin } from '@react-oauth/google';


const { Title, Text } = Typography;

function Ulogin() {
  const navigate = useNavigate()
  const handleSubmit = async (values) =>{
    try{
      let data = { 
        username: values.username,
        password: values.password,
      };
      const response = await axios.post(`http://localhost:5000/user/ulogin`, data);
      localStorage.removeItem('admin');
      localStorage.setItem('user', JSON.stringify(response.data));
      // localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("userId", response.data.userid);
      console.log("LOGIN RESPONSE:", response.data);
      window.dispatchEvent(new Event('authChange'));
      message.success("User logged in successfully");
      navigate('/store')

    } catch (err){
      if (err.response){
        if(err.response.status === 401 || err.response.status === 404){
          message.error("User not found or incorrect password");
        } else {
          message.error(err.response.data?.message || "Login Failed");
        }
      } else {
        message.error("Something went Wrong. please try again");
      }
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
  try {
    console.log("Google response:", credentialResponse);

    // Send token to backend
    const res = await axios.post(
      `http://localhost:5000/user/google-login`,
      {
        token: credentialResponse.credential
      }
    );

    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("userId", res.data.userid);
    message.success("Google login successful");
    window.dispatchEvent(new Event('authChange'));
    navigate("/store");

  } catch (err) {
    console.log(err);
    message.error("Google login failed");
  }
};

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
      <Card className="auth-card opacity-98" variant={false}>
        <div className="auth-header">
          <div className="image-container">
            {/* <img src={userImg} alt="User" className='auth-avatar' /> */}
          </div>
          <Title level={3}>Welcome Back</Title>
          <Text type="secondary">Login to start shopping</Text>
        </div>

        <Form onFinish={handleSubmit} layout="vertical" size="large">
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="input-icon" />}
              placeholder='Username'
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="input-icon" />}
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="login-btn">
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => message.error("Google Login Failed")}
                theme="outline"
                size="large"
                text="signin_with"
              />
            </div>
          </Form.Item>

          <div className="auth-footer">
            <Text type="secondary">
              Don't have an account? <Link to='/uregister'>Sign up</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
    </>
  )
}

export default Ulogin