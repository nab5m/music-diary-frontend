import React, {useEffect} from 'react';
import {getServerUrl} from "../secrets/Constants";
import axios from "axios";

const Login = () => {
    useEffect(() => {
         const Url = getServerUrl() + 'request-login-url';
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
