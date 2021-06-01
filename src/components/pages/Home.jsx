import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { leerTokenAccion, obtenerGenresListAccion, seleccionarGenreAccion, obtenerPlaylistAccion, seleccionarPlaylistAccion, obtenerTracksListAccion } from '../../redux/spotifyDucks';

import Dropdown from '../molecules/Dropdown';
import ListCards from '../organisms/ListCards';


const Home = () => {

    const dispatch = useDispatch();

    //data del state
    const { genresList, genreSelected, token, playlist, playlistSelected } = useSelector( state => state.spotify );
    console.log( { genresList } );
    console.log( { token_home: token } );

    // funciones Change
    const handleGenreOnChange = ( value ) => {
        console.log( "genre select", value );
        if ( value ) {
            dispatch( seleccionarGenreAccion( value ) );
            dispatch( obtenerPlaylistAccion() );
        }
    };

    const handlePlaylistOnChange = ( value ) => {
        console.log( "playlist select", value );
        //dispatch para seleccionar un elemento
        dispatch( seleccionarPlaylistAccion( value ) );

    };

    const handleSubtmitBuscarTracks = ( e ) => {
        e.preventDefault();
        console.log( 'subtmit button buscar tracks' );
        // dispatch buscar tracks
        dispatch( obtenerTracksListAccion() );
    };

    useEffect( () => {

        const fecthData = () => {

            if ( !localStorage.getItem( 'token' ) ) {

                dispatch( leerTokenAccion() );

            } else {
                dispatch( obtenerGenresListAccion() );
            }
        };

        fecthData();


    }, [ dispatch ] );


    return (
        <div>
            <form onSubmit={ handleSubtmitBuscarTracks } >

                {/* GENRES LIST */ }
                <Dropdown
                    options={ genresList }
                    selectedValue={ genreSelected }
                    changed={ handleGenreOnChange }
                />

                {/* PLAYLISTS */ }
                {
                    genreSelected &&

                    <Dropdown
                        options={ playlist }
                        selectedValue={ playlistSelected }
                        changed={ handlePlaylistOnChange }
                    />
                }

                <button
                    type="submit"
                    className="btn btn-dark"
                // onClick={ handleLoadGenres }
                >
                    Buscar
                </button>

                {/* TRACKS */ }
                <ListCards
                    // clicked={ listboxClicked }
                />

                
               
            </form>
        </div>
    );
};

export default Home;
