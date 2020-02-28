import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const StyledSong = styled.div`
    position: relative;
    padding: 10px;
`;

const SongProfileImage = styled.img`
    border-radius: 40px;
    width: 40px;
    height: 40px;
    float: left;
    margin-right: 10px;
`;

const SongTitle = styled.div`
    box-sizing: border-box;
    height: 20px;
    width: calc(100% - 50px);
    
    display: flex;
    align-items: flex-end;
    white-space: nowrap;
    overflow: hidden;
`;

const SongArtist = styled.div`
    box-sizing: border-box;
    height: 20px;
    width: calc(100% - 50px);
    
    font-size: 0.9em;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    color: #b5b8bb;
`;

const FloatingIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 14px;
    left: 15px;

    font-size: 18px;
`;

export {StyledSong};
export {SongProfileImage};
export {SongTitle};
export {SongArtist};

export {FloatingIcon};
