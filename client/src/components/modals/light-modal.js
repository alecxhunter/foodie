import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../util/format-date';

const LightModal = (props) => {
    const handleChangeLightType = (e) => {
        props.changePlotProp('lightType', e.target.value);
    };

    const handleChangeWattage = (e) => {
        props.changePlotProp('wattage', e.target.value);
    };

    const handleChangeStartDt = (e) => {
        props.changePlotProp('startDt', e.target.value);
    };

    return (
        <div>
            <label>Wattage (W)
                <input type="number" className="form-control" value={props.plotInfo.wattage} onChange={handleChangeWattage} />
            </label>
            <label>Light Type
                <select className="form-control" value={props.plotInfo.lightType} onChange={handleChangeLightType}>
                    <option value="">Choose the Type of Light</option>
                    <option value="led">LED</option>
                    <option value="hps">HPS</option>
                    <option value="mh">MH</option>
                </select>
            </label>
            <label>Start Date
                <input type="date" className="form-control" value={formatDate(props.plotInfo.startDt)} onChange={handleChangeStartDt} />
            </label>
        </div>
    );
};

LightModal.propTypes = {
    plotInfo: PropTypes.object,
    changePlotProp: PropTypes.func
};

export default LightModal;