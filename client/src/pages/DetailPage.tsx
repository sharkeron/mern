import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {Loader} from '../components/Loader';
import {LinkCard} from '../components/LinkCard';
import {LinkInterface} from '../models/interfaces';

export const DetailPage = () => {
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [link, setLink] = useState<LinkInterface>();
    const linkId = useParams<{ id: string }>().id;

    const getLink = useCallback(async () => {
        try {
            const link = await request(
                    `/api/link/${linkId}`,
                    'GET',
                    null,
                    {
                        Authorization: `Bearer ${token}`,
                    });

            setLink(link);
        } catch (e) {

        }
    }, [token, linkId, request]);

    useEffect(() => {
        getLink().then(() => null);
    }, [getLink]);

    if (loading) {
        return <Loader/>;
    }

    return (
            <>
                {!loading && link && <LinkCard link={link}/>}
            </>
    );
};
