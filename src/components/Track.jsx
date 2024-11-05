import React , { useContext } from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdExplicit } from "react-icons/md";
import '../styles/track.css'
import { IoMdAddCircleOutline } from "react-icons/io";
import { useTrackContext } from '../context/TrackContext.jsx';
 
export default function Track({track,index}) {

    const { currentTrack,setCurrentTrack } = useTrackContext();

    const formattedDuration = formatTime(track.duration_ms);

    const handleClick=(data)=>{
        setCurrentTrack(data)
    }

  return (
    <div className="track-container" onClick={()=>handleClick(track)}>
        <div>
            <div className='index-trackname'>
                <p className="index" >{index+1}</p>
                <div>
                <p className='track-song-name'>{track.name}</p>
                <div className='artists-container'>
                    <MdExplicit className='explicit-icon' />
                    <p>{track.artists.map(artist=>artist.name).join(',')}</p>
                </div>
                </div>
            </div>
        </div>
        <div className='track-buttons-container'>
            <button><IoMdAddCircleOutline  /></button>
            <p>{formattedDuration}</p>
            <button><HiOutlineDotsHorizontal  /></button>
        </div>
    </div>
  )
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
}