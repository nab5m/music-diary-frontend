import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Diary = () => {
    return (
        <Container>
            <Date>2019년 11월 26일</Date>

            <Weather>
                <img src="/icons/sunny.gif" alt="날씨" width="45" height="45"/>
            </Weather>

            <Gallery>
                <GalleryIcon icon={faChevronLeft} />
                <GalleryImage src="/Gallery3.jpg" width="230" height="150" alt="랜덤사진" />
                <GalleryIcon icon={faChevronRight} />
            </Gallery>

            <Paragraph>&nbsp;&nbsp;오늘은 코인 노래방에 가서 <Data>11분 38초</Data> 동안 <Data>3곡</Data>을 불렀다. <Data>발라드 1곡, 인디 1곡, 팝송 1곡</Data>을 부르고 당당하게 바깥 세상을 향해 걸어나왔다.</Paragraph>
            <Paragraph>&nbsp;&nbsp;<Data>잘 부르고 싶은 노래</Data> 중에서 마크툽의 "오늘도 빛나는 너에게"를 부르고 <Data>OO이에게 불러 주고 싶은 노래</Data> 중에서 10cm의 "폰서트"를 연습했다. 하루 빨리 OO이에게 들려줘서 나의 목소리에 반해버리게 해야겠다.</Paragraph>
            <Paragraph>&nbsp;&nbsp;오늘도 노래방을 다녀왔으니 발 뻗고 잠 잘 수 있겠다. 날이 좋아서, 날이 좋지 않아서 노래방과 함께한 모든 날이 좋았다. ㅎ_ㅎ</Paragraph>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    height: calc(100vh - 140px);
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0 10px;
    font-size: 18px;
    //font-family: 'Nanum Pen Script', cursive;
    //font-family: 'Hi Melody', cursive;
    //font-family: 'Gaegu', cursive;
    font-family: 'Gamja Flower', cursive;
`;

const Date = styled.p`
    font-size: 1.2em;
    padding: 10px 5px;
`;

const Weather = styled.div`
    position: absolute;
    right: 5px;
    top: 5px;
`;

const Gallery = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GalleryIcon = styled(FontAwesomeIcon)`
    color: #c4c8cb;
    font-size: 18px;
    padding: 5px 10px;
`;

const GalleryImage = styled.img`
    display: inline-block;
`;

const Paragraph = styled.p`
    padding: 10px 5px;
`;

const Data = styled.span`
    color: #214368;
    color: #b51f5c;
`;

export default Diary;
