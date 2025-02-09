import React, { useEffect, useRef, useState } from 'react'
import profileIcon from "../../assets/profileIcon.jfif"
import ProfileModal from './ProfileModal';
import { CgProfile } from "react-icons/cg";

import { useDispatch, useSelector } from 'react-redux'
import { closeModal, openModal } from '../../store/modalSlice';
import { useNavigate } from 'react-router-dom';

const ProfileButton = () => {
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    const modal = useSelector((state) => state.modal.show);
    const isAuthenticated = useSelector((state) => state.auth.status)
    const userDataPF = useSelector((state) => state.auth.userData)

    const avatar =  userDataPF?.userData.data?.avatar

    
    const navigate = useNavigate()


    const navToAuth = ()=>{
        navigate("/login")
    }

    const toggleModal = () => {
        if (modal) {
            dispatch(closeModal()); 
        } else {
            dispatch(openModal()); 
        }
    };

    const closeModalProfile = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            dispatch(closeModal());
        }
    };

    useEffect(() => {
        if (modal) {
            document.addEventListener('mousedown', closeModalProfile);
        } else {
            document.removeEventListener('mousedown', closeModalProfile);
        }
        return () => document.removeEventListener('mousedown', closeModalProfile);
    }, [modal]);



   return isAuthenticated ?  (
        <div onClick={toggleModal} className='w-14 h-14 shadow cursor-pointer shadow-gray-300 rounded-[50px]'>
            <img src={avatar} alt="profileIcon" className='w-14 h-14 rounded-[50px]' />
            {modal ?
                (
                    <div ref={modalRef} className='absolute top-16 left-[70%] lg:left-[85%]'>
                        <ProfileModal />
                    </div>
                ) : null}
        </div>
    ): 
    (
        <div className='w-14 h-14 shadow cursor-pointer hover:shadow-gray-700 shadow-gray-300 p-2 rounded-[50px]' onClick={navToAuth}>
            <CgProfile size={40}/>
            <p className='font-bold text-[7px]'>Sign-Up</p>
        </div>
    )
}

export default ProfileButton
