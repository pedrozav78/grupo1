import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai";


const links = [
  {
    link: "/",
    text: "home",
    id: 1,
  },
  {
    link: "/login",
    text: "Login",
    id: 2,
  },
  {
    link: "/registro",
    text: "Registro",
    id: 3,
  },

];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ windowDimension, setWindowDinmension] = useState(
    {
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
    });

const detectSize = () =>{
  setWindowDinmension({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  });
};

useEffect(()=> {
  window.addEventListener('resize', detectSize);
  return () => {
    window.removeEventListener('resize', detectSize);
  };

},[windowDimension.innerWidth])

  return (
  <div className={
    ! isMenuOpen ?
    "flex items-center w-full px-4 justify-around bg-slate-700" :
    "flex flex-col h-full items-center w-full px-4 justify-around bg-slate-700"
  }>
    <Link to={"/"} className='text-white font-semibold text-xl p-2'>
      Los Pedros
    </Link>
    {windowDimension.innerWidth > 768
    ? links.map((l) => (
        <Link
        className='text-xl text-white font-semibold'
        to={l.link}
        key={l.id}
        >
          {l.text}
        </Link>
    ))
    : isMenuOpen &&
    links.map((l) => (
      <Link
      className='text-xl text-white font-semibold'
        to={l.link}
        key={l.id}
      >
        {l.text}
        </Link>
    ))}


    {!isMenuOpen && windowDimension.innerWidth < 768 ? (
      <AiOutlineMenu size={24} color="#f2f2f2" onClick={() =>setIsMenuOpen(true)}/> 
    ) : (
      windowDimension.innerWidth < 768 && (
      <AiOutlineClose size={24} color="#f2f2f2" onClick={() =>setIsMenuOpen(false)}/>
      )
    )}
    </div>
  );
};

