import React from 'react';
import logo from './logo.svg';

export default function reactDisplay() {
    return (
        <React.Fragment>
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>React JS</h1>
                </div>
            </div>
        </React.Fragment>
    );
}