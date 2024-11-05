import React from 'react'
import Library from './Library'
import MainContent from './MainContent'
import CurrentTrack from './CurrentTrack'
import '../styles/content.css'

export default function Content() {
  return (
    <div className='content-container'>
        <Library />
        <MainContent />
        <CurrentTrack />
    </div>
  )
}
