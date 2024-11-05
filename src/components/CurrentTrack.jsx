import React, { useEffect, useState } from 'react';
import '../styles/current-track.css';
import { useAlbumContext } from '../context/AlbumContext.jsx';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useTrackContext } from '../context/TrackContext.jsx';
import { IoMdAddCircleOutline } from "react-icons/io";
import { getToken } from '../services/spotifyAuth.js';
import { useRigthSideContext } from '../context/RigthSideContext.jsx';

export default function CurrentTrack() {
  const { value } = useAlbumContext();
  const [infoTrack, setInfoTrack] = useState();
  const { currentTrack } = useTrackContext();
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

  const ToogleSection = () => {
    setIsOpen(!isOpen);
  };

  return isOpen ? (
    <div className='current-track-container'>
      <div className='current-seccion-album'>
        <p>{(value && infoTrack) ? value.name : ' '}</p>
        <span>
          <HiOutlineDotsHorizontal />
          <IoMdClose onClick={ToogleSection} />
        </span>
      </div>
      {value && infoTrack && (
        <div className="current-track-info-container">
          <img src={infoTrack.album.images[1]?.url} alt={value.name} className='current-track-image' />
          <div className="current-track-info">
            <div className="current-track-info-names">
              <p className="current-track-name">{currentTrack?.name}</p>
              <span className="current-track-artists">{currentTrack?.artists.map(a => a.name).join(", ")}</span>
            </div>
            <IoMdAddCircleOutline className="add-track-icon" />
          </div>
        </div>
      )}
    </div>
  ) : null;
}
