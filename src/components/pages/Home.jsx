import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { obtenerGenresListAccion, seleccionarGenreAccion, obtenerPlaylistAccion, seleccionarPlaylistAccion, obtenerTracksListAccion } from '../../redux/spotifyDucks';

import Dropdown from '../molecules/Dropdown';
import ListCards from '../organisms/ListCards';


const Home = () => {


    const [ disabled, setDisabled ] = useState( true );

    const dispatch = useDispatch();

    //data del state
    const { genresList, genreSelected, token, playlist, playlistSelected } = useSelector( state => state.spotify );
    const { loading } = useSelector( state => state.ui );
    console.log( { loading } );

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

        setDisabled( false );

    };

    const handleSubtmitBuscarTracks = ( e ) => {
        e.preventDefault();
        console.log( 'subtmit button buscar tracks' );
        // dispatch buscar tracks
        dispatch( obtenerTracksListAccion() );
    };

    useEffect( () => {

        const fecthData = () => {

            dispatch( obtenerGenresListAccion() );
            
        };

        fecthData();


    }, [ dispatch ] );


    return (
        <div>
            <form onSubmit={ handleSubtmitBuscarTracks } >

                {/* GENRES LIST */ }
                {
                    !loading ?

                        <Dropdown
                            options={ genresList }
                            selectedValue={ genreSelected }
                            changed={ handleGenreOnChange }
                        />
                        :
                        <div className="spinner-grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>

                }


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
                    className="btn btn-light"
                    disabled={ disabled }
                // disabled={ false }
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
