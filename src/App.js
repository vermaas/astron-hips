import logo from './logo.svg';
import './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";

import NavigationBar from './components/NavigationBar';
import HipsPage from './components/HipsPage';

export default function App () {
    return (
        <Router basename="astroview">
        <div>
            <NavigationBar/>

            <Switch>
                <Route exact path="/">
                    <HipsPage/>
                </Route>
            </Switch>
        </div>
            <footer><small> (C) 2020 - ASTRON - version 1.0.0 - 9 jan 2021 20:00</small></footer>
        </Router>

    );
}
