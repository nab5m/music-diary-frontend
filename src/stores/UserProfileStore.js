import {observable, action, decorate} from "mobx";
import axios from 'axios';
import {getServerUrl} from "../secrets/Constants";

axios.defaults.withCredentials = true;

class UserProfileStore {
    isReady = false;
    data = {
        nickname: null,
        thumbnail_image: null,
        email: null,
        age_range: null,
        gender: null,
    };

    loadData = () => {
        const url = getServerUrl() + 'user/';
        const requestData = {};

        axios.get(url, {data: requestData})
            .then((response) => {
                const responseData = response.data.kakao_account;

                if(!responseData['profile_needs_agreement']) {
                    this.data['nickname'] = responseData['profile']['nickname'];
                    this.data['thumbnail_image'] = responseData['profile']['thumbnail_image_url'];
                }

                if(responseData['has_email'] && !responseData['email_needs_agreement']) {
                    this.data['email'] = responseData['email'];
                }
                if(responseData['has_age_range'] && !responseData['age_range_needs_agreement']) {
                    this.data['age_range'] = responseData['age_range'];
                }
                if(responseData['has_gender'] && !responseData['gender_needs_agreement']) {
                    this.data['gender'] = responseData['gender'];
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    logout = () => {
        const url = getServerUrl() + 'logout/';
        const requestData = {};

        axios.get(url, {data: requestData})
            .then((response) => {
                for (const property in this.data) {
                    console.log(response);
                    this.data[property] = null;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

decorate(UserProfileStore, {
    isReady: observable,
    data: observable,

    loadData: action,

    logout: action,
});

export default UserProfileStore;
