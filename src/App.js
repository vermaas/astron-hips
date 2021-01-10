
import './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import NavigationBar from './components/NavigationBar';
import HipsPage from './components/HipsPage';

export default function App () {
    return (
        <Router basename="astron-hips">
        <div>
            <NavigationBar/>

            <Switch>
                <Route exact path="/">
                    <HipsPage/>
                </Route>
            </Switch>
        </div>
            <footer><small> (C) 2021 - ASTRON - version 1.0.0 - 10 jan 2021 15:30</small></footer>
        </Router>

    );
}
