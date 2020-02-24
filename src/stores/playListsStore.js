import {observable, action, decorate} from "mobx";
import {SERVER_URL_PREFIX} from "../secrets/Constants";
import axios from "axios";

class PlayListsStore {
    lists = [];
    todaysList = [];
    // lists = [
    //     {
    //         listId: 0,
    //         listTitle: "O O 이에게 불러줄 노래",
    //         songs: [
    //             {songId: 3051900, songTitle: "AH YEAH(아예)", songArtist: "WINNER", checked: true},
    //             {songId: 3087858, songTitle: "U GOT IT", songArtist: "갓츄 (GOT U)", checked: false},
    //             {songId: 137579, songTitle: "기억을 걷는 시간", songArtist: "넬(NELL)", checked: false},
    //         ],
    //     },
    //     {
    //         listId: 1,
    //         listTitle: "새 목록",
    //         songs: [
    //         ],
    //     },
    //     {
    //         listId: 2,
    //         listTitle: "겨울 테마곡",
    //         songs: [
    //             {songId: 2930532, songTitle: "누니와", songArtist: "머시다 흘러", checked: false},
    //             {songId: 41669, songTitle: "거리에서", songArtist: "성시경", checked: false},
    //             {songId: 411459, songTitle: "LET IT GO", songArtist: "겨울왕국", checked: true},
    //         ],
    //     },
    // ];

    // todaysList = [
    //     {listId: 0, songId: 2970028, title: "시든 꽃에 물을 주듯", artist: "HYNN(박혜원)"},
    //     {listId: 0, songId: 3399860, title: "Love Poem", artist: "아이유(IU)"},
    //     {listId: 2, songId: 406680, title: "12월의 기적", artist: "EXO"},
    //     {listId: 2, songId: 184117, title: "미리 메리 크리스마스", artist: "IU"},
    // ];
    loadState = "before";
    // before, pending, success, error

    /* dialogs @observable */
    addListDialogOpen = false;
    deleteListDialog = {id: -1, title: '', open: false};
    deleteSongsDialog = {title: '', checkedCount: 0, open: false};
    async loadDataFromServer() {
        /*
        ToDo: call Only one time
         */

        const url = SERVER_URL_PREFIX + 'api/v1/play-list';
        const requestData = {};

        if(this.loadState === "success") {
            console.log("응 끝났어");
            return;
        }

        this.loadState = "pending";

        await axios.get(url, {data: requestData})
            .then((response) => {
                this.lists = response.data.results;
                const url = SERVER_URL_PREFIX + 'api/v1/song/';

                for (let i=0; i < this.lists.length; i++) {
                    const songs = this.lists[i].songs;
                    for(let j=0; j < songs.length; j++) {
                        axios.get(url + songs[j], {data: requestData})
                            .then((response) => {
                                this.lists[i].songs[j] = { ...response.data, checked: false };
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                }

                console.log("finished");
                this.loadState = "success";
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /* dialogs @action */
    openAddListDialog = () => {
        this.addListDialogOpen = true;
    };
    closeAddListDialog = (title) => {
        if(title) {
            const url = SERVER_URL_PREFIX + 'api/v1/play-list/';
            const requestData = {title: title};

            axios.post(url, {...requestData})
                .then((response) => {
                    this.lists.push({
                        id: response.data.id,
                        title: title,
                        songs: [],
                    });
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
        this.addListDialogOpen = false;
    };
    openDeleteListDialog = (id, title) => {
        this.deleteListDialog.id = id;
        this.deleteListDialog.title = title;
        this.deleteListDialog.open = true;
    };
    closeDeleteListDialog = async (id) => {
        if(id === -1) { return; }

        const url = SERVER_URL_PREFIX + 'api/v1/play-list/' + id + '/';

        await axios.delete(url)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response);
            });

        this.lists = this.lists.filter((elem) => {
             return elem.id !== id;
        });
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
                        this.deleteSongsDialog.title = this.lists[i].songs[j].title;
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
            if(this.lists[i].id === listId) {
                for(let j=0; j<this.lists[i].songs.length; j++) {
                    if(this.lists[i].songs[j].id === songId) {
                        this.lists[i].songs[j].checked = !this.lists[i].songs[j].checked;
                    }
                }
            }
        }
    };

    addToTodaysList = (listId, songId) => {
        /*
        ToDo: connect Server(Diary Table)
         */

        let song = {checked: false};
        for(let i=0; i<this.lists.length; i++) {
            if(this.lists[i].id === listId) {
                song = this.lists[i].songs.find((item) => {
                    return item.id === songId;
                });
                this.lists[i].songs = this.lists[i].songs.filter((item) => {
                    return item.id !== songId;
                });
            }
        }

        song = {...song, songId: songId, listId: listId};
        delete song.checked;

        this.todaysList.push(song);
    };
    removeFromTodaysList = (listId, songId) => {
        /*
        ToDo: connect Server(Diary Table)
         */

        let song = this.todaysList.find((item) => {
            return item.listId === listId && item.songId === songId;
        });

        // removeFromList
        this.todaysList = this.todaysList.filter((item) => {
            return item.listId !== listId || item.songId !== songId;
        });

        // addToInitialList
        for(let i=0; i<this.lists.length; i++) {
            if(this.lists[i].id === listId) {
                this.lists[i].songs.push(song);
            }
        }
        delete song.listId;
        delete song.songId;
        song.checked = false;
    };
}
decorate(PlayListsStore, {
    lists: observable,
    todaysList: observable,
    loadState: observable,

    addListDialogOpen: observable,
    deleteListDialog: observable,
    deleteSongsDialog: observable,

    loadDataFromServer: action,

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
