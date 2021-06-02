import axios from 'axios';
// importacion de credenciales de los key de spotify
import { Credenciales } from '../config/credenciales';
import { startLoading, finishLoading } from './uiDucks';

//initialState
const dataInicial = {
    token: null,
    user: null,
    // token: JSON.parse( localStorage.getItem( 'token' ) ) || null,

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
const GET_FAVORITE_LIST = 'GET_FAVORITE_LIST';
const ADD_FAVORITE = 'ADD_FAVORITE';
const GET_TOKEN = 'GET_TOKEN';
const GET_USER = 'GET_USER';
const DELETE_TRACK_FAVORTES = 'DELETE_TRACK_FAVORTES';
const LOGOUT = 'LOGOUT';


// reducers
export default function spotifyReducer ( state = dataInicial, action ) {
    // console.log( { action } );
    switch ( action.type ) {

        case GET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload
            };
        case GET_GENRE_LIST:
            return {
                ...state,
                genresList: action.payload,
                tracksList: [],
            };
        case GENRE_SELECTED:
            return {
                ...state,
                genreSelected: action.payload,
                tracksList: []
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
        case GET_FAVORITE_LIST:
            return {
                ...state,
                favoritesList: action.payload
            };
        case ADD_FAVORITE:

            return {
                ...state,
                favoritesList: [
                    ...state.favoritesList,
                    ...action.payload
                ]
            };
        case DELETE_TRACK_FAVORTES:
            return {
                ...state,
                favoritesList: state.favoritesList.filter( favorite => favorite.track.id !== action.payload )

                // state.notes.filter( note => note.id !== action.payload )
            };
        case LOGOUT:
            localStorage.removeItem( 'token' );
            return {
                ...dataInicial,

            };
        default:
            return {
                ...state
            };
    }

}


// actions
//AUTH
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

export const authLoginAPIAccion = ( token ) => async ( dispatch, getState ) => {

    console.log( 'validacion token', token );

    // const tokenStorage = JSON.parse( localStorage.getItem( 'token' ) );

    if ( token ) {

        dispatch( {
            type: GET_TOKEN,
            payload: token
        } );

        localStorage.setItem( 'token', JSON.stringify( token ) );

    } else {

        localStorage.setItem( 'token', JSON.stringify( token ) );
    }

};


export const obtenerUsuarioAccion = () => async ( dispatch, getState ) => {

    const token = JSON.parse( localStorage.getItem( 'token' ) );

    // const tokenStorage = JSON.parse( localStorage.getItem( 'token' ) );

    console.log( 'getState playlistaction', getState().spotify.genreSelected );

    // se obtiene el genero seleccionado
    // const { genreSelected } = getState().spotify;
    // console.log( genreSelected );

    try {

        const res = await axios( `https://api.spotify.com/v1/me`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        } );

        console.log( { usuario: res.data } );

        const { data } = res;

        dispatch( {
            type: GET_USER,
            payload: data
        } );

        console.log( 'getState sportify', getState().spotify );


    } catch ( error ) {
        console.log( error );
    }


};



// GENRES
export const obtenerGenresListAccion = () => async ( dispatch, getState ) => {

    console.log( 'inicio el genres accion' );
    dispatch( startLoading() );

    // const token = JSON.parse( localStorage.getItem( 'token' ) );
    console.log( 'getState genres accion', getState().spotify.token );

    const token = ( getState().spotify.token );
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

        dispatch( finishLoading() );


    } catch ( error ) {
        console.log( 'ERROR GENRESLIST ACCION', error );
        dispatch( {
            type: LOGOUT,

        } );
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

// FAVORITOS
export const agregarTrackFavoritoAccion = ( favorito ) => async ( dispatch, getState ) => {

    const token = JSON.parse( localStorage.getItem( 'token' ) );
    // console.log( { token } );

    // se obtiene el genero seleccionado
    const { tracksList } = getState().spotify;
    // console.log( genreSelected );

    // se busca el elemento que se le va a pasar al payload
    const filtrado = tracksList.filter( ( { track } ) => track.id === favorito );


    //primero se valida si existe en el listado de favortos sino le pasamos el nuevo track

    try {

        const res = await axios( `https://api.spotify.com/v1/me/tracks?ids=${ favorito }`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        } );

        console.log( "agrega favorito: ", res );

        // const { items } = res.data;

        dispatch( {
            type: ADD_FAVORITE,
            payload: filtrado
        } );


        // filtrarlo y pasarselo al payload
        console.log( 'getState sportify', getState().spotify );


    } catch ( error ) {

        console.log( error );
    }
};

export const eliminaTrackFavoritoAccion = ( favorito ) => async ( dispatch, getState ) => {

    const token = JSON.parse( localStorage.getItem( 'token' ) );
    // console.log( { token } );

    // se obtiene el genero seleccionado

    try {

        const res = await axios( `https://api.spotify.com/v1/me/tracks?ids=${ favorito }`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        } );

        console.log( "elimina favorito: ", res );

        // const { items } = res.data;

        dispatch( {
            type: DELETE_TRACK_FAVORTES,
            payload: favorito
        } );

        // console.log( 'getState sportify', getState().spotify );


    } catch ( error ) {

        console.log( error );
    }
};

export const obtenerTracksFavoritosAccion = () => async ( dispatch, getState ) => {

    const token = JSON.parse( localStorage.getItem( 'token' ) );
    // console.log( { token } );

    console.log( 'getState trakcsli', getState().spotify.genreSelected );

    // se obtiene el genero seleccionado
    // const { playlistSelected } = getState().spotify;
    // console.log( genreSelected );

    try {

        const res = await axios( `https://api.spotify.com/v1/me/tracks?offset=0&limit=20`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        } );

        console.log( res.data.items );

        const { items } = res.data;

        dispatch( {
            type: GET_FAVORITE_LIST,
            payload: items
        } );

        console.log( 'getState sportify', getState().spotify );


    } catch ( error ) {
        console.log( error );
    }
};


export const logoutAccion = () => ( dispatch, getState ) => {



    dispatch( {
        type: LOGOUT
    } );

};