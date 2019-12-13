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
});

const DeleteListDialog = ({id, open, onClose, title}) => {
    const classes = useStyles();

    const handleClose = () => {
        onClose(-1);
    };

    return (
        <Dialog open={open} onClose={handleClose} classes={{paper: classes.container}}>
            <h3 className={classes.title}>{title}</h3>
            <p className={classes.guideMessage}>정말 이 목록을 삭제할거야?</p>
            <div className={classes.buttonGroup}>
                <Button
                    classes={{root: classes.button, label: classes.cancelButton}}
                    onClick={handleClose}
                >
                    취소
                </Button>
                <Button
                    classes={{root: classes.button, label: classes.deleteButton}}
                    onClick={() => {onClose(id);}}
                >
                    삭제
                </Button>
            </div>
        </Dialog>
    );
};

export default DeleteListDialog;
