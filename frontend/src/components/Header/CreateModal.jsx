import React, { useState } from 'react'
import { MdOutlineVideoSettings } from "react-icons/md";
import { LiaCommentMedicalSolid } from "react-icons/lia";
import VideoForm from '../VideoForm';
import TweetForm from '../TweetForm';

const CreateModal = () => {
    const [formType, setFormType] = useState(null);

    const showVideoForm = () => {
        setFormType("video")
    }

    const showTweetForm = () => {
        setFormType("tweet")
    }

    const closeForm = () => setFormType(null);


    return (
        <>
            {!formType && (
                <div className='w-45 border-2 rounded-2xl p-2 border-green-300 bg-green-300 shadow shadow-green-300'>
                    <div onClick={showVideoForm} className='flex justify-between items-center p-1 hover:bg-green-200 rounded-4xl'>
                        <h2 className='text-[14px] font-semibold'>Upload Video</h2>
                        <MdOutlineVideoSettings />
                    </div>
                    <div onClick={showTweetForm} className='flex justify-between items-center p-1 hover:bg-green-200 rounded-4xl'>
                        <h2 className='text-[14px] font-semibold'>Tweet</h2>
                        <LiaCommentMedicalSolid />
                    </div>
                </div>
            )}
            {
                formType === "video" &&
                (
                    <div className='shadow shadow-green-300 drop-shadow-lg rounded-2xl fixed top-20  right-[5%] sm:right-[6%] lg:right-[9%]'>
                        <VideoForm closeForm={closeForm}/>
                    </div>
                )
            }
            {
                formType === "tweet" &&
                (
                    <div className='shadow shadow-green-300 drop-shadow-lg rounded-2xl fixed top-20  right-[5%] sm:right-[6%] lg:right-[25%]'>
                        <TweetForm closeForm={closeForm}/>
                    </div>
                )
            }

        </>
    )
}

export default CreateModal
