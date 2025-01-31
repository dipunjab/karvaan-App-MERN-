import React, { useEffect, useRef, useState } from 'react'
import profileIcon from "../../assets/profileIcon.jfif"
import ProfileModal from './ProfileModal';

import { useDispatch, useSelector } from 'react-redux'
import { closeModal, openModal } from '../../store/modalSlice';

const ProfileButton = () => {
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    const modal = useSelector((state) => state.modal.show);

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



    return (
        <div onClick={toggleModal} className='w-14 h-14 shadow cursor-pointer shadow-green-500 p-2 rounded-[50px]'>
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
