import DatePicker, { registerLocale } from "react-datepicker";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { Col, Row } from 'react-bootstrap';
import es from "date-fns/locale/es";
import { formatDate } from "../../../helpers/formatDate";

registerLocale("es", es);


export const DateRange = React.memo(({ startLoadAction }) => {

    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState(new Date("2021/01/01"));
    const [endDate, setEndDate] = useState(new Date());

    if(startDate <= endDate)
    {
        dispatch(startLoadAction(formatDate(startDate), formatDate(endDate)));
    }

    return (
        <Row>
            <Col>
                <label className="px-3" style={{color:'black'}}>Fecha inicial</label>
                <DatePicker 
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    locale="es"
                />
            </Col>
            <Col>
                <label className="px-3" style={{color:'black'}}>Fecha final</label>
                <DatePicker 
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="dd/MM/yyyy"
                    locale="es"
                />
            </Col>
        </Row>
    )
});
