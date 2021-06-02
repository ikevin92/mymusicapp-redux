
import Card from '../molecules/Card';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ListCards = () => {

    //data del state
    const { tracksList, favoritesList } = useSelector( state => state.spotify );

    const [ tracksArray, setTracksArray ] = useState( [] );

    const history = useHistory();



    // valida en que ruta se encuentra y se le asigna el valor del array
    // const tracksArray = history.location === "/" ? tracksList : favoritesList;

    const handleOnClick = ( e ) => {
        e.preventDefault();
        console.log( 'Listbox' );
        // props.clicked( e.target.id );
    };

    useEffect( () => {

        if ( history.location.pathname === "/" ) {
            setTracksArray( tracksList );
        } else {
            setTracksArray( favoritesList );
        }
        console.log( "history", history.location.pathname );



    }, [ favoritesList, history.location.pathname, tracksList ] );



    return (
        // <div className="mt-5 row row-cols-1 row-cols-sm-2 row-cols-md-3 g-6 container">
        <div>
            {/* <div class="row row-cols-1 row-cols-md-3 g-4"> */ }
            <div className="card-group mt-2 container align-items-center animate__animated animate__fadeInDown animate__delay-1s">

                {
                    tracksArray.map( ( item, idx ) =>
                        <Card
                            key={ idx }
                            id={ item.track.id }
                            values={ item.track }
                            favorite={ favoritesList.find( ( { track } ) => track.id === item.track.id ) }
                            onClick={ () => handleOnClick( item.track.id ) }
                        />

                    )
                }

            </div>
        </div>
    );
};

export default ListCards;
