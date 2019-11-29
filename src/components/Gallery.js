import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Gallery = () => {
    const [curImageNo, setCurImageNo] = useState(1);
    const imageNum = 3;

    const handleClick = (direction) => {
        if (direction === "left") {
            if(curImageNo === 1) { return; }
            setCurImageNo(curImageNo-1);
        }
        else if (direction === "right") {
            if(curImageNo === imageNum) { return; }
            setCurImageNo(curImageNo+1);
        }
    };

    return (
        <Container>
            <GalleryIcon icon={faChevronLeft} onClick={() => { handleClick("left") }} />
            <GalleryImage src={`/Gallery${curImageNo}.jpg`} width="230" height="150" alt="랜덤사진" />
            <GalleryIcon icon={faChevronRight} onClick={() => { handleClick("right") }} />
        </Container>
    );
};

const Container = styled.div`
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

export default Gallery;
