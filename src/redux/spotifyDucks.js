import axios from 'axios';
// importacion de credenciales de los key de spotify
import { Credenciales } from '../config/credenciales';

//initialState
const dataInicial = {
    token: null,
    genresList: [],
    genreSelected: null,

    playlist: [],
    playlistSelected: null,
    tracksList: [],
    trackSelected: null,
    
    favoritesList: []
};

//types
const GET_GENRE_LIST = 'GET_GENRE_LIST';
const GENRE_SELECTED = 'GENRE_SELECTED';
const GET_PLAYLIST = 'GET_PLAYLIST';
const PLAYLIST_SELECTED = 'PLAYLIST_SELECTED';
const GET_TRACKS_LIST = 'GET_TRACKS_LIST';
const TRACKS_SELECTED = 'TRACKS_SELECTED';
const GET_FAVORITE = 'GET_FAVORITE';
const GET_TOKEN = 'GET_TOKEN';


// reducers
export default function spotifyReducer ( state = dataInicial, action ) {
    console.log( { action } );
    switch ( action.type ) {

        case GET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case GET_GENRE_LIST:
            return {
                ...state,
                genresList: action.payload
            };
        case GENRE_SELECTED:
            return {
                ...state,
                genreSelected: action.payload
            };
        case GET_PLAYLIST:
            return {
                ...state,
                playlist: action.payload
            };
        case PLAYLIST_SELECTED:
            return {
                ...state,
                playlistSelected: action.payload
            };
        case GET_TRACKS_LIST:
            return {
                ...state,
                tracksList: action.payload
            };
        case TRACKS_SELECTED:
            return {
                ...state,
                trackSelected: action.payload
            };
        default:
            return {
                ...state
            };
    }

}


// actions

export const leerTokenAccion = () => async ( dispatch, getState ) => {

    const spotify = Credenciales();

    try {

        const res = await axios( 'https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa( spotify.ClientId + ':' + spotify.ClientSecret )
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        } );

        // console.log( res );

        const { access_token } = res.data;

        // console.log( { access_token } );

        //guardar token en localstorage
        localStorage.setItem( 'token', JSON.stringify( access_token ) );

        //hacer dispatch de login correcto
        dispatch( {
            type: GET_TOKEN,
            payload: access_token
        } );


    } catch ( error ) {
        console.log( 'ERROR TOKEN ACCION', error );

    }
};


// GENRES
export const obtenerGenresListAccion = () => async ( dispatch, getState ) => {

    const token = JSON.parse( localStorage.getItem( 'token' ) );
    console.log( { token } );

    try {

        const res = await axios( 'https://api.spotify.com/v1/browse/categories?locale=es_CO', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        } );

        const { items } = res.data.categories;
        console.log( { genres: items } );


        dispatch( {
            type: GET_GENRE_LIST,
            payload: items
        } );

        console.log( 'getState sportify', getState().spotify );


    } catch ( error ) {
        console.log( 'ERROR GENRESLIST ACCION', error );
        localStorage.removeItem( 'token' );
    }
};


export const seleccionarGenreAccion = ( value ) => async ( dispatch, getState ) => {

    dispatch( {
        type: GENRE_SELECTED,
        payload: value
    } );


};


// PLAYLIST
export const obtenerPlaylistAccion = () => async ( dispatch, getState ) => {

    const token = JSON.parse( localStorage.getItem( 'token' ) );
    // console.log( { token } );

    console.log( 'getState playlistaction', getState().spotify.genreSelected );

    // se obtiene el genero seleccionado
    const { genreSelected } = getState().spotify;
    // console.log( genreSelected );

    try {

        const res = await axios( `https://api.spotify.com/v1/browse/categories/${ genreSelected }/playlists?limit=10`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        } );

        const { items } = res.data.playlists;

        dispatch( {
            type: GET_PLAYLIST,
            payload: items
        } );

        console.log( 'getState sportify', getState().spotify );


    } catch ( error ) {
        console.log( error );
    }
};

export const seleccionarPlaylistAccion = ( value ) => async ( dispatch, getState ) => {

    dispatch( {
        type: PLAYLIST_SELECTED,
        payload: value
    } );


};


// TRACKS
export const obtenerTracksListAccion = () => async ( dispatch, getState ) => {

    const token = JSON.parse( localStorage.getItem( 'token' ) );
    // console.log( { token } );

    console.log( 'getState trakcsli', getState().spotify.genreSelected );

    // se obtiene el genero seleccionado
    const { playlistSelected } = getState().spotify;
    // console.log( genreSelected );

    try {

        const res = await axios( `https://api.spotify.com/v1/playlists/${ playlistSelected }/tracks?limit=10`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        } );

        console.log( res.data.items );

        const { items } = res.data;

        dispatch( {
            type: GET_TRACKS_LIST,
            payload: items
        } );

        console.log( 'getState sportify', getState().spotify );


    } catch ( error ) {
        console.log( error );
    }
};


