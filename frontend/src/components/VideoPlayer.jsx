import React, { useRef, useState } from "react";
import { IoPlay } from "react-icons/io5";
import { FaPause } from "react-icons/fa6";
import { LuFullscreen } from "react-icons/lu";
import { FaVolumeHigh } from "react-icons/fa6";

//Todo: Design Player In best shape

const VideoPlayer = ({ videoSrc, thumbnail }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [duration, setDuration] = useState(0);


    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleProgress = () => {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        setProgress((currentTime / duration) * 100);
    };

    const handleSeek = (e) => {
        const newTime = (e.target.value / 100) * videoRef.current.duration;
        videoRef.current.currentTime = newTime;
        setProgress(e.target.value);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    const handleFullscreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) {
            videoRef.current.mozRequestFullScreen();
        }
    };

    const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration);
    };

    const getProgressBackground = () => {
        const played = progress; 
        return `linear-gradient(to right, #22c55e ${played}%, #edf1f4 ${played}%)`; // Green for played, light grey for unplayed
    };

    return (
        <div className="w-full max-w-2xl bg-black rounded-lg shadow-lg">
                <video
                    ref={videoRef}
                    src={videoSrc}
                    poster={thumbnail}
                    onTimeUpdate={handleProgress}
                    onLoadedMetadata={handleLoadedMetadata}
                    className="w-full h-[240px] rounded-lg"
                    />

            <div className="p-2">

                <div className="rangee flex text-white text-[10px] gap-2">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleSeek}
                        style={{ background: getProgressBackground() }}
                        className="w-full cursor-pointer range-input mt-1"
                        />
                        <p>{duration}</p>
                </div>
                <div className="flex justify-between gap-4 mt-2">
                    <div className="flex justify-center items-center gap-6">
                        <button
                            onClick={handlePlayPause}
                            className="cursor-pointer"
                        >
                            {isPlaying ? <FaPause color="green" size={30}/> : <IoPlay color="green" size={30}/>}
                        </button>
                        <div className="flex items-center gap-2">
                            <FaVolumeHigh color="green"/>
                            <input
                                id="volume"
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="cursor-pointer range-volume"
                            />
                        </div>
                    </div>

                    <button onClick={handleFullscreen} className="cursor-pointer">
                        <LuFullscreen color="green" size={30}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
