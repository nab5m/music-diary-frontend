import {FloatingIcon, StyledSong, SongArtist, SongProfileImage, SongTitle} from "./StyledSongComponents";
import {faCheck, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import React from "react";
import {makeStyles} from "@material-ui/core";

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
    addTodaySongIcon: {
        padding: 5,
        fontSize: '0.9em',
        color: '#214368',
        top: 18,
        left: 'auto',
        right: 0,
    },
    removeIcon: {
        padding: 5,
        fontSize: '0.9em',
        color: '#b51f5c',
        top: 15,
        left: 'auto',
        right: 5,
    },
    paddingRight20: {
        width: 'calc(100% - 50px - 20px)',
    },
    paddingRight45: {
        width: 'calc(100% - 50px - 45px)',
    },
    addNewSongIcon: {
        padding: 5,
        fontSize: '0.9em',
        color: '#214368',
        top: 18,
        left: 'auto',
        right: 10,
    },
});

const TodaySong = ({listId, songId, thumbnail_image_url, title, artist, removeFromTodaysList}) => {
    const classes = useStyles();

    return (
        <StyledSong>
            <SongProfileImage src={thumbnail_image_url} alt="hello" />
            <SongTitle className={classes.paddingRight20}>{title}</SongTitle>
            <SongArtist className={classes.paddingRight20}>{artist}</SongArtist>

            <FloatingIcon
                icon={faMinus}
                onClick={() => {removeFromTodaysList(listId, songId)}}
                className={classes.removeIcon} />
        </StyledSong>
    );
};

const Song = ({listId, songId, thumbnail_image_url, title, artist,
                  toggleCheckButton, checked, addToTodaysList}) =>
{
    const classes = useStyles();

    return (
        <StyledSong>
            <SongProfileImage src={thumbnail_image_url} alt="hello"/>
            <SongTitle className={classes.paddingRight45}>{title}</SongTitle>
            <SongArtist className={classes.paddingRight45}>{artist}</SongArtist>

            <FloatingIcon
                icon={faCheck}
                onClick={() => {
                    toggleCheckButton(listId, songId)
                }}
                className={classNames(classes.checkSongIcon, checked ? classes.checkedSongIcon : '')}/>
            <FloatingIcon
                icon={faPlus}
                onClick={() => {
                    addToTodaysList(listId, songId)
                }}
                className={classes.addTodaySongIcon}/>
        </StyledSong>
    );
};

const SongAdd = ({targetListId, songId, thumbnail_image_url, title, artist, listHasSong,
                    addSongToMyList, removeSongFromMyList}) =>
{
    const classes = useStyles();

    let icon = null;
    if(listHasSong) {
        icon = <FloatingIcon
                    icon={faMinus}
                    className={classes.addNewSongIcon}
                    onClick={() => { removeSongFromMyList(targetListId, songId); } } />;
    }
    else {
        icon = <FloatingIcon
                    icon={faPlus}
                    className={classes.addNewSongIcon}
                    onClick={() => { addSongToMyList(targetListId, songId); } } />;
    }

    return (
        <StyledSong>
            <SongProfileImage src={thumbnail_image_url} alt="hello"/>
            <SongTitle className={classes.paddingRight20}>{title}</SongTitle>
            <SongArtist className={classes.paddingRight20}>{artist}</SongArtist>

            {icon}
        </StyledSong>
    );
};

export { Song };
export { TodaySong };
export { SongAdd };
