import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SecondPage from './pages/SecondPage';
import Details from './pages/Details';

const App = class extends React.Component {
    render() {
        return (
            <div className="app">
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/second-page" component={SecondPage} />
                        <Route path="/second-page/:passengerId" component={Details} />
                    </Switch>
                </Router>
            </div>
        );
    }
};

export default App;
