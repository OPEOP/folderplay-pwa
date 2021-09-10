import React from 'react';
import ReactDOM from 'react-dom';
import IndexedDBProvider from 'use-indexeddb';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const idbConfig = {
    databaseName: "files-player-db",
    version: 1,
    stores: [
        {
            name: "files",
            id: { keyPath: "id" },
            indices: [
                { name: "tracks", keyPath: "tracks" },
            ],
        }
    ]
};

ReactDOM.render(
    <React.StrictMode>
        <IndexedDBProvider config={idbConfig}>
            <App />
        </IndexedDBProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorkerRegistration.register();

reportWebVitals();
