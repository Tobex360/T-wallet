import React, { useState, useEffect } from 'react'
import { ShoppingCartOutlined, MenuOutlined, CloseOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Space } from 'antd';
import Logo from "../assets/Mode=dark mode.svg"

function Navebar() {

  const [open, setOpen] = useState(false)
  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate()

  const updateUserState = () => {
    // Check if user is logged in 
    const user = localStorage.getItem('user');

    if (user) {
      const userData = JSON.parse(user);
      setUserType('user');
      setUsername (userData.username || 'User');
    } else {
      setUserType(null);
      setUsername('');
    }
  };
  useEffect(()=>{
    updateUserState();

    const handleStorageChange =()=>{
      updateUserState();
    };
    window.addEventListener('storage', handleStorageChange);

    const handleAuthChange = () => {
      updateUserState 
    };
    window.addEventListener('authChange', handleAuthChange);

    return ()=>{
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authChange', handleAuthChange)
    };

  }, []);

  const handleLogout = ()=>{
    localStorage.removeItem('user');

    window.dispatchEvent(new Event('authChange'));
    setUserType(null);
    setUsername('');
    navigate('/');
  };

    const items=[
    {
      label: (
        <span onClick={handleLogout}>
          Logout
        </span>
      ),
      key: '0',
    },
  ];
  return (
    <>
    {userType === null &&(<div>
      <div className='flex bg-yellow-700 justify-between p-2 text-l items-center'>
        <div><Link to='/'><img src={Logo} alt="" /></Link></div>
        {/* Desktop nav */}
        {(<div className='hidden sm:flex gap-3 text-white text-xl text-bold mr-4'>
          <Link to="/" className='fl'>Home</Link>
          <Link to="/features" className='fl'>Features</Link>
          <Link to="/ulogin" className='fl'>Login</Link>
        </div>)}
          <button 
          className='flex sm:hidden text-white'
          onClick={()=>{setOpen(!open)}}>
            {!open ?<MenuOutlined /> : <CloseOutlined />}
            </button>
      </div>
      {/* Mobile nav */}
        {open &&(<div className='flex flex-col sm:hidden gap-3 bg-yellow-700 text-white items-center text-xl text-bold'>
          <Link to="/" className='fl'>Home</Link>
          <Link to="/features"className='fl'>Features</Link>
          <Link to="/ulogin"className='fl'>Login</Link>
        </div>)}
    </div>)}
    {userType === 'user' &&(<div>
      <div className='flex bg-yellow-700 justify-between p-2 text-l items-center'>
        <div><Link to='/'><img src={Logo} alt="" /></Link></div>
        {/* Desktop nav */}
        {(<div className='hidden sm:flex gap-3 text-white text-xl text-bold mr-4'>
          <Link to="/" className='fl'>Home</Link>
          <Link to="/features" className='fl'>Features</Link>
          <Link to='/store' className='fl'>Store</Link>
          <Link className='fl'><ShoppingCartOutlined /></Link>
           <Dropdown menu={{ items }} trigger={['click']}>
              <div className='hover:cursor-pointer fl' onClick={(e) => e.preventDefault()}>
                <Space>
                  <UserOutlined />
                  {username}
                </Space>
              </div>
            </Dropdown>
        </div>)}
          <button 
          className='flex sm:hidden text-white'
          onClick={()=>{setOpen(!open)}}>
            {!open ?<MenuOutlined /> : <CloseOutlined />}
            </button>
      </div>
      {/* Mobile nav */}
        {open &&(<div className='flex flex-col sm:hidden gap-3 bg-yellow-700 text-white items-center text-xl text-bold'>
          <Link className='fl'>Home</Link>
          <Link className='fl'>Features</Link>
          <Link className='fl'>Store</Link>
          <Dropdown menu={{ items }} trigger={['click']}>
              <div className='hover:cursor-pointer fl' onClick={(e) => e.preventDefault()}>
                <Space>
                  <UserOutlined />
                  {username}
                </Space>
              </div>
            </Dropdown>
          <Link className='fl'><ShoppingCartOutlined /></Link>
        </div>)}
    </div>)}
    </>
  )
}

export default Navebar