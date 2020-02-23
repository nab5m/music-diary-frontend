import React, {useEffect} from 'react';
import {SERVER_URL_PREFIX} from "../secrets/Constants";
import axios from "axios";

const Login = () => {
    useEffect(() => {
         const Url = SERVER_URL_PREFIX + 'request-login-url';
         axios.get(Url)
             .then((response) => {
                 const data = response.data;
                 window.location = data['login_request_uri'];
             })
             .catch((error) => {
                 alert('error');
                 console.log(error);
             });
    });

    return (
        <div>
            <h1>로딩중...</h1>
        </div>
    );
};

export default Login;
