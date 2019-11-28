import React from 'react';
import styled from 'styled-components';

const DefaultAppBar = ({url}) => {
    return (
        <Container>
            <AppTitle>
                <AppTitleBossyPink>노래</AppTitleBossyPink>
                <AppTitleBlueberryPancake> 일기</AppTitleBlueberryPancake>
            </AppTitle>
            <Navigation>
                <IconButton href="/home">
                    <Icon src="/icons/HomeIcon2.svg" alt="홈_아이콘" color="pink" isActive={url === "/home"}/>
                </IconButton>
                <IconButton href="/play-list-manager">
                    <Icon src="/icons/PlayList4.svg" alt="목록_아이콘" color="blue" isActive={url === "/play-list-manager"}/>
                </IconButton>
                <IconButton href="/calendar">
                    <Icon src="/icons/calendar_today.svg" alt="달력_아이콘" color="pink" isActive={url === "/calendar"}/>
                </IconButton>
                <IconButton href="/friends">
                    <Icon src="/icons/FriendsIcon.svg" alt="친구_아이콘" color="blue" isActive={url === "/friends"}/>
                </IconButton>
                <IconButton href="/settings">
                    <Icon src="/icons/settings.svg" alt="설정_아이콘" color="pink" isActive={url === "/settings"}/>
                </IconButton>
            </Navigation>
        </Container>
    );
};

const Container = styled.div`
`;

const Navigation = styled.div`
    width: 97vw;
    margin: 0 auto;
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid #c4c8cb;
`;

const IconButton = styled.a`
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
    padding-bottom: 12px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
`;
const AppTitleBossyPink = styled.span`
    color: #b51f5c;
`;
const AppTitleBlueberryPancake = styled.span`
    color: #214368;
`;

export default DefaultAppBar;
