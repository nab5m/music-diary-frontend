import React from 'react';
import {Dialog, makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    container: {
        boxSizing: 'border-box',
        width: '80vw',
        padding: '10px',
        margin: 0,
    },
    title: {
        padding: '5px 10px',
        fontSize: '18px',
        fontWeight: 'normal',
        borderBottom: '1px solid #b5b8bb',
        color: '#b51f5c',
    },
    guideMessage: {
        padding: '5px 10px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        minWidth: '32px',
        width: 'fit-content',
    },
    cancelButton: {
        width: 'fit-content',
        color: '#214368',
    },
    deleteButton: {
        width: 'fit-content',
        color: '#b51f5c',
    },
    extra: {
        color: '#214368',
    },
});

const DeleteSongsDialog = ({open, onClose, title, checkedCount}) => {
    const classes = useStyles();

    const cancel = () => {
        onClose(false);
    };
    const confirm = () => {
        onClose(true);
    };

    return (
        <Dialog open={open} onClose={cancel} classes={{paper: classes.container}}>
            { checkedCount === 0 &&
                <h3 className={classes.title}>선택된 곡이 없습니다!!</h3>
            }
            { checkedCount >= 1 &&
                <h3 className={classes.title}>{title} <span className={classes.extra}> + {checkedCount - 1}곡</span></h3>
            }
            <p className={classes.guideMessage}>정말 이 노래 모두 삭제할거야?</p>
            <div className={classes.buttonGroup}>
                <Button
                    classes={{root: classes.button, label: classes.cancelButton}}
                    onClick={cancel}
                >
                    취소
                </Button>
                <Button
                    classes={{root: classes.button, label: classes.deleteButton}}
                    onClick={confirm}
                >
                    삭제
                </Button>
            </div>
        </Dialog>
    );
};

export default DeleteSongsDialog;
