import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { DefaultAppBar } from "../components/AppBar";

const PlayListManager = ({match}) => {
    return (
        <Container>
            <DefaultAppBar url={match.url} />

            노래 목록 관리

            <FloatingActionButton>
                <FloatingIcon icon={faPencilAlt} />
            </FloatingActionButton>

            <FloatingActionButton isActive>
                <FloatingIcon icon={faPlus} />
            </FloatingActionButton>
        </Container>
    );
};

const Container = styled.div`

`;

const FloatingIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 14px;
    left: 15px;
    
    font-size: 18px;
`;

const FloatingActionButton = styled.div`
    position: absolute;
    bottom: 0;
    margin: 10px;

    width: 45px;
    height: 45px;
    border-radius: 45px;
    color: #f7fbfe;
    background-color: #b51f5c;
    
    ${props => props.isActive && `
        background-color: #214368;
        right: 0;
    `}
`;

export default PlayListManager;
