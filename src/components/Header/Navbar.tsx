import React from 'react'
import { NavLink } from 'react-router-dom'
import { appRoutes } from '../../lib/appRoutes'

const Navbar = () => {
  const navLinks = [
    { title: `Mint`, path: appRoutes.home_path },
  ]
  return (
    <div>
      <ul className='flex flex-row justify-between'>
        {navLinks.map((link, index) => (
          <NavLink key={index} to={link.path} className='text-white'>
            <li className='text-white'>{link.title}</li>
          </NavLink>
        ))}
      </ul>


    </div>
  )
}

export default Navbar