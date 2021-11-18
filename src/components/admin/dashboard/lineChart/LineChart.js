import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSelector } from "react-redux";
import { createLineChart, updateLineChart } from './utils';
import PropTypes from 'prop-types';

export const LineChart = ({ mode }) => {
  
    const ref = useRef();
    const firstUpdate = useRef(true);
    const { data, colorsAvailable } = useSelector(state => state.lineChart[mode]);


    useEffect(
        () => {
            if (firstUpdate.current)
            {
                firstUpdate.current = false;
                createLineChart(d3.select(ref.current), colorsAvailable);
            }
            else
            {
                updateLineChart(d3.select(ref.current), data);
            }
        },
        [data, colorsAvailable]
    );

    return (
        <div>
            <svg
                ref={ref}
            >
                <g className="plot-container" style={{color:'black'}}/>
                <g className="x-axis-container" style={{color:'black'}}/>
                <g className="y-axis-container" style={{color:'black'}}/>
            </svg>
        </div>
    );
}

LineChart.propTypes = {
    mode: PropTypes.oneOf(['stock', 'quantity'])
};