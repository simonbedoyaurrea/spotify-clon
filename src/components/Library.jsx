import React from 'react'
import '../styles/library.css'
import { LuLibrary } from "react-icons/lu";
import { IoIosAdd } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
import { getToken } from '../services/spotifyAuth.js';
import { useEffect,useState } from 'react';
import LibraryAlbum from './LibraryAlbum.jsx';
import { FaList } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

export default function Library() {
  const [isExpanded,setIsExpanded]=useState(true)
  const [albumsData, setAlbumsData] = useState(null);
  const albumIds = ['3dM5WCvdXdNqLE14d16GmJ','3puAvurwvtvi1rodndIPW8','6NmYJszy5BaEm1WF4tJL7Z','2rebo6PvPbmBY3KGYT8KzG','4ht3ZwHsmWhrrR8LcKd62u','5pQwQRnQOuKrbVUVnGMEN4','2Nt6MDJXfoxQ22tIQgWXIh','3RQQmkQEvNCY4prGKE6oc5','5lJqux7orBlA1QzyiBGti1','4FftCsAcXXD1nFO9RFUNFO','5AcRssiG0Zqu3lqYW7hMoM','3pkIK8SI5mcUUjb9jNjx4H']; 
  

  useEffect(() => {
    const fetchAlbumsData = async () => {
      const token = await getToken(); // Obtén el token de acceso

      try {
        const requests = albumIds.map(albumId =>
          fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        );

        const responses = await Promise.all(requests); // Espera a que todas las solicitudes se completen
        const albums = await Promise.all(responses.map(res => res.json())); // Procesa las respuestas

        setAlbumsData(albums); // Guarda la información de los álbumes
      } catch (error) {
        console.error('Error al obtener los álbumes:', error);
      }
    };

    fetchAlbumsData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 750) { // Cambia el valor 600 al ancho deseado
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    handleResize(); // Llama a la función una vez para inicializar el estado
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Expand=()=>{
    setIsExpanded(!isExpanded)
  }


  return (
    <div className={`library-container ${isExpanded?'expanded':'collapsed'}`}>
        <div className='library-logo-container'>
          <div className='library-logo'>
            <button className="library-logo-button" onClick={Expand}>
              <LuLibrary />
            </button>{isExpanded?
            <p>Tu blibioteca</p>:null
            }
          </div>{isExpanded?
          <div className='library-add-expand-icons'>
            <IoIosAdd className='icon-add-expand' />
            <IoMdArrowForward className='icon-add-expand' />
          </div>:null
          }
        </div>
        {isExpanded?
        <div className='filters'>
          <div className='filter-button'>Playlists</div>
          <div className='filter-button'>Artistas</div>
          <div className='filter-button'>Albumes</div>
          <div className='filter-button'>Podcasts</div>
        </div>:
        null
        }
        <div className={`playlists-container`} >{ isExpanded?
          <div className='search-playlist-container'>
            <IoSearchOutline className='search-playlist-icon' />
            <div className='playlist-filters'>
              <p>Recientes</p>
              <FaList />
            </div>
          </div>:null
          }
          {albumsData && (
            albumsData.map((album)=><LibraryAlbum albumData={album} isExpanded={isExpanded} />))
          }
        </div>
    </div>
  )
}
