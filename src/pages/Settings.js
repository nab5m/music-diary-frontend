import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { DefaultAppBar } from "../components/AppBar";
import Button from "@material-ui/core/Button";
import {withCookies} from "react-cookie";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    profile: {
        height: 75,
        padding: 20,
    },
    profileImage: {
        float: 'left',
        width: 75,
        height: 75,
        borderRadius: 75,
    },
    profileDataWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 75,
        paddingLeft: 20,
        boxSizing: 'border-box',
    },
    ageRange: {
    },
    logoutButton: {
        marginLeft: 20,
    },
});

const Settings = ({match, cookies}) => {
    const classes = useStyles();

    const User = cookies.get('user');
    const Nickname = User.profile.properties.nickname;
    const Email = User.profile.kakao_account.email;
    const AgeRange = User.profile.kakao_account.age_range;
    const ProfileImageURL= User.profile.properties.profile_image;

    const Logout = () => {
        console.log('로그아웃');
    };

    return (
        <Container>
            <DefaultAppBar url={match.url} />
            <div className={classes.profile}>
                <img className={classes.profileImage} src={ProfileImageURL} alt="프로필사진" />
                <div className={classes.profileDataWrapper}>
                    <div className={classes.nickname}>닉네임 : {Nickname}</div>
                    <div className={classes.email}>이메일 : {Email}</div>
                    <div className={classes.ageRange}>연령대 : {AgeRange}</div>
                </div>
            </div>
            <Button className={classes.logoutButton} onClick={Logout} variant="outlined">로그아웃</Button>

            <FloatingActionButton>
                <FloatingIcon icon={faPencilAlt} />
            </FloatingActionButton>

            <FloatingActionButton isActive>
                <FloatingIcon icon={faPlus} />
            </FloatingActionButton>
        </Container>
    );
};

const Container = styled.div`

`;

const FloatingIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 14px;
    left: 15px;
    
    font-size: 18px;
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

export default withCookies(Settings);
