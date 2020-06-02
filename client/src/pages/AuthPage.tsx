import React, {useState} from 'react';
import {useHttp} from '../hooks/http.hook';

interface authPageInterface {
    email: string;
    password: string;
    remember: boolean;
}

export const AuthPage = () => {
    const {loading, request, error} = useHttp();
    const [form, setForm] = useState<authPageInterface>({
        email: '',
        password: '',
        remember: false,
    });

    const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setForm({...form, [event.currentTarget.name]: event.currentTarget.value});
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/sign_up', 'POST', {...form});

            console.log(data);
        } catch (e) {

        }
    };

    return (
            <div className="row">
                <div className="col s6 offset-s3">
                    <h1>Links shortener</h1>

                    <div className="card blue-grey">
                        <div className="card-content white-text">
                            <div className="card-title">
                                Login page
                            </div>

                            <div className="input-field">
                                <input type="text"
                                       placeholder="Email"
                                       className="yellow-input"
                                       id="email"
                                       name="email"
                                       onChange={changeHandler}/>

                                <label htmlFor="email"
                                       className="active">
                                    Email
                                </label>
                            </div>

                            <div className="input-field">
                                <input type="password"
                                       placeholder="Password"
                                       className="yellow-input"
                                       id="password"
                                       name="password"
                                       onChange={changeHandler}/>

                                <label htmlFor="email"
                                       className="active">
                                    Password
                                </label>
                            </div>

                            <label>
                                <input type="checkbox"
                                       className="filled-in"
                                       name="remember"
                                       onChange={changeHandler}/>

                                <span className="white-text">
                                    Remember me
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="card-action">
                        <button className="btn yellow darken-4 mr-1"
                                type="button"
                                disabled={loading}>
                            Sign in
                        </button>

                        <button className="btn grey lighten-1 black-text"
                                type="button"
                                onClick={registerHandler}
                                disabled={loading}>
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
    );
};
