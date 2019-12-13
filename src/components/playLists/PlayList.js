import React from 'react';
import Box from "@material-ui/core/Box";
import {faCheck, faPlus} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";
import styled from "styled-components";
import {makeStyles} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {observer} from "mobx-react";
import {FloatingIcon, Song, SongArtist, SongProfileImage, SongTitle} from "./SongComponents";

const useStyles = makeStyles({
    checkSongIcon: {
        padding: 5,
        fontSize: '0.9em',
        color: '#b5b8bb',
        top: 18,
        left: 'auto',
        right: 28,
    },
    checkedSongIcon: {
        color: '#b51f5c !important',
    },
    addSongIcon: {
        fontSize: '0.9em',
        color: '#214368',
        top: 8,
        left: 'auto',
        right: 28,
    },
    addTodaySongIcon: {
        padding: 5,
        fontSize: '0.9em',
        color: '#214368',
        top: 18,
        left: 'auto',
        right: 0,
    },
    deleteListIcon: {
        fontSize: '0.9em',
        color: '#b51f5c',
        top: 8,
        left: 'auto',
        right: 5,
    },
    listWrapper: {
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 15,
    },
});

const PlayList = observer(({id, title, songs, checkedSongs,
                               openDeleteListDialog, toggleCheckButton, addToTodaysList}) => {
    const classes = useStyles();

    const Songs = songs.map(
        song => (
            <Song key={song.songId}>
                <SongProfileImage src={`/${song.songId}.jpg`} alt="hello" />
                <SongTitle>{song.songTitle}</SongTitle>
                <SongArtist>{song.songArtist}</SongArtist>

                <FloatingIcon
                    icon={faCheck}
                    onClick={() => {toggleCheckButton(id, song.songId)}}
                    className={classNames(classes.checkSongIcon, song.checked ? classes.checkedSongIcon : '')} />
                <FloatingIcon
                    icon={faPlus}
                    onClick={() => {addToTodaysList(id, song.songId)}}
                    className={classes.addTodaySongIcon} />
            </Song>
        )
    );

    return (
        <Box
            className={classes.listWrapper}
            boxShadow={3}
        >
            <ListTitle>
                {title}

                <FloatingIcon icon={faPlus} className={classes.addSongIcon} />
                <FloatingIcon
                    icon={faTrashAlt}
                    className={classes.deleteListIcon}
                    onClick={() => {openDeleteListDialog(id, title);}}
                />
            </ListTitle>

            <SongList>
                { Songs }
            </SongList>
        </Box>
    );
});

const ListTitle = styled.div`
    color: #b51f5c;
    font-size: 1.1em;
    position: relative;
    padding: 5px 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #b5b8bb;
`;

const SongList = styled.div`
`;

export default PlayList;
