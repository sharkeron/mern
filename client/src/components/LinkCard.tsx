import React from 'react';
import {LinkInterface} from '../models/interfaces';

export const LinkCard = ({link}: { link: LinkInterface }) => {
    return (
            <>
                <h2>
                    Link
                </h2>

                <p>Your link: <a href={link.to} target="_blank" rel="noopener norefferer">{link.to}</a></p>

                <p>From: <a href={link.from} target="_blank" rel="noopener norefferer">{link.from}</a></p>

                <p>Clicks counter: <strong>{link.clicks}</strong></p>

                <p>Created date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
            </>
    );
};
