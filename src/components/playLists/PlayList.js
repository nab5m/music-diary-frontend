import React from 'react';
import Box from "@material-ui/core/Box";
import {faCheck, faPlus} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";
import styled from "styled-components";
import {makeStyles} from "@material-ui/core";
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

const PlayList = observer(({id, title, songs, loadState, checkedSongs,
                               openDeleteListDialog, toggleCheckButton, addToTodaysList}) => {
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

    const Songs = songs.map(
        song => {
            return (
            <Song key={song.id}>
                <SongProfileImage src={song.thumbnail_image_url} alt="hello"/>
                <SongTitle>{song.title}</SongTitle>
                <SongArtist>{song.artist}</SongArtist>

                <FloatingIcon
                    icon={faCheck}
                    onClick={() => {
                        toggleCheckButton(id, song.id)
                    }}
                    className={classNames(classes.checkSongIcon, song.checked ? classes.checkedSongIcon : '')}/>
                <FloatingIcon
                    icon={faPlus}
                    onClick={() => {
                        addToTodaysList(id, song.id)
                    }}
                    className={classes.addTodaySongIcon}/>
            </Song>
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
