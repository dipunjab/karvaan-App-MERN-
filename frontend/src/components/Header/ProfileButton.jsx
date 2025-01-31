import React, { useEffect, useRef, useState } from 'react'
import profileIcon from "../../assets/profileIcon.jfif"
import ProfileModal from './ProfileModal';

const ProfileButton = () => {
  const modalRef = useRef(null);
  const [modal, setModal] = useState(false)

  const showModal = () => {
          setModal(true)
      }
  
      const closeModal = (e) => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
              setModal(false);
          }
      };
  
      // Close modal when clicking outside
      useEffect(() => {
          if (modal) {
              document.addEventListener('mousedown', closeModal);
          } else {
              document.removeEventListener('mousedown', closeModal);
          }
          return () => document.removeEventListener('mousedown', closeModal);
      }, [modal]);



  return (
    <div onClick={showModal} className='w-14 h-14 shadow cursor-pointer shadow-green-500 p-2 rounded-[50px]'>
      <img src={profileIcon} alt="profileIcon" />
      {modal ?
                (
                    <div ref={modalRef} className='absolute top-16 left-[70%] lg:left-[85%]'>
                        <ProfileModal />
                    </div>
                ) : null}
    </div>
  )
}

export default ProfileButton
