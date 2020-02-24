import React from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core";
import {FloatingIcon, Song, SongArtist, SongProfileImage, SongTitle} from "./SongComponents";
import {faMinus} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react";
import useStores from "../../stores/useStores";

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
    removeIcon: {
        padding: 5,
        fontSize: '0.9em',
        color: '#b51f5c',
        top: 15,
        left: 'auto',
        right: 5,
    },
});

const TodaysList = observer(() => {
    const classes = useStyles();
    const {playLists} = useStores();
    const list = playLists.todaysList;

    const Songs = list.map((song) => {
        return (
            <Song key={song.songId}>
                {/* key 중복 가능성 */}
                <SongProfileImage src={song.thumbnail_image_url} alt="hello" />
                <SongTitle>{song.title}</SongTitle>
                <SongArtist>{song.artist}</SongArtist>

                <FloatingIcon
                    icon={faMinus}
                    onClick={() => {playLists.removeFromTodaysList(song.listId, song.songId)}}
                    className={classes.removeIcon} />
            </Song>
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
