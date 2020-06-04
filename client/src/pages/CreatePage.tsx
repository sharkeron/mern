import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {useHistory} from 'react-router-dom';

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [link, setLink] = useState('');

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setLink(e.currentTarget.value);
    };

    const pressHandler = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            try {
                const data = await request(
                        '/api/link/generate',
                        'POST',
                        {from: link},
                        {
                            Authorization: `Bearer ${auth.token}`,
                        },
                );
                history.push(`/detail/${data.link._id}`);
            } catch (e) {

            }
        }
    };

    return (
            <div className="row">
                <div className="col s8 offset-s2 pt-3">
                    <div className="input-field">
                        <input type="text"
                               placeholder="Enter link"
                               id="link"
                               name="link"
                               value={link}
                               onChange={onChangeHandler}
                               onKeyPress={pressHandler}/>

                        <label htmlFor="link">
                            Link
                        </label>
                    </div>
                </div>
            </div>
    );
};
