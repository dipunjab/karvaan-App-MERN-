import React from 'react'
import { FaHome } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiPlayList2Line } from "react-icons/ri";
import { FcDislike } from "react-icons/fc";
import { MdSubscriptions } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";
import { IoGlasses } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { MdFeedback } from "react-icons/md";

function SideBar() {
  const isAuthenticated = useSelector((state) => state.auth.status);

  return (
    <div>
      <ul className="flex flex-col justify-start items-start">
        <li className="w-full sm:w-44">
          <a href="/" className="flex justify-start items-center gap-4 py-3">
            <FaHome size={25} />
            <h2 className="hidden sm:block font-medium">Home</h2>
          </a>
        </li>

        {!isAuthenticated ? (
          <p className="mt-6 ml-6 font-extralight text-sm sm:text-base">
            Join us on the Karvan app! Create your own channel to explore, discover, learn, and grow. It's your space to connect, share ideas, and make the journey meaningful. Start your adventure with Karvan today!
          </p>
        ) : (
          <>
            <li className="w-full sm:w-44">
              <a href="/" className="flex justify-start items-center gap-4 py-3">
                <FaRegPenToSquare size={25} />
                <h2 className="hidden sm:block font-medium">Tweets</h2>
              </a>
            </li>
            <li className="w-full sm:w-44">
              <a href="/" className="flex justify-start items-center gap-4 py-3">
                <RiPlayList2Line size={25} />
                <h2 className="hidden sm:block font-medium">Playlists</h2>
              </a>
            </li>
            <li className="w-full sm:w-44">
              <a href="/" className="flex justify-start items-center gap-4 py-3">
                <FcDislike size={25} />
                <h2 className="hidden sm:block font-medium">Liked Videos</h2>
              </a>
            </li>
            <li className="w-full sm:w-44">
              <a href="/" className="flex justify-start items-center gap-4 py-3">
                <MdSubscriptions color='green' size={25} />
                <h2 className="hidden sm:block font-medium">Subscriptions</h2>
              </a>
            </li>
            <li className="w-full sm:w-44">
              <a href="/" className="flex justify-start items-center gap-4 py-3">
                <BiSolidVideos size={25} />
                <h2 className="hidden sm:block font-medium">Your Videos</h2>
              </a>
            </li>
            <li className="w-full sm:w-44">
              <a href="/" className="flex justify-start items-center gap-4 py-3">
                <IoGlasses size={25} />
                <h2 className="hidden sm:block font-medium">History</h2>
              </a>
            </li>
          </>
        )}

        <hr className="w-full mt-10 mb-4 text-gray-300" />

        <li className="w-full sm:w-44">
          <a href="/" className="flex justify-start items-center gap-4 py-3">
            <IoSettings size={25} />
            <h2 className="hidden sm:block font-medium">Settings</h2>
          </a>
        </li>
        {isAuthenticated &&
          <li className="w-full sm:w-44">
            <a href="/" className="flex justify-start items-center gap-4 py-3">
              <MdFeedback color='green' size={25} />
              <h2 className="hidden sm:block font-medium">Send Feedback</h2>
            </a>
          </li>
        }
      </ul>
    </div>
  );
}

export default SideBar;
