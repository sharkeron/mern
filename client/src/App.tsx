import React from 'react';
import {useRoutes} from './routes';
import {BrowserRouter} from 'react-router-dom';

function App() {
    const routes = useRoutes(false);

    return (
            <div className="container">
                <BrowserRouter>
                    {routes}
                </BrowserRouter>
            </div>
    );
}

export default App;
