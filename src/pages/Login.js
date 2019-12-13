import React from 'react';
import KakaoLogin from 'react-kakao-login';
import { JS_APP_KEY } from '../secrets/KakaoKey';
import { withCookies } from 'react-cookie';

const Login = ({history, cookies}) => {
    const GoBack = () => {
        history.push('/');
    };

    const onSuccess = (result) => {
        cookies.set('user', result);
        history.push('/home');
    };

    return (
        <div>
            <KakaoLogin
                jsKey={JS_APP_KEY}
                onSuccess={result => onSuccess(result)}
                onFailure={() => GoBack()}
                getProfile={true}
            />
        </div>
    );
};

export default withCookies(Login);
