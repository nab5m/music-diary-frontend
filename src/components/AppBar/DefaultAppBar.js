import React from 'react';
import styled from 'styled-components';

const DefaultAppBar = () => {
    return (
        <Container>
            <AppTitle>
                <AppTitleBossyPink>노래</AppTitleBossyPink>
                <AppTitleBlueberryPancake> 일기</AppTitleBlueberryPancake>
            </AppTitle>
            <Navigation>
                <Icon src="/icons/home.svg" alt="홈_아이콘" isActive/>
                <Icon src="/icons/list_alt.svg" alt="목록_아이콘"/>
                <Icon src="/icons/calendar_today.svg" alt="달력_아이콘"/>
                <Icon src="/icons/people_outline.svg" alt="친구_아이콘"/>
                <Icon src="/icons/settings.svg" alt="설정_아이콘"/>
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

const Icon = styled.img`
    flex: 1;
    width: 26px;
    height: 26px;
    filter: invert(83%) sepia(4%) saturate(224%) hue-rotate(163deg) brightness(98%) contrast(89%);  
    
    
    ${props => props.isActive && `
        filter: invert(16%) sepia(51%) saturate(5674%) hue-rotate(323deg) brightness(88%) contrast(86%);    
        /*filter: invert(18%) sepia(32%) saturate(7102%) hue-rotate(319deg) brightness(91%) contrast(90%);   */
    `}
`;

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
