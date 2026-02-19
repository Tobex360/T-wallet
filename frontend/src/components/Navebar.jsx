import React, { useState } from 'react'
import { ShoppingCartOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Logo from "../assets/Mode=dark mode.svg"

function Navebar() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className='flex bg-yellow-700 justify-between p-2 text-l items-center'>
        <div><Link to='/'><img src={Logo} alt="" /></Link></div>
        {/* Desktop nav */}
        {(<div className='hidden sm:flex gap-3 text-white text-xl text-bold mr-4'>
          <Link className='fl'>Home</Link>
          <Link className='fl'>Features</Link>
          <Link className='fl'>Store</Link>
          <Link className='fl'><ShoppingCartOutlined /></Link>
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
          <Link className='fl'><ShoppingCartOutlined /></Link>
        </div>)}
    </div>
  )
}

export default Navebar