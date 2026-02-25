import React from 'react'
import hero from '../../assets/frame 21.jpg'
import { useState } from 'react'
import { useEffect } from 'react'
import "../../App.css"

function Store() {
    const [firstname, setFirstname] = useState("")
    const [username, setUsername] = useState("")
    const [lastname, setLastname] = useState("")

    useEffect(()=>{
      const user = localStorage.getItem('user');

      if (user){
        const userData = JSON.parse(user);
        setUsername(userData.username || 'User');
        setFirstname(userData.firstname || 'Firstname');
        setLastname(userData.lastname || 'lastname');
      }
    },[])

  return (
    <>
    <div className='flex flex-col'>
      <div className=' flex flex-col mx-3 my-5 justify-center' style={{
            backgroundImage: `url(${hero})`,
            backgroundSize: 'cover',
            minHeight: '550px',
            position: 'relative',
            backgroundPosition: 'center',
          }}>
            <div className='flex flex-col gap-3 ml-10'>
              <div className='pd text-white text-6xl font-black max-w-100'>Discover What's New</div>
              <div className='text-white max-w-100'>Fresh styles, timeless quality. Explore our latest wallet collection designed to bring you modern elegance, smart features, and everyday durability. Be the first to upgrade your carry.</div>
            </div>

      </div>
      <div>Hello {username}</div>
      
    </div>
    </>
  )
}

export default Store