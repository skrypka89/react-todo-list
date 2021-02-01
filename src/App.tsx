import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SecondPage from './components/SecondPage';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/second-page" component={SecondPage} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
