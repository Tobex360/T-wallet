import React from "react";
import { Link } from "react-router-dom";
import '../App.css'
import darkmode from '../assets/Mode=dark mode.svg';
import { RightOutlined } from '@ant-design/icons';
import { 
  FacebookOutlined, 
  XOutlined, 
  InstagramOutlined, 
  LinkedinOutlined 
} from '@ant-design/icons';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand/Logo Section */}
          <div className="flex flex-col gap-4">
            <Link to='/'>
              <img src={darkmode} alt="Logo" className=" w-auto" />
            </Link>
            <p className="text-sm text-slate-400 max-w-xs">
              Elevating your style with curated collections and premium accessories.
            </p>
          </div>

          {/* Shop Column */}
          <div className="flex flex-col gap-4">
            <h2 className="text-white font-bold tracking-widest text-sm">SHOP</h2>
            <div className="h-px bg-slate-500 w-10"></div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/" className="fl hover:text-white transition-colors"><RightOutlined /> NEW ARRIVALS</Link>
              <Link to="/" className="fl hover:text-white transition-colors"><RightOutlined /> COLLECTION</Link>
              <Link to="/" className="fl hover:text-white transition-colors"><RightOutlined /> BRANDS</Link>
              <Link to="/" className="fl hover:text-white transition-colors"><RightOutlined /> GIFT CARDS</Link>
            </nav>
          </div>

          {/* Popular Column */}
          <div className="flex flex-col gap-4">
            <h2 className="text-white font-bold tracking-widest text-sm">POPULAR</h2>
            <div className="h-px bg-slate-700 w-10"></div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/" className="fl hover:text-white transition-colors"><RightOutlined /> SEASONAL FAVORITES</Link>
              <Link to="/" className="fl hover:text-white transition-colors"><RightOutlined /> MUST-HAVE WALLETS</Link>
              <Link to="/" className="fl hover:text-white transition-colors"><RightOutlined /> TRENDY ACCESSORIES</Link>
            </nav>
          </div>
          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-6">
          <div className="text-sm text-slate-500 text-center md:text-left">
            © {currentYear} - 
            <Link to="#" className="ml-1 fl text-slate-300 hover:text-white transition-colors underline-offset-4 hover:underline">
               Echefu Tobechukwu
            </Link>. All Rights Reserved.
          </div>
          
          <div className="flex gap-6 text-xl">
            <Link className="fl hover:text-white transition-colors"><FacebookOutlined /></Link>
            <Link className="fl hover:text-white transition-colors"><XOutlined /></Link>
            <Link className="fl hover:text-white transition-colors"><InstagramOutlined /></Link>
            <Link className="fl hover:text-white transition-colors"><LinkedinOutlined /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;