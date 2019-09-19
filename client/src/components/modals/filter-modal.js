import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../util/format-date';

const FilterModal = (props) => {
    const handleChangeDiameter = (e) => {
        props.changePlotProp({x: props.plotInfo.x, y: props.plotInfo.y}, 'diameter', e.target.value);
    };

    const handleChangeStartDt = (e) => {
        props.changePlotProp({x: props.plotInfo.x, y: props.plotInfo.y}, 'startDt', e.target.value);
    };

    return (
        <div>
            <label>Diameter (inches)
                <input type="number" className="form-control" value={props.plotInfo.diameter} onChange={handleChangeDiameter} />
            </label>
            <label>Start Date
                <input type="date" className="form-control" value={formatDate(props.plotInfo.startDt)} onChange={handleChangeStartDt} />
            </label>
        </div>
    );
};

FilterModal.propTypes = {
    plotInfo: PropTypes.object,
    changePlotProp: PropTypes.func
};

export default FilterModal;