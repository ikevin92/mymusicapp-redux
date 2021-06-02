// import logo from './logo.svg';
import { useEffect, useState } from "react";


// components
import Home from './components/pages/Home';
import Navbar from './components/organisms/Navbar';
import LoginApi from './components/pages/LoginApi';
import { getTokenFromUrl } from './config/spotify';
import { authLoginAPIAccion } from './redux/spotifyDucks';
import { useSelector, useDispatch } from 'react-redux';
import AppRouter from './components/routes/AppRouter';

function App () {

    // const [ token, setToken ] = useState();

    const dispatch = useDispatch();

    const { token } = useSelector( state => state.spotify );


    useEffect( () => {


        // valida si existe el token
        const tokenLocal = JSON.parse( localStorage.getItem( 'token' ) );

        console.log( { tokenLocal } );

        if ( !tokenLocal ) {

            console.log( 'no existe token en el storage' );
            // captura el has que viene cuando se autentica
            const hash = getTokenFromUrl();
            window.location.hash = "";

            console.log( 'has' );


            const _token = hash.access_token;
            if ( _token ) {
                console.log( 'existe el token para el login' );
                // setToken( _token );

                //dispacht en el state
                dispatch( authLoginAPIAccion( _token ) );
            }


            // localStorage.setItem( 'token', JSON.stringify( _token ) );

        } else {

            // setToken( tokenLocal );
            dispatch( authLoginAPIAccion( tokenLocal ) );

        }
        console.log( "token", token );
    }, [] );


    return (
        <>
            {
                token ?
                    <>
                        {/* <Navbar />
                        <div className="container mt-4">
                            <Home />
                        </div> */}
                        <AppRouter/>
                    </>
                    :
                    <LoginApi />
            }
        </>
    );
}

export default App;
