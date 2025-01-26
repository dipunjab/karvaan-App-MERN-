import React from 'react'
import profileIcon from "../../assets/profileIcon.jfif"

const ProfileButton = () => {
  return (
    <div className='w-14 h-14 shadow shadow-green-500 p-2 rounded-[50px]'>
        <img src={profileIcon} alt="profileIcon" />
    </div>
  )
}

export default ProfileButton
