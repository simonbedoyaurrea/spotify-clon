import React, { useEffect, useState } from 'react';
import '../styles/main-content.css';
import AlbumTrackList from './AlbumTrackList';



export default function MainContent() {
  return (
    <div className='main-content-container'>
      <AlbumTrackList />
    </div>
  );
}
