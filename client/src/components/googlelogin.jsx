import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import instance from '../hooks/API.js';
import { GoogleLogin } from 'react-google-login';

export const GoogleLogin = () => {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: '746216880379-9f7vvvn24hm7ps9qsrb9ubv6er6r52cm.apps.googleusercontent.com',
                scope: 'profile email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const onSuccess = async (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;

        // Send the token to the server
        try {
            const response = await instance.post('auth/api/auth/google', { token: id_token }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            const data = response.data;
            console.log(data); // Handle response from your server
        } catch (error) {
            console.error('Error:', error);
        }
    };
        const onFailure = (error) => {
            console.log(error);
        };

        const renderGoogleButton = () => {
            gapi.signin2.render('google-signin-button', {
                scope: 'profile email',
                width: 240,
                height: 50,
                longtitle: true,
                theme: 'dark',
                onsuccess: onSuccess,
                onfailure: onFailure,
                ux_mode: 'popup'
            });
        };
        useEffect(() => {
            renderGoogleButton();
        }, []);
        return <div>           
            <div id="google-signin-button"></div>
        </div>;
    };



