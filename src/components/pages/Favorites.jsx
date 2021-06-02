import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { obtenerTracksFavoritosAccion } from '../../redux/spotifyDucks';
import ListCards from '../organisms/ListCards';


const Favorites = () => {


    const dispatch = useDispatch();

    useEffect( () => {
        const fecthData = () => {
            dispatch( obtenerTracksFavoritosAccion() );
        };
        fecthData();

    }, [ dispatch ] );

    return (
        <div>
            
            <h2>Favorites</h2>
            {/* TRACKS */ }
            <ListCards
            // clicked={ listboxClicked }
            />
        </div>
    );
};

export default Favorites;
