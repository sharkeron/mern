import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {Loader} from '../components/Loader';
import {LinkList} from './LinkList';

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const getLinks = useCallback(async () => {
        try {
            const data = await request(`/api/link`, 'GET', null, {Authorization: `Bearer ${token}`});

            setLinks(data);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        getLinks().then(() => null);
    }, [getLinks]);

    if (loading) {
        return <Loader/>;
    }

    return (
            <>
                {!loading && <LinkList links={links}/>}
            </>
    );
};
