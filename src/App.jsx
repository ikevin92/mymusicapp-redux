// import logo from './logo.svg';
import Home from './components/pages/Home';
import Navbar from './components/organisms/Navbar';

function App () {
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                {/* <h1>My Music App</h1> */ }
                <Home />
            </div>
        </>
    );
}

export default App;
