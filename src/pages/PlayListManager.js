import React from 'react';
import styled from 'styled-components';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { DefaultAppBar } from "../components/AppBar";
import PlayList from "../components/playLists/PlayList";
import AddListDialog from "../components/playLists/AddListDialog";
import DeleteListDialog from "../components/playLists/DeleteListDialog";
import {observer} from "mobx-react";
import useStores from "../stores/useStores";
import DeleteSongsDialog from "../components/playLists/DeleteSongsDialog";
import TodaysList from "../components/playLists/TodaysList";
import {FloatingIcon} from "../components/playLists/StyledSongComponents";
import AddSongDialog from "../components/playLists/AddSongDialog";

const PlayListManager = observer(({match}) => {
    const {playLists} = useStores();
    if(playLists.loadState === "before") {
        playLists.loadDataFromServer();
    }

    const PlayLists = playLists.lists.map(
        list => (
            <PlayList
                key={list.id}
                id={list.id}
                title={list.title}
                songs={list.songs}
                loadState={playLists.loadState}
                checkedSongs={playLists.checkedSongs}
                openAddSongDialog={playLists.openAddSongDialog}
                openDeleteListDialog={playLists.openDeleteListDialog}
                toggleCheckButton={playLists.toggleCheckButton}
                addToTodaysList={playLists.addToTodaysList}
            />
        )
    );

    return (
        <Container>
            <DefaultAppBar url={match.url} />

            <ListContainer>
                <TodaysList/>
                {PlayLists}
            </ListContainer>

            <AddSongDialog listId={playLists.addSongDialog.listId} title={playLists.addSongDialog.listTitle}
                           open={playLists.addSongDialog.open} onClose={playLists.closeAddSongDialog}
                            sendSearchQuery={playLists.sendSearchQuery} searchResult={playLists.searchResult}
                            listHasSong={playLists.listHasSong} addSongToMyList={playLists.addSongToMyList}
                            removeSongFromMyList={playLists.removeSongFromMyList}/>

            <AddListDialog open={playLists.addListDialogOpen} onClose={playLists.closeAddListDialog} />

            <DeleteListDialog id={playLists.deleteListDialog.id} title={playLists.deleteListDialog.title}
                              open={playLists.deleteListDialog.open} onClose={playLists.closeDeleteListDialog}/>

            <DeleteSongsDialog title={playLists.deleteSongsDialog.title} checkedCount={playLists.deleteSongsDialog.checkedCount}
                               open={playLists.deleteSongsDialog.open} onClose={playLists.closeDeleteSongsDialog} />

            <FloatingActionButton onClick={playLists.openDeleteSongsDialog}>
                <FloatingIcon icon={faTrashAlt} />
            </FloatingActionButton>

            <FloatingActionButton onClick={playLists.openAddListDialog} isActive>
                <FloatingIcon icon={faPlus} />
            </FloatingActionButton>
        </Container>
    );
});

const Container = styled.div`

`;

const ListContainer = styled.div`
    height: calc(100vh - 160px);
    overflow-y: scroll;
    padding: 10px 20px;
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
