import React, { useEffect, useRef, useState } from 'react'
import { FiUpload } from "react-icons/fi";

import { useSelector } from 'react-redux';
import CreateModal from './CreateModal';

const CreateButton = () => {
    const modalRef = useRef(null);
    const [modal, setModal] = useState(false)
    const isAuthenticated = useSelector((state) => state.auth.status)

    const showModal = () => {
        setModal(true)
    }

    const closeModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setModal(false);
        }
    };

    useEffect(() => {
        if (modal) {
            document.addEventListener('mousedown', closeModal);
        } else {
            document.removeEventListener('mousedown', closeModal);
        }
        return () => document.removeEventListener('mousedown', closeModal);
    }, [modal]);


    return (
        <div onClick={showModal} className={`${modal && "bg-green-400 border-green-600"} relative flex cursor-pointer gap-2 border-2 shadow shadow-gray-200 border-gray-300 p-2 rounded-4xl`}>
            {
                isAuthenticated ?
                    (
                        <div className='cursor-pointer flex gap-2'>
                            <h2 className={`${modal && "text-green-950 "} text-gray-400 font-palanquin sm:block hidden`}>Create</h2>
                            <FiUpload size={20} color={`${modal ? "green" : "gray"}`} />
                        </div>
                    ) :
                    <p className='text-[12px] sm:text-[14px] font-light'>Join To Create</p>
            }
            {modal && isAuthenticated?
                (
                        <div ref={modalRef} className='absolute top-12 right-0 md:left-0'>
                            <CreateModal />
                        </div>
                ) : null}
        </div>
    )
}

export default CreateButton