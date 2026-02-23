import React from 'react';
import bg from "../../assets/bg.jpg";
import rec1 from '../../assets/Rectangle 40.svg';
import rec2 from '../../assets/Rectangle 41.svg';
import rec3 from '../../assets/Rectangle 42.svg';
import { WalletOutlined } from '@ant-design/icons';

function Features() {

  return (
    <div 
      className='min-h-screen py-20 px-6 flex flex-col items-center justify-center' 
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className=' w-full opacity-95 bg-yellow-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center'>
        
        {/* Left Side: Image Container */}
        <div className='w-full md:w-1/2 p-4 flex justify-center'>
          <img 
            src={rec1} 
            alt="Premium Wallet" 
            className='w-full max-h-125 object-contain drop-shadow-[0_20px_50px_rgba(255,185,0,0.3)]'
          />
        </div>

        {/* Right Side: Content Container */}
        <div className='w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center'>
          <h2 className='text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight'>
            Premium <span className='text-slate-800'>Materials</span>
          </h2>
          <p className='text-gray-300 text-lg leading-relaxed mb-8 italic'>
            "Our wallets are built to last, using only the finest materials that get better with age. Each piece is designed for both durability and style."
          </p>

          <ul className='space-y-4'>
              <li className='flex items-start gap-3 text-gray-200'>
                <WalletOutlined className='text-[#ffb900] mt-1 text-lg shrink-0' />
                <span className='text-base md:text-lg'>100% genuine full-grain leather (or high-quality vegan options)</span>
              </li>
              <li className='flex items-start gap-3 text-gray-200'>
                <WalletOutlined className='text-[#ffb900] mt-1 text-lg shrink-0' />
                <span className='text-base md:text-lg'>Scratch-resistant finish for everyday protection</span>
              </li>
              <li className='flex items-start gap-3 text-gray-200'>
                <WalletOutlined className='text-[#ffb900] mt-1 text-lg shrink-0' />
                <span className='text-base md:text-lg'>Hand-stitched details for strength and character</span>
              </li>
              <li className='flex items-start gap-3 text-gray-200'>
                <WalletOutlined className='text-[#ffb900] mt-1 text-lg shrink-0' />
                <span className='text-base md:text-lg'>Ages beautifully with a natural patina over time</span>
              </li>
          </ul>

          <button className='mt-10 bg-slate-500 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg w-fit'>
            View Collection
          </button>
        </div>
      </div>

      {/* Feature start */}

      <div className=' w-full opacity-95 bg-yellow-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center mt-5'>
        
        {/* Right Side: Content Container */}
        <div className='w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center'>
          <h2 className='text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight'>
            Smart <span className='text-slate-800'>Design</span>
          </h2>
          <p className='text-gray-300 text-lg leading-relaxed mb-8 italic'>
            "We believe a wallet should fit seamlessly into your lifestyle. That’s why our designs are sleek, slim, and functional so you carry more without the bulk."
          </p>

          <ul className='space-y-4'>
              <li className='flex items-start gap-3 text-gray-200'>
                <WalletOutlined className='text-[#ffb900] mt-1 text-lg shrink-0' />
                <span className='text-base md:text-lg'>Ultra-slim profile to fit comfortably in any pocket</span>
              </li>
              <li className='flex items-start gap-3 text-gray-200'>
                <WalletOutlined className='text-[#ffb900] mt-1 text-lg shrink-0' />
                <span className='text-base md:text-lg'>Multiple compartments for cash, cards, and IDs</span>
              </li>
              <li className='flex items-start gap-3 text-gray-200'>
                <WalletOutlined className='text-[#ffb900] mt-1 text-lg shrink-0' />
                <span className='text-base md:text-lg'>Quick-access slots for your most-used cards</span>
              </li>
              <li className='flex items-start gap-3 text-gray-200'>
                <WalletOutlined className='text-[#ffb900] mt-1 text-lg shrink-0' />
                <span className='text-base md:text-lg'>Minimalist look that works for every occasion</span>
              </li>
          </ul>

          <button className='mt-10  bg-slate-500 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg w-fit'>
            View Collection
          </button>
        </div>
         {/* Left Side: Image Container */}
        <div className='w-full md:w-1/2 p-4 flex justify-center'>
          <img 
            src={rec2} 
            alt="Premium Wallet" 
            className='w-full max-h-125 object-contain drop-shadow-[0_20px_50px_rgba(255,185,0,0.3)]'
          />
        </div>
      </div>
      {/* Feature start */}

      <div className=' w-full opacity-95 bg-yellow-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center mt-5'>

        {/* Left Side: Image Container */}
        <div className='w-full md:w-1/2 p-4 flex justify-center'>
          <img 
            src={rec3} 
            alt="Premium Wallet" 
            className='w-full max-h-125 object-contain drop-shadow-[0_20px_50px_rgba(255,185,0,0.3)]'
          />
        </div>
        
        {/* Right Side: Content Container */}
        <div className='w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center'>
          <h2 className='text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight'>
            Secure & <span className='text-slate-800'>Reliable</span>
          </h2>
          <p className='text-gray-300 text-lg leading-relaxed mb-8 italic'>
            "Peace of mind comes standard with every wallet we make. From strong stitching to built-in security features, you can carry your essentials with confidence."
          </p>

          <ul className='space-y-4'>
              <li className='flex items-start gap-3 text-gray-200'>
                <WalletOutlined className='text-[#ffb900] mt-1 text-lg shrink-0' />
                <span className='text-base md:text-lg'>RFID-blocking technology to prevent digital theft</span>
              </li>
              <li className='flex items-start gap-3 text-gray-200'>
                <WalletOutlined className='text-[#ffb900] mt-1 text-lg shrink-0' />
                <span className='text-base md:text-lg'>Reinforced stitching to handle daily wear and tear</span>
              </li>
              <li className='flex items-start gap-3 text-gray-200'>
                <WalletOutlined className='text-[#ffb900] mt-1 text-lg shrink-0' />
                <span className='text-base md:text-lg'>Strong, flexible interior lining for long-lasting use</span>
              </li>
              <li className='flex items-start gap-3 text-gray-200'>
                <WalletOutlined className='text-[#ffb900] mt-1 text-lg shrink-0' />
                <span className='text-base md:text-lg'>Designed to keep valuables safe and organized</span>
              </li>
          </ul>

          <button className='mt-10  bg-slate-500 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg w-fit'>
            View Collection
          </button>
        </div>
      </div>
    </div>
  );
}

export default Features;