import React, {useEffect} from 'react';
import styled from 'styled-components';

function Splash ({history}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            history.push('/home');
        }, 2000);
        return () => clearTimeout(timer);
    }, [history]);

    return (
        <SplashContainer>
            <SplashImage src="/splash2.gif" alt="스플래시_로고"/>
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
