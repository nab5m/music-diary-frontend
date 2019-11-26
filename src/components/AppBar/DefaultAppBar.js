import React from 'react';
import styled from 'styled-components';

const DefaultAppBar = () => {
    return (
        <div>
            <AppTitle>노래 일기</AppTitle>
        </div>
    );
};

const AppTitle = styled.h1`
    padding: 15px 0;
    text-align: center;
    font-weight: normal;
    font-size: 18px;
    color: #b51f5c;
`;

export default DefaultAppBar;
