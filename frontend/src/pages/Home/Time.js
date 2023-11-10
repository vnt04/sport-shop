import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

function Time() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [calendarVisible, setCalendarVisible] = useState(false);

    const toggleCalendar = () => {
        setCalendarVisible(!calendarVisible);
    };

    return (
        <div>
            <div onClick={toggleCalendar}>
                <input
                    type="text"
                    value={selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}
                    readOnly
                    placeholder="Chọn ngày"
                />
            </div>
            {calendarVisible && (
                <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} inline />
            )}
        </div>
    );
}

export default Time;
