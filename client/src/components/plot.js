
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Plot = (props) => {
    const handleClick = () => {
        props.onClick(props.attrs.x, props.attrs.y);
    };

    const daysSinceDate = (date) => {
        let DAY = 1000 * 60 * 60 * 24;
        let now = new Date();

        return Math.round(Math.abs((date.getTime() - now.getTime()) / DAY));
    };

    const getDayIndicator = () => {
        if (props.attrs.flowerDt) {
            return daysSinceDate(new Date(props.attrs.flowerDt)) + 'F';
        }     

        if (props.attrs.startDt) {
            return daysSinceDate(new Date(props.attrs.startDt)) + 'V';
        }

        return null;
    };

    const getHeaderContent = () => {
        switch (props.attrs.type) {
            case 'plant':
                return (
                    <p>{props.attrs.abbr} [{getDayIndicator()}]</p>
                );
            case 'light':
            return (
                <p>{props.attrs.wattage} W</p>
            );
            default:
                return null;
        }
    };

    const getBodyContent = () => {
        switch (props.attrs.type) {
            case 'plant':
                return (
                    <p>Watered <strong>{daysSinceDate(new Date(props.attrs.lastWateredDt)) || -1}d</strong> ago</p>
                );
            case 'light':
            default:
                return null;
        }
    };

    var classes = classNames({
        'plot-plant': props.attrs.type === 'plant',
        'plot-light': props.attrs.type === 'light',
        'plot-filter': props.attrs.type === 'filter',
        'hydro': props.attrs.medium === 'hydro',
        'soil': props.attrs.medium === 'soil'
    });
    var style = {
        'height': props.size + 'px',
        'width': props.size + 'px',
        'maxHeight': props.size + 'px',
        'maxWidth': props.size + 'px',
        'minHeight': props.size + 'px',
        'minWidth': props.size + 'px'
    };

    return (
        <td className={classes} style={style} onClick={handleClick}>
            <header>
                {getHeaderContent()}
            </header>
            <section>
                {getBodyContent()}
            </section>
        </td> 
    );
};

Plot.propTypes = {
    attrs: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Plot;