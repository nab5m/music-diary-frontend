import React from 'react';
import styled from 'styled-components';
import { DefaultAppBar } from "../components/AppBar";
import {makeStyles, Switch} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MonthlyCalendar from "../components/calendar/MonthlyCalendar";
import DailyCalendar from "../components/calendar/DailyCalendar";

const useStyles = makeStyles({
    switchWrapper: {
        marginTop: 2,
        marginLeft: -15,
        display: 'flex',
        justifyContent: 'flex-end',
    },
});

const Calendar = ({match}) => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        checkedSwitch: true,
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    return (
        <Container>
            <DefaultAppBar url={match.url} />

            <Typography component="div">
                <Grid component="label" container className={classes.switchWrapper} alignItems="center" spacing={1}>
                    <Grid item>일간</Grid>
                    <Grid item>
                        <AntSwitch
                            checked={state.checkedSwitch}
                            onChange={handleChange('checkedSwitch')}
                            value="checkedSwitch"
                        />
                    </Grid>
                    <Grid item>월간</Grid>
                </Grid>
            </Typography>

            {state['checkedSwitch'] &&
                <MonthlyCalendar />
            }
            {!state['checkedSwitch'] &&
                <DailyCalendar />
            }
        </Container>
    );
};

const Container = styled.div`
    width: 100vw;
    overflow-x: hidden;
    font-family: 'Gamja Flower', cursive;  
`;

const AntSwitch = withStyles(theme => ({
    root: {
        width: 36,
        height: 20,
        padding: 5,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: "#214368",
        '&$checked': {
            transform: 'translateX(15px)',
            color: "#214368",
            '& + $track': {
                opacity: 1,
                backgroundColor: "#7f9cc7",
            },
        },
    },
    thumb: {
        marginTop: 1,
        width: 15,
        height: 15,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

export default Calendar;
