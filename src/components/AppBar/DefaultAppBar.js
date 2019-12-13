import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const DefaultAppBar = ({url}) => {
    return (
        <Container>
            <Wrapper>
                <AppTitle>
                    <AppTitleBossyPink>노래</AppTitleBossyPink>
                    <AppTitleBlueberryPancake> 일기</AppTitleBlueberryPancake>
                </AppTitle>
                <Navigation>
                    <IconButton to="/home">
                        <Icon src="/icons/HomeIcon2.svg" alt="홈_아이콘" color="pink" isActive={url === "/home"}/>
                    </IconButton>
                    <IconButton to="/play-list-manager">
                        <Icon src="/icons/PlayList4.svg" alt="목록_아이콘" color="blue" isActive={url === "/play-list-manager"}/>
                    </IconButton>
                    <IconButton to="/calendar">
                        <Icon src="/icons/calendar_today.svg" alt="달력_아이콘" color="pink" isActive={url === "/calendar"}/>
                    </IconButton>
                    <IconButton to="/friends">
                        <Icon src="/icons/FriendsIcon.svg" alt="친구_아이콘" color="blue" isActive={url === "/friends"}/>
                    </IconButton>
                    <IconButton to="/settings">
                        <Icon src="/icons/settings.svg" alt="설정_아이콘" color="pink" isActive={url === "/settings"}/>
                    </IconButton>
                </Navigation>
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`
    height: 93px;
`;
const Wrapper = styled.div`
    position: fixed;
    width: 100vw;
    background-color: white;
    z-index: 1000;
`;

const Navigation = styled.div`
    width: 97vw;
    margin: 0 auto;
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid #c4c8cb;
`;

const IconButton = styled(Link)`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledIcon = styled.img`
    width: 26px;
    height: 26px;
`;

const Icon = ({src, color, isActive}) => {
    if(!isActive) {
        color = "invert(83%) sepia(4%) saturate(224%) hue-rotate(163deg) brightness(98%) contrast(89%)";
    }
    else if(color === "blue") {
        color = "invert(21%) sepia(7%) saturate(7068%) hue-rotate(176deg) brightness(93%) contrast(85%)";
    }
    else if(color === "pink") {
        color = "invert(24%) sepia(76%) saturate(2174%) hue-rotate(312deg) brightness(78%) contrast(100%)";
    }

    return (
        <StyledIcon src={src} style={{filter: color}} color={color} />
    );
};

const AppTitle = styled.h1`
    padding-top: 8px;
    padding-bottom: 18px;
    text-align: center;
    font-weight: bold;
    font-size: 24px;
`;
const AppTitleBossyPink = styled.span`
    color: #b51f5c;
`;
const AppTitleBlueberryPancake = styled.span`
    color: #214368;
`;

export default DefaultAppBar;
