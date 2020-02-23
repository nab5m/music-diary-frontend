import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "mobx-react";
import PlayListsStore from "./stores/playListsStore";
import UserProfileStore from "./stores/UserProfileStore";

const playLists = new PlayListsStore();
const userProfile = new UserProfileStore();

ReactDOM.render(
    <Provider playLists={playLists} userProfile={userProfile} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
