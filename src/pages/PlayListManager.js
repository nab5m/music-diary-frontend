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
import {FloatingIcon} from "../components/playLists/SongComponents";

const PlayListManager = observer(({match}) => {
    //const [addListDialogOpen, setAddListDialogOpen] = useState(false);
    //const [deleteListDialog, setDeleteListDialog] = useState({id: -1, title: '', open: false});

    const {playLists} = useStores();

    // const handleClickCheckButton = (listId, songId) => {
    //
    //     // setPlayLists({
    //     //     ...playLists,
    //     //     checkedCount: playLists.checkedCount
    //     //     lists:
    //     // });
    // };

    const PlayLists = playLists.lists.map(
        list => (
            <PlayList
                key={list.listId}
                id={list.listId}
                title={list.listTitle}
                songs={list.songs}
                checkedSongs={playLists.checkedSongs}
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
