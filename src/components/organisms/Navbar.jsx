

const Navbar = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">

                <a className="navbar-brand" href="!#">MyMusicApp</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="!#">Home
                               
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="!#">Favorites</a>
                        </li>
 
                    </ul>
                    
                    <form className="d-flex">
                        <button className="btn btn-secondary my-2 ml-2 my-sm-0">Login</button>
                        <button className="btn btn-secondary my-2  ml-2 my-sm-0" >Logout</button>
                    </form>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
