import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';
import PlantModal from './plant-modal';
import LightModal from './light-modal';
import FilterModal from './filter-modal';

const PlotModal = (props) => {
    const handleChangePlotType = (e) => {
        props.changePlotProp('type', e.target.value);
    };

    const getModalContent = () => {
        switch (props.plotInfo.type) {
            case 'plant':
                return (
                    <PlantModal
                        plotInfo={props.plotInfo}
                        changePlotProp={props.changePlotProp}
                        movePlot={props.movePlot}
                        rooms={props.rooms}
                        plots={props.plots}
                        deletePlot={props.deletePlot}
                        closeModal={props.onClose} />
                );
            case 'light':
                return (
                    <LightModal
                        plotInfo={props.plotInfo}
                        changePlotProp={props.changePlotProp} />
                );
            case 'filter':
                return (
                    <FilterModal
                        plotInfo={props.plotInfo}
                        changePlotProp={props.changePlotProp} />
                );
            default:
                return (
                    <div>
                        <h3>New Plot</h3>
                        <label>Type of Plot
                            <select className="form-control" value={props.plotInfo.type} onChange={handleChangePlotType}>
                                <option value="">Choose Type of Plot</option>
                                <option value="plant">Plant</option>
                                <option value="light">Light</option>
                                <option value="filter">Filter</option>
                            </select>
                        </label>
                    </div>
                    );
        }
    };

    return (
        <Modal 
            showModal={props.showModal} 
            onClose={props.onClose}
            onSave={props.onSave} >
            {getModalContent()}
        </Modal>
    );
};

PlotModal.propTypes = {
    showModal: PropTypes.bool,
    plotInfo: PropTypes.object,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
    deletePlot: PropTypes.func
};

export default PlotModal;