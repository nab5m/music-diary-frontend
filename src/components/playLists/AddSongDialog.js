import React, {createRef} from 'react';
import {Dialog, makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Pagination from '@material-ui/lab/Pagination';
import {observer} from "mobx-react";
import {SongAdd} from "./Song";

const useStyles = makeStyles({
    container: {
        position: 'relative',
        boxSizing: 'border-box',
        width: '90vw',
        height: '80vh',
        padding: '10px',
        margin: 0,
    },
    header: {
        borderBottom: '1px solid #b5b8bb',
        padding: '5px 10px',
        color: '#b5b8bb',
    },
    title: {
        fontSize: '18px',
        fontWeight: 'normal',
        color: '#b51f5c',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        margin: '10px 5px',
        padding: '5px 10px',
        borderStyle: 'solid',
        borderRadius: '5px',
        border: '1px solid #b51f5c',
    },

    songList: {
        height: 'calc(80vh - 20px - 55px - 50px - 60px)',
        overflowX: 'hidden',
        overflowY: 'auto',
    },

    buttonGroup: {
        position: 'absolute',
        right: '5px',
        bottom: '0',
    },
    button: {
        minWidth: '32px',
        width: 'fit-content',
    },
    closeButton: {
        width: 'fit-content',
        color: '#214368',
    },
    addButton: {
        width: 'fit-content',
        color: '#b51f5c',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 5,
    }
});

const AddSongDialog = observer(
    ({open, onClose, listId, title, sendSearchQuery, searchResult, listHasSong
            , addSongToMyList, removeSongFromMyList}) => {
    const classes = useStyles();
    const inputRef = createRef();

    const handleSearchRequest = () => {
        const inputValue = inputRef.current.value;
        if(inputValue) {
            sendSearchQuery(inputValue);
        }
    };

    const getPageRequest = (page) => {
        sendSearchQuery(searchResult.input, (page-1)*10);
    };

    // ToDo: shouldUpdateComponent
    const Songs = searchResult.songs.map((item) => {
        return (
            <SongAdd key={item.id} targetListId={listId} songId={item.id} title={item.title}
                     thumbnail_image_url={item.thumbnail_image_url}
                     artist={item.artist} listHasSong={listHasSong(listId, item.id)}
                    addSongToMyList={addSongToMyList} removeSongFromMyList={removeSongFromMyList} />
        );
    });

    console.log(Songs);

    return (
        <Dialog open={open} onClose={onClose} classes={{paper: classes.container}}>
            <div className={classes.header}>
                <h3 className={classes.title}>{title}</h3>
                노래 추가
            </div>
            <form className={classes.form} onSubmit={(e) => {e.preventDefault(); handleSearchRequest();}}>
                <input
                    className={classes.input}
                    id="search-song"
                    name="search-song"
                    ref={inputRef}
                    autoComplete="off"
                    placeholder="제목이나 가수 이름으로 검색" />
            </form>

            <div className={classes.songList}>
                { Songs }
            </div>
            <Pagination className={classes.pagination} count={Math.ceil(searchResult.count/10)}
                        page={searchResult.offset/10 + 1} size="small" onChange={(event, value) => {getPageRequest(value);}} />

            <div className={classes.buttonGroup}>
                <Button
                    classes={{root: classes.button, label: classes.closeButton}}
                    onClick={onClose}
                >
                    완료
                </Button>
            </div>
        </Dialog>
    );
});

export default AddSongDialog;
