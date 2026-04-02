import React, { useState, useEffect } from 'react';
import { ShoppingCartOutlined, MenuOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dropdown, Space, Badge, Button } from 'antd';
import { useCart } from '../context/CartContext';
import Logo from "../assets/Mode=dark mode.svg";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState('');
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const updateUserState = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setUserType('user');
      setUsername(userData.username || 'User');
    } else {
      setUserType(null);
      setUsername('');
    }
  };

  useEffect(() => {
    updateUserState();
    const handleEvents = () => updateUserState();
    window.addEventListener('storage', handleEvents);
    window.addEventListener('authChange', handleEvents);

    return () => {
      window.removeEventListener('storage', handleEvents);
      window.removeEventListener('authChange', handleEvents);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  const menuItems = [
    {
      key: 'logout',
      label: <span className="font-medium">Logout</span>,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <nav className="bg-yellow-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-11 w-auto transition-transform hover:scale-105" />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/features">Features</NavLink>
            
            {userType === 'user' ? (
              <>
                <NavLink to="/store">Store</NavLink>
                <NavLink to="/orders">Orders</NavLink>
                <Link to="/cart" className="flex items-center">
                  <Badge count={getCartCount()} size="small" offset={[5, 0]}>
                    <ShoppingCartOutlined className="text-white text-2xl hover:text-yellow-200 transition-colors" />
                  </Badge>
                </Link>
                <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
                  <div className="flex items-center gap-2 text-white cursor-pointer hover:bg-yellow-800 px-3 py-2 rounded-md transition-all">
                    <UserOutlined />
                    <span className="font-medium">{username}</span>
                  </div>
                </Dropdown>
              </>
            ) : (
              <Link to="/ulogin">
                <Button type="primary" ghost className="border-white text-white hover:bg-white hover:text-yellow-700">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="sm:hidden flex items-center">
            <button 
              onClick={() => setOpen(!open)}
              className="text-white text-2xl focus:outline-none p-2"
            >
              {open ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden bg-yellow-800 overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          <MobileNavLink to="/">Home</MobileNavLink>
          <MobileNavLink to="/features">Features</MobileNavLink>
          
          {userType === 'user' ? (
            <>
              <MobileNavLink to="/store">Store</MobileNavLink>
              <MobileNavLink to="/orders">Orders</MobileNavLink>
              <MobileNavLink to="/cart">
                Cart ({getCartCount()})
              </MobileNavLink>
              <div className="border-t border-yellow-600 mt-2 pt-2">
                <div className="text-yellow-200 text-sm px-3 mb-2">Logged in as {username}</div>
                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-red-300 font-bold">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <MobileNavLink to="/ulogin">Login</MobileNavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

// Helper Components
const NavLink = ({ to, children }) => (
  <Link to={to} className="text-white no-underline group hover:no-underline hover:text-yellow-200 font-medium text-lg transition-all duration-200 transform hover:scale-105">
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

const MobileNavLink = ({ to, children }) => (
  <Link to={to} className="block text-white no-underline hover:bg-yellow-600 px-3 py-2 rounded-md text-base font-medium">
    {children}
  </Link>
);

export default Navbar;