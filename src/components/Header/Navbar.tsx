import React from 'react'

const Navbar = () => {
  const navLinks = [
    { title: `Home`, path: `/` },
    { title: `About`, path: `/about` },
    { title: `Contact`, path: `/contact` }
  ]
  return (
    <div>
      <ul className='flex flex-row justify-between'>
        {navLinks.map((link, index) => (
          <li key={index}>
            <a href={link.path}>{link.title}</a>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Navbar