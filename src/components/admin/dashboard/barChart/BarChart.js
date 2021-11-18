import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useDispatch, useSelector } from "react-redux";
import { createBarChart, updateBarChart } from './utils';

export const BarChart = () => {

    const ref = useRef();
    const firstUpdate = useRef(true);
    const { percentages, earnings, mode } = useSelector(state => state.barChart);
    const dispatch = useDispatch();


    useEffect(
        () => {
            if (firstUpdate.current)
            {
                firstUpdate.current = false;
                if (mode === "percentages")
                {
                    createBarChart(d3.select(ref.current), percentages);
                }
                else
                {
                    createBarChart(d3.select(ref.current), earnings);
                }
            }
            else
            {
                if (mode === "percentages")
                {
                    updateBarChart(d3.select(ref.current), percentages);
                }
                else
                {
                    updateBarChart(d3.select(ref.current), earnings);
                }
            }
        },
        [percentages, dispatch, mode, earnings]
    );

    return (
        <div>
            <svg ref={ref} style={{color:'black'}}></svg>
        </div>
    );
}
