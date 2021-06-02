import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { agregarTrackFavoritoAccion, eliminaTrackFavoritoAccion } from '../../redux/spotifyDucks';

const Card = ( props ) => {

    // console.log( "card porps", props.values );
    // console.log( "card favorite", props.favorite );
    const { album, artists, name, id } = props.values;
    const dispatch = useDispatch();

    const [ likeStatus, setLikeStatus ] = useState( false );


    const handleLike = () => {

        //dispacht para agregar al state favoritos
        if ( props.favorite === undefined ) {

            dispatch( agregarTrackFavoritoAccion( id ) );

            setLikeStatus( true );
        } else {

            dispatch( eliminaTrackFavoritoAccion( id ) );
            setLikeStatus( false );
        }



        console.log( { id } );

    };

    return (
        <div>

            <div className="card m-4  animate__animated animate__fadeInDown animate__delay-1s" style={ { maxWidth: 540 } }>

                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="rounded d-block w-100 "  src={ album.images[ 0 ].url } alt="img" />

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
