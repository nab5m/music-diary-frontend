import React from 'react';
import classNames from 'classnames';
import {makeStyles, Box} from "@material-ui/core";
import Diary from "../home/Diary";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
    wrapper: {
        position: 'relative',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },

    thumbnailCard: {
        justifyContent: 'center',
        width: 'auto',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 6,
        paddingBottom: 6,
        margin: 8,
    },
    prevCard: {
        display: 'flex',
        alignSelf: 'flex-start',
    },
    currentCard: {
        position: 'relative',
        display: 'flex',
        width: '85vw',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 12,
        marginBottom: 12,
    },
    nextCard: {
        display: 'flex',
        alignSelf: 'flex-end',
    },

    editIcon: {
        right: '28px',
        color: '#214368',
    },
    deleteIcon: {
        right: '5px',
        color: '#b51f5c',
    }
});

const DailyCalendar = () => {
    const classes = useStyles();
    return (
        <div className={classNames(classes.wrapper)}>
            <Box
                className={classNames(classes.thumbnailCard, classes.prevCard)}
                boxShadow={3}
            >
                2019년<br/>
                9월 21일
            </Box>

            <Box
                className={classNames(classes.currentCard)}
                boxShadow={3}
            >
                <FloatingIcon icon={faPencilAlt} className={classes.editIcon} />
                <FloatingIcon icon={faTrashAlt} className={classes.deleteIcon} />
                <Diary height="auto" />
            </Box>

            <Box
                className={classNames(classes.thumbnailCard, classes.nextCard)}
                boxShadow={3}
            >
                아직 없어요<br/>
                ㅠ_ㅠ
            </Box>
        </div>
    );
};

const FloatingIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: -28px;
    
    font-size: 18px;
`;

export default DailyCalendar;
