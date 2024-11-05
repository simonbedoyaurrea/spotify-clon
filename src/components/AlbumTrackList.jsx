import React, { useEffect, useRef, useState } from 'react';
import { useAlbumContext } from '../context/AlbumContext.jsx';
import ColorThief from 'colorthief';
import { getToken } from '../services/spotifyAuth.js';
import '../styles/album-tracklist.css';
import Track from './Track.jsx';
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useTrackContext } from '../context/TrackContext.jsx';

export default function AlbumTrackList() {
  const { value } = useAlbumContext();
  const [tracks, setTracks] = useState(null);
  const [artist, setArtist] = useState(null);
  const [bgColor, setBgColor] = useState('rgb(0, 0, 0)'); // Estado para el color de fondo
  const imgRef = useRef(null); // Referencia para la imagen del álbum
  const { currentTrack,setCurrentTrack } = useTrackContext();

  useEffect(() => {
    const fetchAlbumsData = async () => {
      if (!value) return;

      const token = await getToken();

      try {
        const response = await fetch(`https://api.spotify.com/v1/albums/${value.id}/tracks?limit=50`, {
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
        setTracks(data.items);

        const responseArtist = await fetch(`https://api.spotify.com/v1/artists/${value.artists[0].id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!responseArtist.ok) {
          throw new Error('Error al obtener el artista');
        }

        const dataArtist = await responseArtist.json();
        setArtist(dataArtist);
      } catch (error) {
        console.error('Error al obtener los álbumes:', error);
      }
    };

    fetchAlbumsData();
  }, [value]);

  // Extraer el color cuando la imagen termine de cargar
  const handleImageLoad = () => {
    if (imgRef.current) {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(imgRef.current);
      setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    }
  };
  const handleClick=(data)=>{
    setCurrentTrack(data)
}


  return (
    <div>
      {tracks && value && artist && (
        <>
          <div className="album-info-container" style={{ backgroundColor: bgColor }}>
            <img
              ref={imgRef}
              src={value.images[1].url}
              alt=""
              crossOrigin="anonymous"
              onLoad={handleImageLoad} 
            />
            <div className='album-info'>
              <span className='type-album'>{value.type}</span>
              <h1 className='album-tracklist-name'>{value.name}</h1>
              <div className='more-info-container'>
                <img className='artist-image' src={artist.images[0].url} alt="" />
                <p className='artist-name'>{value.artists[0].name} ● </p>
                <span>{value.release_date.substring(0, 4)} ● </span>
                <span>{value.total_tracks} canciones</span>
              </div>
            </div>
          </div>
          <div className="playlist-buttons-container">
            <div>
              <button onClick={()=>handleClick(tracks[0])}><div className='play-album' ><IoPlay /></div></button>
              <button><IoMdAddCircleOutline className='add-album'/></button>
              <button><HiOutlineDotsHorizontal className='album-more-options' /></button>
            </div>
          </div>
          <div>
            {tracks.map((track, index) => (
              <Track key={index} track={track} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
