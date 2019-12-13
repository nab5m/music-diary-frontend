import {observable, action, decorate} from "mobx";

class PlayListsStore {
    nextId = 3;
    lists = [
        {
            listId: 0,
            listTitle: "O O 이에게 불러줄 노래",
            songs: [
                {songId: 3051900, songTitle: "AH YEAH(아예)", songArtist: "WINNER", checked: true},
                {songId: 3087858, songTitle: "U GOT IT", songArtist: "갓츄 (GOT U)", checked: false},
                {songId: 137579, songTitle: "기억을 걷는 시간", songArtist: "넬(NELL)", checked: false},
            ],
        },
        {
            listId: 1,
            listTitle: "새 목록",
            songs: [
            ],
        },
        {
            listId: 2,
            listTitle: "겨울 테마곡",
            songs: [
                {songId: 2930532, songTitle: "누니와", songArtist: "머시다 흘러", checked: false},
                {songId: 41669, songTitle: "거리에서", songArtist: "성시경", checked: false},
                {songId: 411459, songTitle: "LET IT GO", songArtist: "겨울왕국", checked: true},
            ],
        },
    ];
    todaysList = [
        {listId: 0, songId: 2970028, songTitle: "시든 꽃에 물을 주듯", songArtist: "HYNN(박혜원)"},
        {listId: 0, songId: 3399860, songTitle: "Love Poem", songArtist: "아이유(IU)"},
        {listId: 2, songId: 406680, songTitle: "12월의 기적", songArtist: "EXO"},
        {listId: 2, songId: 184117, songTitle: "미리 메리 크리스마스", songArtist: "IU"},
    ];

    /* dialogs @observable */
    addListDialogOpen = false;
    deleteListDialog = {id: -1, title: '', open: false};
    deleteSongsDialog = {title: '', checkedCount: 0, open: false};

    /* dialogs @action */
    openAddListDialog = () => {
        this.addListDialogOpen = true;
    };
    closeAddListDialog = (title) => {
        if(title) {
            this.lists.push({
                listId: this.nextId++,
                listTitle: title,
                songs: [],
            });
        }
        this.addListDialogOpen = false;
    };
    openDeleteListDialog = (id, title) => {
        this.deleteListDialog.id = id;
        this.deleteListDialog.title = title;
        this.deleteListDialog.open = true;
    };
    closeDeleteListDialog = (id) => {
        if(id !== -1) {
            this.lists = this.lists.filter((elem) => {
                 return elem.listId !== id;
            });
        }
        this.deleteListDialog.id = -1;
        this.deleteListDialog.title = '';
        this.deleteListDialog.open = false;
    };

    openDeleteSongsDialog = () => {
        let count = 0;
        for(let i=0; i<this.lists.length; i++) {
            for(let j=0; j<this.lists[i].songs.length; j++) {
                if(this.lists[i].songs[j].checked) {
                    if(count === 0) {
                        this.deleteSongsDialog.title = this.lists[i].songs[j].songTitle;
                    }
                    count++;
                }
            }
        }
        this.deleteSongsDialog.checkedCount = count;
        this.deleteSongsDialog.open = true;
    };
    closeDeleteSongsDialog = (confirm) => {
        if(confirm) {
            let copiedLists = this.lists.slice(0);
            for(let i=0; i<copiedLists.length; i++) {
                copiedLists[i].songs = copiedLists[i].songs.filter((elem) => {
                    return !elem.checked;
                });
            }

            this.lists = copiedLists;
        }

        // this.deleteSongsDialog.title = '';
        // this.deleteSongsDialog.checkedCount = 0;
        this.deleteSongsDialog.open = false;
    };

    toggleCheckButton = (listId, songId) => {
        for(let i=0; i<this.lists.length; i++) {
            if(this.lists[i].listId === listId) {
                for(let j=0; j<this.lists[i].songs.length; j++) {
                    if(this.lists[i].songs[j].songId === songId) {
                        this.lists[i].songs[j].checked = !this.lists[i].songs[j].checked;
                    }
                }
            }
        }
    };

    addToTodaysList = (listId, songId) => {
        let song = {checked: false};
        for(let i=0; i<this.lists.length; i++) {
            if(this.lists[i].listId === listId) {
                song = this.lists[i].songs.find((item) => {
                    return item.songId === songId;
                });
                this.lists[i].songs = this.lists[i].songs.filter((item) => {
                    return item.songId !== songId;
                });
            }
        }

        song.listId = listId;
        delete song.checked;

        this.todaysList.push(song);
    };
    removeFromTodaysList = (listId, songId) => {
        let song = this.todaysList.find((item) => {
            return item.listId === listId && item.songId === songId;
        });

        // removeFromList
        this.todaysList = this.todaysList.filter((item) => {
            return item.listId !== listId || item.songId !== songId;
        });

        // addToInitialList
        for(let i=0; i<this.lists.length; i++) {
            if(this.lists[i].listId === listId) {
                this.lists[i].songs.push(song);
            }
        }
        delete song.listId;
        song.checked = false;
    };
}
decorate(PlayListsStore, {
    lists: observable,
    todaysList: observable,

    addListDialogOpen: observable,
    deleteListDialog: observable,
    deleteSongsDialog: observable,

    openAddListDialog: action,
    closeAddListDialog: action,
    openDeleteListDialog: action,
    closeDeleteListDialog: action,
    openDeleteSongsDialog: action,
    closeDeleteSongsDialog: action,

    toggleCheckButton: action,

    addToTodaysList: action,
    removeFromTodaysList: action,
});

export default PlayListsStore;
