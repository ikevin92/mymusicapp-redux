
import Card from '../molecules/Card';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ListCards = () => {

    //data del state
    const { tracksList, favoritesList } = useSelector( state => state.spotify );

    const history = useHistory();

    console.log( "history", history.location );

    // valida en que ruta se encuentra y se le asigna el valor del array
    const tracksArray = history.location === "/" ? tracksList : favoritesList;

    const handleOnClick = ( e ) => {
        e.preventDefault();
        console.log( 'Listbox' );
        // props.clicked( e.target.id );
    };

    return (
        // <div className="mt-5 row row-cols-1 row-cols-sm-2 row-cols-md-3 g-6 container">
        <div>
            {/* <div class="row row-cols-1 row-cols-md-3 g-4"> */ }
            <div className="card-group mt-2 container align-items-center">

                {
                    tracksArray.map( ( item, idx ) =>
                        <Card
                            key={ idx }
                            id={ item.track.id }
                            values={ item.track }
                            onClick={ () => handleOnClick( item.track.id ) }
                        />

                    )
                }

            </div>
        </div>
    );
};

export default ListCards;
