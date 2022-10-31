import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import './navbar1.css'
import { IconContext } from 'react-icons'
const NavBar = () => {
    const [sidebar, setSidebar]= useState(false)

    const showSidebar= ()=> setSidebar(!sidebar)

    const SiedeBarData=[
        {
            title: "Events",
            path: '/',
            icon: <AiIcons.AiFillHome/>,
            cn: 'nav-text'
        },
        {
            title: "Resources",
            path: '/resource',
            icon: <IoIcons.IoIosPaper/>,
            cn: 'nav-text'
        },
        {
            title: "News",
            path: '/news',
            icon: <IoIcons.IoMdPeople/>,
            cn: 'nav-text'
        },
        {
            title: "Leads",
            path: '/leads',
            icon: <FaIcons.FaEnvelope/>,
            cn: 'nav-text'
        },
        {
            title: "Client",
            path: '/client',
            icon: <FaIcons.FaEnvelope/>,
            cn: 'nav-text'
        },
    ]
    

  return (
    <IconContext.Provider value={{ style: { color: 'white' } }}>

        <>    
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
            </div>

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar} >
                    <li className='menu-toggle'>
                        <Link to="#" className='nav-close' >
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    <li className='nav-text gdsc-title'>
                        GDSC KIMATHI
                    </li>
                    {SiedeBarData.map(( data)=>{
                    return(
                            <li  className={data.cn}>
                                <Link to ={data.path}>
                                    {data.icon}<span style={{marginLeft: '10px'}}>{data.title}</span>
                                </Link>
                            </li>
                            )
                    })}
                </ul>
            </nav>

        </>
    </IconContext.Provider>
  )
}

export default NavBar