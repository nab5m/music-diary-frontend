import {observable, action, decorate} from "mobx";
import {getServerUrl} from "../secrets/Constants";
import axios from "axios";

axios.defaults.withCredentials = true;

class PlayListsStore {
    lists = [];
    todaysList = [];
    searchResult = {input: '', offset: 0, count: 0, songs: []};
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
    addSongDialog = {listTd: -1, listTitle: '', open: false};
    addListDialogOpen = false;
    deleteListDialog = {id: -1, title: '', open: false};
    deleteSongsDialog = {title: '', checkedCount: 0, open: false};

    async loadDataFromServer() {
        /*
        ToDo: call Only one time
         */

        const url = getServerUrl() + 'api/v1/play-list';
        const requestData = {};

        if(this.loadState === "success") {
            console.log("응 끝났어");
            return;
        }

        this.loadState = "pending";

        await axios.get(url, {data: requestData})
            .then((response) => {
                this.lists = response.data.results;
                const url = getServerUrl() + 'api/v1/song/';

                for (let i=0; i < this.lists.length; i++) {
                    const songs = this.lists[i].songs;

                    /* 해당 list를 찾는 낭비 때문에 updateSongInfoInList()로 대체하지 않음 */
                    for(let j=0; j < songs.length; j++) {
                        axios.get(url + songs[j], {data: requestData})
                            .then((response) => {
                                this.lists[i].songs[j] = { ...response.data, checked: false };
                            })
                            .catch((error) => {
                                console.log(error.response);
                            });
                    }
                }

                console.log("finished");
                this.loadState = "success";
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    listHasSong = (listId, songId) => {
        console.log(listId + ' ' + songId);

        const songs = this.getSongsFromList(listId);
        for(let i=0; i < songs.length; i++) {
            if(songId === songs[i]) {
                return true;
            }
        }

        return false;
    };

    /* dialogs @action */
    openAddSongDialog = (id, title) => {
        this.addSongDialog.listId = id;
        this.addSongDialog.listTitle = title;
        this.addSongDialog.open = true;
    };
    sendSearchQuery = async (input, offset=0, limit=10) => {
        const url = getServerUrl() + `api/v1/song/?search=${encodeURI(input)}&offset=${offset}&limit=${limit}`;

        await axios.get(url)
            .then((response) => {
                // ToDo: 굳이 오프셋을 매번 문자열에서 읽어와? count도 매번 갱신해?
                if(response.data['next']) {
                    console.log('has next');

                    const offsetStartIdx = response.data.next.indexOf("offset=");
                    const offsetEndIdx = response.data.next.indexOf("&", offsetStartIdx);
                    const offsetVariable = response.data.next.slice(offsetStartIdx + "offset=".length, offsetEndIdx);

                    // calc current page offset
                    this.searchResult.offset = parseInt(offsetVariable) - 10;
                }
                else if(response.data['previous']) {
                    console.log('has previous');

                    const offsetStartIdx = response.data.previous.indexOf("offset=");
                    const offsetEndIdx = response.data.previous.indexOf("&", offsetStartIdx);
                    const offsetVariable = response.data.previous.slice(offsetStartIdx + "offset=".length, offsetEndIdx);

                    this.searchResult.offset = parseInt(offsetVariable) + 10;
                }
                else {
                    console.log('no prev or next');
                    this.searchResult.offset = 0;
                }

                this.searchResult.input = input;
                this.searchResult.count = response.data.count;
                this.searchResult.songs = response.data.results;
            })
            .catch((error) => {
                console.log(error.response);
            });
    };
    closeAddSongDialog = () => {
        /* delete used data */
        this.addSongDialog.listId = -1;
        this.addSongDialog.listTitle = '';
        this.addSongDialog.open = false;

        this.searchResult.input = '';
        this.searchResult.offset = 0;
        this.searchResult.count = 0;
        this.searchResult.songs = [];
    };

    getSongsFromList = (listId) => {
        let songs = [];

        for(let i=0; i < this.lists.length; i++) {
            if(listId === this.lists[i].id) {
                for(let j=0; j < this.lists[i].songs.length; j++) {
                    songs.push(this.lists[i].songs[j].id);
                }
            }
        }

        for(let i=0; i < this.todaysList.length; i++) {
            if(listId === this.todaysList[i].listId) {
                songs.push(this.todaysList[i].songId);
            }
        }

        return songs;
    };

    updateSongInfoInList = async (listId, songId) => {
        const url = getServerUrl() + 'api/v1/song/' + songId;

        await axios.get(url)
            .then((response) => {
                for(let i=0; i < this.lists.length; i++) {
                    if(listId === this.lists[i].id) {
                        this.lists[i].songs.push({ ...response.data, checked: false });
                    }
                }
            })
            .catch((error) => {
                console.log(error.response);
            });
    };
    addSongToMyList = async (listId, songId) => {
        const url = getServerUrl() + 'api/v1/play-list/' + listId + '/';
        const requestData = { songs: this.getSongsFromList(listId).concat([songId]) };

        await axios.patch(url, requestData)
            .then((response) => {
                console.log(response.data);
                this.updateSongInfoInList(listId, songId);
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    removeSongInfoInList = (listId, songId) => {
        /* if song is in today's list */

        for(let i=0; i < this.lists.length; i++) {
            if(listId === this.lists[i].id) {
                for(let j=0; j < this.lists[i].songs.length; j++) {
                    if(songId === this.lists[i].songs[j].id) {
                        this.lists[i].songs.splice(j, 1);
                        return;
                    }
                }
            }
        }

        /*
            리스트 안에서도 지웠는데 오늘 목록에서 삭제하는가?
            오늘 목록에서 삭제하면 DB에서도 삭제하는가???
        */
        for(let i=0; i < this.todaysList.length; i++) {
            if(listId === this.todaysList[i].listId && songId === this.todaysList[i].songId) {
                this.todaysList.splice(i, 1);
                return;
            }
        }
    };
    removeSongFromMyList = async (listId, songId) => {
        const url = getServerUrl() + 'api/v1/play-list/' + listId + '/';
        const requestData = {
            songs: this.getSongsFromList(listId).filter((item) => {
                return item !== songId;
            }),
        };

        await axios.patch(url, requestData)
            .then((response) => {
                console.log(response.data);
                this.removeSongInfoInList(listId, songId);
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    openAddListDialog = () => {
        this.addListDialogOpen = true;
    };
    closeAddListDialog = (title) => {
        if(title) {
            const url = getServerUrl() + 'api/v1/play-list/';
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
        if(id !== -1) { // clicked ok button
            const url = getServerUrl() + 'api/v1/play-list/' + id + '/';

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
            for(let i=0; i<this.lists.length; i++) {
                this.lists[i].songs = this.lists[i].songs.filter((elem) => {
                    if(elem.checked) {
                        this.removeSongFromMyList(this.lists[i].id, elem.id);
                    }
                    return !elem.checked;
                });
            }
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
    searchResult: observable,
    loadState: observable,

    addSongDialog: observable,
    addListDialogOpen: observable,
    deleteListDialog: observable,
    deleteSongsDialog: observable,

    loadDataFromServer: action,

    openAddSongDialog: action,
    sendSearchQuery: action,
    closeAddSongDialog: action,

    updateSongInfoInList: action,
    addSongToMyList: action,
    removeSongInfoInList: action,
    removeSongFromMyList: action,

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
