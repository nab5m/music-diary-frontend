import React, {useEffect} from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import axios from "axios";
import {SERVER_URL_PREFIX, STATIC_URL} from "../secrets/Constants";

axios.defaults.withCredentials = true;

function onLoginSuccess (data, history) {
    if(data.status === "Error") {
        // 에러 처리(Access Code 못 얻음)
    }
    // redirect to home
    const timer = setTimeout(() => {
        history.push('/home');
    }, 2000);
    return () => clearTimeout(timer);
}

function Splash ({history, location}) {
    const query = queryString.parse(location.search);

    useEffect(() => {
        if(query.code) {
            const Url = SERVER_URL_PREFIX + 'oauth/';
            const code = query.code;
            axios.get(Url, {params: {code: code}})
                .then((response) => {
                    const data = response.data;
                    console.log(response.data);
                    return onLoginSuccess(data, history);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            // redirect to login
            const timer = setTimeout(() => {
                history.push('/login');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [history, query]);

    return (
        <SplashContainer>
            <SplashImage src={`${STATIC_URL}/splash2.gif`} alt="스플래시_로고"/>
            <Copyright>
                &copy; 2019 nab5m, All rights reserved.
            </Copyright>
        </SplashContainer>
    );
}

const SplashContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #f7fbfe;
    font-family: 'Nanum Gothic', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const SplashImage = styled.img`
    width: 100%;
    max-width: 425px;
    height: auto;
`;

const Copyright = styled.div`
    position: absolute;
    bottom: 2em;
    font-size: 14px;
    color: #214368;
    /* 
        #214368 blueberry pancake
        #b51f5c Bossy Pink
        #f7fbfe white powder
    */
`;

export default Splash;
