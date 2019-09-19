import React, {Component} from 'react';

const Controls = (props) => {
    const handleRowChange = (e) => {
        props.onControlChange('rows', e.target.value);
    };

    const handleColumnChange = (e) => {
        props.onControlChange('columns', e.target.value);
    };

    const handleSizeChange = (e) => {
        props.onControlChange('size', e.target.value);
    };

    return (
        <div className="controls">
            <label className="radio-inline">
                Rows <input type="number" className="form-control" min="1" max="50" value={props.rows} onChange={handleRowChange} />
            </label>
            <label className="radio-inline">
                Columns <input type="number" className="form-control" min="1" max="50" value={props.columns} onChange={handleColumnChange} />
            </label>
            <label className="radio-inline">
                Size <input type="number" className="form-control" min="20" max="100" value={props.size} onChange={handleSizeChange} />
            </label>
        </div>
    );
};

export default Controls;