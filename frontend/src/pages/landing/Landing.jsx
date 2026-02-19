import React from 'react'
import bg from "../../assets/bg.jpg"
import wallet from "../../assets/wallet hero.svg"
import line from "../../assets/Line 1.svg"
import { Link } from 'react-router-dom'
import { Button } from 'antd';
import rec1 from "../../assets/Rectangle 40.svg"
import rec2 from "../../assets/Rectangle 41.svg"
import rec3 from "../../assets/Rectangle 42.svg"
import "../../App.css"

function Landing() {
  return (
    <>
      <div className='flex flex-col items-center' style={{
       backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh'
    }}>
      <div className='flex flex-col lg:flex-row mt-4'>
        <div>
          <img src={wallet} alt="" />
        </div>
        <div className='flex flex-col opacity-95 bg-yellow-700 gap-4 text-white pr-28 pl-6 pt-3'>
          <div className='text-7xl pd text-bold'>CARRY STYLE</div>
          <div className='text-5xl dh'>Carry Confidence</div>
          <div><img src={line} alt="" /></div>
          <div>Premium wallets crafted for durability, elegance, and everyday use.</div>
          <div className='flex gap-3 '>
            <Link><button className=' bg-slate-500 text-white px-8 py-3 rounded font-bold hover:bg-slate-700'>Buy Now</button></Link>
            <Link><button className=' bg-slate-500 text-white px-8 py-3 rounded font-bold hover:bg-slate-700'>Learn more</button></Link>
          </div>
        </div>

      </div>

      <div className='flex flex-col md:flex-row mt-5 gap-4 mb-5'>
        <div className='flex flex-col opacity-95 text-white items-center bg-yellow-700 rounded-lg shadow-md p-6 gap-3 hover:scale-96 transition-all duration-300'>
          <img src={rec1} alt="" />
          <div className='mt-3 text-2xl font-black text-center'>Premium Materials</div>
          <div className='text-sm max-w-xs text-center'>Crafted from high-quality leather designed to age beautifully with time.</div>
          <div><Link><button className=' text-sm font-bold tracking-widest text-white border-b-2 border-transparent hover:border-white transition-all pb-1'>Learn more</button></Link></div>
        </div>
        <div className='flex flex-col opacity-95 text-white items-center bg-yellow-700 rounded-lg shadow-md p-6 gap-3 hover:scale-96 transition-all duration-300'>
          <img src={rec2} alt="" />
          <div className='mt-3 text-2xl font-black text-center'>Smart Design</div>
          <div className='text-sm max-w-xs text-center'>Slim, lightweight, and functional everything you need, nothing you don’t.</div>
          <div><Link><button className='text-sm font-bold tracking-widest text-white border-b-2 border-transparent hover:border-white transition-all pb-1'>Learn more</button></Link></div>
        </div>
        <div className='flex flex-col opacity-95 text-white items-center bg-yellow-700 rounded-lg shadow-md p-6 gap-3 hover:scale-96 transition-all duration-300'>
          <img src={rec3} alt="" />
          <div className='mt-3 text-2xl font-black text-center'>Secure & Reliable</div>
          <div className='text-sm max-w-xs text-center'>Engineered with strong stitching and RFID protection for peace of mind.</div>
          <div><Link><button className='text-sm font-bold tracking-widest text-white border-b-2 border-transparent hover:border-white transition-all pb-1'>Learn more</button></Link></div>
        </div>
      </div>

      </div>
    </>
  )
}

export default Landing