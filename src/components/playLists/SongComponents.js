import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Song = styled.div`
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
    height: 20px;
    display: flex;
    align-items: flex-end;
`;

const SongArtist = styled.div`
    height: 20px;
    font-size: 0.9em;
    display: flex;
    color: #b5b8bb;
`;

const FloatingIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 14px;
    left: 15px;

    font-size: 18px;
`;

export {Song};
export {SongProfileImage};
export {SongTitle};
export {SongArtist};

export {FloatingIcon};
