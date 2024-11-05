import React from 'react'
import '../styles/nav.css'
import { FaSpotify } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { BiArchive } from "react-icons/bi";
import { GoBell } from "react-icons/go";

export default function Nav() {
  return (
    <div className='nav-bar'>
        <div className='logo-container'>
          < FaSpotify className='spotify-logo' />
        </div>
        <div className='search-input-container'>
          <div className='home-icon-container'>
            <GoHome />
          </div>
          <div className='input-container'>
            <IoSearchOutline className='search-icon' />
            <input type="text" placeholder='¿Que quieres escuchar?'/>
            <BiArchive className="browse-icon" />
          </div>
        </div>
        <div className='user-container'>
          <GoBell className="bell" />
          <div className='user-profile'>
            <div>s</div>
          </div>
        </div>
    </div>
  )
}
