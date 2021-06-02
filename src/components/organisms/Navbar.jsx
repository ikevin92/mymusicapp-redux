import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAccion } from '../../redux/spotifyDucks';


const Navbar = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch( logoutAccion() );
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">MyMusicApp</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/favorites">Favorites</Link>
                        </li>

                    </ul>

                    <div className="d-flex">
                        {/* <button className="btn btn-secondary my-2 ml-2 my-sm-0">Login</button> */ }
                        <button type="button" onClick={ handleLogout } className="btn btn-secondary my-2  ml-2 my-sm-0" >Logout</button>
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
