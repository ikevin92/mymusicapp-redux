
// react router
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Navbar from '../organisms/Navbar';
import Favorites from '../pages/Favorites';
import Home from '../pages/Home';


const AppRouter = () => {
    return (
        <Router>

            {/* Barra del Nav */ }

            <Navbar />

            <div className="container mt-4">

                <Switch>

                    <Route exact path="/" component={ Home } />
                    <Route exact path="/favorites" component={ Favorites } />

                </Switch>

            </div>

        </Router>
    )
}

export default AppRouter
