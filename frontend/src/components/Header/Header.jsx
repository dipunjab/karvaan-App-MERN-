import React, { useEffect, useState } from 'react'
import logo from "../../assets/KarvanLogo.png"
import SearchInput from './SearchInput'
import CreateButton from './CreateButton'
import ProfileButton from './ProfileButton'

const Header = () => {

  const [countryCode, setCountryCode] = useState(() => localStorage.getItem("countryCode") || null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (!countryCode) {
          const response = await fetch(`https://ipinfo.io?token=${import.meta.env.VITE_IP_INFO_TOKEN}`);
          const data = await response.json();

          if (data && data.country) {
            setCountryCode(data.country);
            localStorage.setItem("countryCode", data.country); 
          }
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocation();
  }, [countryCode]); 


  

  return (
    <header className="fixed top-0 flex left-0 w-full justify-evenly h-16 bg-white p-1 z-10">
      {/* Logo */}
      <div className='flex sm:flex-row flex-col'>
        <div className='w-20 mt-3 sm:mt-0 sm:w-24 md:w-28 lg:h-12'>
            <img src={logo} alt="KarvaanLogo" />
        </div>
        <div className='sm:mt-6 sm:hide md:text-2xl font-semibold'>
          <p className='font-palanquin'>
            Karvaan.{countryCode &&
             <span className='font-palanquin text-[8px] font-light'>{countryCode}</span>
             }
            </p>
        </div>
      </div>

      {/* Serach */}
      <div className='mt-4'>
        <SearchInput/>
      </div>

      {/* upload button */}
      <div className='mt-4'>
        <CreateButton/>
      </div>

      {/* profile button */}
      <div className='mt-2'>
          <ProfileButton/>
      </div>
    </header>
  )
}

export default Header
