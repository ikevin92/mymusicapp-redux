// import logo from './logo.svg';
import { useEffect, useState } from "react";


// components
import Home from './components/pages/Home';
import Navbar from './components/organisms/Navbar';
import LoginApi from './components/pages/LoginApi';
import { getTokenFromUrl } from './config/spotify';

function App () {

    const [ token, setToken ] = useState();


    useEffect( () => {


        // valida si existe el token
        const tokenLocal = JSON.parse( localStorage.getItem( 'token' ) );

        console.log( { tokenLocal } );

        if ( !tokenLocal ) {
            // captura el has que viene cuando se autentica
            const hash = getTokenFromUrl();
            window.location.hash = "";
            const _token = hash.access_token;

            if ( _token ) {
                console.log( 'existe el token para el login' );
                setToken( _token );
            }
        } else {
            setToken( tokenLocal );
        }


        console.log( "token", token );
    }, [] );


    return (
        <>
            {
                token ?
                    <>
                        <Navbar />
                        <div className="container mt-4">
                            <Home />
                        </div>
                    </>
                    :
                    <LoginApi />
            }
        </>
    );
}

export default App;
