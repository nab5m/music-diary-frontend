import React from 'react';
import Diary from "../home/Diary";
import styled from 'styled-components';
import {faPencilAlt, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {makeStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    leftArrowIcon: {
        top: '5px',
        left: '0',
        padding: '8px',
        color: '#c4c8cb',
        fontSize: '1em',
    },
    rightArrowIcon: {
        top: '5px',
        right: '0',
        padding: '8px',
        color: '#c4c8cb',
        fontSize: '1em',
    },
    editIcon: {
        right: '38px',
        color: '#214368',
    },
    deleteIcon: {
        right: '12px',
        color: '#b51f5c',
    },
    checkedDate: {
        border: '1px solid #b51f5c',
        borderRadius: '21px',
    },
    selectedDate: {
        border: '1px solid #b51f5c',
        borderRadius: '21px',
        backgroundColor: '#b51f5c',
        color: 'white',
    },
    diaryWrapper: {
        position: 'relative',
        margin: '15px',
        paddingTop: '5px',
    },
});

const MonthlyCalendar = () => {
    const classes = useStyles();

    return (
        <Container>
            <CalendarContainer>
                <CalendarWrapper>
                    <Date>
                        <FloatingIcon icon={faChevronLeft} className={classes.leftArrowIcon} />

                        <Year>2019</Year>
                        <Month>12</Month>

                        <FloatingIcon icon={faChevronRight} className={classes.rightArrowIcon} />
                    </Date>
                    <Days>
                        <DayName>월</DayName>
                        <DayName>화</DayName>
                        <DayName>수</DayName>
                        <DayName>목</DayName>
                        <DayName>금</DayName>
                        <DayName>토</DayName>
                        <DayName>일</DayName>

                        <DayBlock><DayNum></DayNum></DayBlock>
                        <DayBlock><DayNum>1</DayNum></DayBlock>
                        <DayBlock><DayNum>2</DayNum></DayBlock>
                        <DayBlock><DayNum className={classes.selectedDate}>3</DayNum></DayBlock>
                        <DayBlock><DayNum>4</DayNum></DayBlock>
                        <DayBlock><DayNum>5</DayNum></DayBlock>
                        <DayBlock><DayNum>6</DayNum></DayBlock>

                        <DayBlock><DayNum>7</DayNum></DayBlock>
                        <DayBlock><DayNum>8</DayNum></DayBlock>
                        <DayBlock><DayNum>9</DayNum></DayBlock>
                        <DayBlock><DayNum>10</DayNum></DayBlock>
                        <DayBlock><DayNum>11</DayNum></DayBlock>
                        <DayBlock><DayNum className={classes.checkedDate}>12</DayNum></DayBlock>
                        <DayBlock><DayNum>13</DayNum></DayBlock>

                        <DayBlock><DayNum>14</DayNum></DayBlock>
                        <DayBlock><DayNum>15</DayNum></DayBlock>
                        <DayBlock><DayNum>16</DayNum></DayBlock>
                        <DayBlock><DayNum>17</DayNum></DayBlock>
                        <DayBlock><DayNum>18</DayNum></DayBlock>
                        <DayBlock><DayNum>19</DayNum></DayBlock>
                        <DayBlock><DayNum>20</DayNum></DayBlock>

                        <DayBlock><DayNum>21</DayNum></DayBlock>
                        <DayBlock><DayNum>22</DayNum></DayBlock>
                        <DayBlock><DayNum>23</DayNum></DayBlock>
                        <DayBlock><DayNum className={classes.checkedDate}>24</DayNum></DayBlock>
                        <DayBlock><DayNum>25</DayNum></DayBlock>
                        <DayBlock><DayNum>26</DayNum></DayBlock>
                        <DayBlock><DayNum>27</DayNum></DayBlock>

                        <DayBlock><DayNum className={classes.checkedDate}>28</DayNum></DayBlock>
                        <DayBlock><DayNum>29</DayNum></DayBlock>
                        <DayBlock><DayNum>30</DayNum></DayBlock>
                        <DayBlock><DayNum>31</DayNum></DayBlock>
                        <DayBlock><DayNum></DayNum></DayBlock>
                        <DayBlock><DayNum></DayNum></DayBlock>
                        <DayBlock><DayNum></DayNum></DayBlock>
                    </Days>
                </CalendarWrapper>
            </CalendarContainer>

            <Box
                className={classes.diaryWrapper}
                boxShadow={3}
            >
                <FloatingIcon icon={faPencilAlt} className={classes.editIcon} />
                <FloatingIcon icon={faTrashAlt} className={classes.deleteIcon} />
                <Diary height="auto" dateDisplay="none"
                       weatherPosition="static" weatherTop="10" weatherLeftAndRight={{left: '0'}} />
            </Box>
        </Container>
    );
};

const Container = styled.div`

`;

const CalendarContainer = styled.div`
    position: relative;
`;

const CalendarWrapper = styled.div`
    padding: 0 25px;
`;

const Date = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    padding: 5px 0;
`;
const Year = styled.span`
    font-size: 1.5em;
    baseline: bottom;
    margin-right: 0.5em;
`;
const Month = styled.span`
    line-height: 2.2em;
`;

const Days = styled.div`
   
`;
const DayName = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 14.27%;
    margin-bottom: 5px;
`;
const DayBlock = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 14.27%;
    padding: 5px 0;
`;
const DayNum = styled.span`
    display: inline-flex;
    width: 21px;
    justify-content: center;
    align-items: center;
`;

const FloatingIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 10px;
    
    font-size: 18px;
`;

export default MonthlyCalendar;
