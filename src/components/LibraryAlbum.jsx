import React, { useContext } from 'react'
import '../styles/library-album.css'
import { useAlbumContext } from '../context/AlbumContext.jsx';

export default function LibraryAlbum({albumData,isExpanded}) {
    const { value, setValue } = useAlbumContext();

    const handleClick=(data)=>{
        setValue(data)
    }

  return (
    <>
        {albumData && 
        <div className='playlist-album-container' onClick={() => handleClick(albumData)}>
            <img src={albumData.images[2].url} alt={`Portada del álbum ${albumData.name}`} className='album-image' />{
                isExpanded?
            <div>
                <p>{albumData.name}</p>
                <div style={{display:'flex',alignItems:'center',height:'20px'}}>
                    <span>Álbum</span>
                    <span className='dot'>·</span>
                    <span>{albumData.artists.map(artist => artist.name).join(', ')}</span>
                </div>
                
            </div>:null}
        </div>  
        }
    </>
)
}

