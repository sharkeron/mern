import React from 'react';
import {LinkInterface} from '../models/interfaces';
import {Link} from 'react-router-dom';

export const LinkList = ({links}: { links: LinkInterface[] }) => {
    if (!links.length) {
        return <p className="center">
            Link list is empty
        </p>;
    }
    return (
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Origin</th>
                    <th>Short</th>
                    <th>Open</th>
                </tr>
                </thead>

                <tbody>
                {links.map((link, index) => (
                        <tr key={link._id}>
                            <td>{index + 1}</td>

                            <td>{link.from}</td>

                            <td>{link.to}</td>

                            <td><Link to={`/detail/${link._id}`}>Open</Link></td>
                        </tr>
                ))}
                </tbody>
            </table>
    );
};
