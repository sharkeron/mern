import {Redirect, Route, Switch} from 'react-router-dom';
import {LinksPage} from './pages/LinksPage';
import React from 'react';
import {CreatePage} from './pages/CreatePage';
import {DetailPage} from './pages/DetailPage';
import {AuthPage} from './pages/AuthPage';

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
                <Switch>
                    <Route path="/links" exact>
                        <LinksPage/>
                    </Route>

                    <Route path="/create" exact>
                        <CreatePage/>
                    </Route>

                    <Route path="/detail/:id" exact>
                        <DetailPage/>
                    </Route>

                    <Redirect to="/create" exact/>
                </Switch>
        );
    }

    return (
            <Switch>
                <Route path="/" exact>
                    <AuthPage/>
                </Route>
                <Redirect to="/" exact/>
            </Switch>
    );
};
