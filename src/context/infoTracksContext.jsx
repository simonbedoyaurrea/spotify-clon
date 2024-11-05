// src/context/TrackContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken } from '../services/spotifyAuth.js';

const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [infoTrack, setInfoTrack] = useState(null);

  useEffect(() => {
    const fetchTrackData = async () => {
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
          throw new Error('Error al obtener la pista');
        }

        const data = await response.json();
        setInfoTrack(data);
      } catch (error) {
        console.error('Error al obtener la pista:', error);
      }
    };

    fetchTrackData();
  }, [currentTrack]);

  return (
    <TrackContext.Provider value={{ currentTrack, setCurrentTrack, infoTrack }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackContext = () => {
  return useContext(TrackContext);
};
