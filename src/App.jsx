import './App.css'
import CurrentTrack from './components/CurrentTrack'
import Library from './components/Library'
import MainContent from './components/MainContent'
import MusicPlayer from './components/MusicPlayer'
import Nav from './components/Nav'
import { TrackProvider } from './context/TrackContext.jsx';
import { AlbumProvider } from './context/AlbumContext.jsx';
import Content from './components/Content.jsx'
import { RigthSideProvider } from './context/RigthSideContext.jsx'



function App() {
  

  return (
    <>
      <Nav />
      <AlbumProvider >
      <TrackProvider>
      <RigthSideProvider>
        <MusicPlayer />
        <Content />
      </RigthSideProvider>
      </TrackProvider>
      </AlbumProvider>
    </>
  )
}

export default App
