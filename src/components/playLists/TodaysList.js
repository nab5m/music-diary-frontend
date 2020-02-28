import React from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core";
import {observer} from "mobx-react";
import useStores from "../../stores/useStores";
import {TodaySong} from "./Song";

const useStyles = makeStyles({
    container: {
        marginBottom: 15,
        borderRadius: 10,
    },
    title: {
        backgroundColor: '#b51f5c',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: '5px 15px',
        marginBottom: '10px',
        fontSize: '1.2em',
        fontWeight: 'normal',
        color: '#f7fbfe',
    },
    listWrapper: {
        maxHeight: '200px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        padding: '0 10px',
        paddingBottom: 5,
    },
});

const TodaysList = observer(() => {
    const classes = useStyles();
    const {playLists} = useStores();
    const list = playLists.todaysList;

    /* listId, songId, thumbnail_image_url, title, artist, removeFromTodaysList */
    /* key 중복 가능성? */
    const Songs = list.map((song) => {
        return (
            <TodaySong key={song.songId} listId={song.listId} songId={song.songId}
                thumbnail_image_url={song.thumbnail_image_url} title={song.title} artist={song.artist}
                removeFromTodaysList={playLists.removeFromTodaysList} />
        );
    });

    return (
        <Box
            className={classes.container}
            boxShadow={3}
        >
            <h2 className={classes.title}>오늘 부른 노래</h2>
            <div className={classes.listWrapper}>
                {Songs}
            </div>
        </Box>
    );
});

export default TodaysList;
