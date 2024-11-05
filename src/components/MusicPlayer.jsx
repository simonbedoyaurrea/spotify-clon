import React, { useEffect, useState } from 'react'
import '../styles/music-player.css'
import { FaPlayCircle } from "react-icons/fa";
import { FaBackwardStep } from "react-icons/fa6";
import { FaForwardStep } from "react-icons/fa6";
import { IoShuffleOutline } from "react-icons/io5";
import { CiRepeat } from "react-icons/ci";
import { CgPlayButtonR } from "react-icons/cg";
import { TbMicrophone2 } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { PiDevices } from "react-icons/pi";
import { CgMiniPlayer } from "react-icons/cg";
import { AiOutlineMuted } from "react-icons/ai";
import { RiExpandDiagonalLine } from "react-icons/ri";
import Slider from '@mui/material/Slider';
import {useTrackContext} from '../context/TrackContext.jsx';
import { getToken } from '../services/spotifyAuth.js';
import { useRigthSideContext } from '../context/RigthSideContext.jsx';


export default function MusicPlayer() {

    const {currentTrack} = useTrackContext();
    const [infoTrack, setInfoTrack] = useState();
    const {isOpen, setIsOpen}=useRigthSideContext()

    useEffect(() => {
        const fetchAlbumsData = async () => {
          if (!currentTrack) return;
    
          const token = await getToken();
          try {
            const response = await fetch(`https://api.spotify.com/v1/tracks/${currentTrack.id}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              throw new Error('Error al obtener los tracks del álbum');
            }
    
            const data = await response.json();
            setInfoTrack(data);
          } catch (error) {
            console.error('Error al obtener los álbumes:', error);
          }
        };
    
        fetchAlbumsData();
      }, [currentTrack]);

      const ToogleSection=()=>{
        setIsOpen(!isOpen)
      }
    

    return (
        <div className='player'>
            <div className='player-info-song'>{infoTrack &&
             <>
                <img src={infoTrack.album.images[0]?.url}  className='player-song-cover' />
                <div className='song-names'>
                    <p className='player-song-name'>{currentTrack?currentTrack.name:"cancion"}</p>
                    <span className='player-singers'>{currentTrack?.artists.map(artist=>artist.name).join(',')}</span>
                </div>
                </>
                }
            </div>
            <div className='player-main-buttons'>
                <div className="main-buttons-container">
                    <IoShuffleOutline className='player-button-icon'/>
                    <FaBackwardStep className='player-button-icon' />
                    <FaPlayCircle className='play-button' />
                    <FaForwardStep className='player-button-icon' />
                    <CiRepeat className='player-button-icon' />
                </div>
                <div>
                    <div className='progress-bar'></div>
                </div>
            </div>
            <div className='player-secondary-buttons'>
                <CgPlayButtonR onClick={ToogleSection} className='secondary-button-icon'/>
                <TbMicrophone2  className='secondary-button-icon' />
                <HiOutlineQueueList className='secondary-button-icon' />
                <PiDevices  className='secondary-button-icon' />
                <AiOutlineMuted  className='secondary-button-icon' />
                <Slider
                    defaultValue={50}
                    aria-label="Volume"
                    valueLabelDisplay="auto"
                    sx={{
                        width: 60,
                        color: '#1DB954', // Color verde de Spotify
                    }}
                    />
                <CgMiniPlayer className='secondary-button-icon' />
                <RiExpandDiagonalLine  className='secondary-button-icon' />
            </div>
        </div>
    )
}
