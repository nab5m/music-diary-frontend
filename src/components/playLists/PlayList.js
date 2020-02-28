import React from 'react';
import Box from "@material-ui/core/Box";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import {makeStyles} from "@material-ui/core";
import {observer} from "mobx-react";
import {FloatingIcon} from "./StyledSongComponents";
import { Song } from "./Song";

const useStyles = makeStyles({
    addSongIcon: {
        fontSize: '0.9em',
        color: '#214368',
        top: 8,
        left: 'auto',
        right: 28,
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

const PlayList = observer(({id, title, songs, loadState, checkedSongs,
                               openAddSongDialog, openDeleteListDialog, toggleCheckButton, addToTodaysList}) => {
    const classes = useStyles();

    /* ToDo: code review */
    if(loadState === "pending") {
        console.log("pending");
        return (<div> </div>);
    }

    /* ToDo: code review => should component update */
    for(let i=0; i<songs.length; i++) {
        if(!songs[i].id) {
            console.log("pending");
            return (<div> </div>);
        }
    }
    /* listId, songId, thumbnail_image_url, title, artist,
                  toggleCheckButton, checked, addToTodaysList */
    const Songs = songs.map(
        song => {
            return (
                <Song key={song.id} listId={id} songId={song.id} thumbnail_image_url={song.thumbnail_image_url}
                    title={song.title} artist={song.artist}
                    toggleCheckButton={toggleCheckButton}
                      checked={song.checked} addToTodaysList={addToTodaysList} />
            );
        }
    );

    return (
        <Box
            className={classes.listWrapper}
            boxShadow={3}
        >
            <ListTitle>
                {title}

                <FloatingIcon
                    icon={faPlus}
                    className={classes.addSongIcon}
                    onClick={() => {openAddSongDialog(id, title);}}
                />
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
