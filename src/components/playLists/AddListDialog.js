import React, {createRef} from 'react';
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
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        margin: '10px 5px',
        padding: '5px 10px',
        borderStyle: 'solid',
        borderRadius: '5px',
        border: '1px solid #b51f5c',
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
    addButton: {
        width: 'fit-content',
        color: '#b51f5c',
    },
});

const AddListDialog = ({open, onClose}) => {
    const classes = useStyles();
    const inputRef = createRef();

    const handleClose = () => {
        onClose(false);
    };
    const handleCreateNewList = () => {
        const inputValue = inputRef.current.value;
        if(inputValue) {
            onClose(inputValue)
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} classes={{paper: classes.container}}>
            <h3 className={classes.title}>목록 추가</h3>
            <form className={classes.form} onSubmit={(e) => {e.preventDefault(); handleCreateNewList();}}>
                <input
                    className={classes.input}
                    id="new-list-title"
                    name="new-list-title"
                    ref={inputRef}
                    autoComplete="off"
                    placeholder="새 목록 이름" />

                <div className={classes.buttonGroup}>
                    <Button
                        classes={{root: classes.button, label: classes.cancelButton}}
                        onClick={handleClose}
                    >
                        취소
                    </Button>
                    <Button
                        classes={{root: classes.button, label: classes.addButton}}
                        onClick={handleCreateNewList}
                    >
                        추가
                    </Button>
                </div>
            </form>
        </Dialog>
    );
};

export default AddListDialog;
