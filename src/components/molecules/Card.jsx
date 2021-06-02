import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { agregarTrackFavoritoAccion} from '../../redux/spotifyDucks';

const Card = ( props ) => {

    console.log( "card porps", props.values );
    console.log( "card favorite", props.favorite );
    const { album, artists, name, id } = props.values;
    const dispatch = useDispatch();

    const [ likeStatus, setLikeStatus ] = useState( false );


    const handleLike = () => {

        //dispacht para agregar al state favoritos
        dispatch( agregarTrackFavoritoAccion( id ) );

        setLikeStatus( !likeStatus );

        console.log( { id } );

    };

    return (
        <div>

            <div className="card m-4" style={ { maxWidth: 540 } }>

                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="rounded d-block w-100 " width="100%" height="100%" src={ album.images[ 0 ].url } alt="img" />

                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{ name }</h5>
                            <p className="card-text">Artist: { artists[ 0 ].name } </p>



                            <span
                                type="button"
                                onClick={ handleLike }
                                className={ `badge rounded-pill ${ likeStatus || props.favorite !== undefined ? "bg-warning" : "bg-light" }` }
                            >
                                {
                                    likeStatus || props.favorite !== undefined ?

                                        <i className="fa fa-heart"></i>
                                        :
                                        <i className="far fa-heart"></i>
                                }
                                Like
                            </span>

                        </div>
                    </div>
                </div>
            </div>

        </div >


    );
};

export default Card;
