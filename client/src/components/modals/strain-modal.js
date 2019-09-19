import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Modal from './modal'

class StrainModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal
                showModal={this.props.showModal}
                onClose={this.props.onClose}
                onSave={this.props.onSave}
            >
                <div>
                    <div className="form-group">
                        <label>Name
                            <input className="form-control" type="text" value={ this.props.strainInfo.name } onChange={ e => this.props.changeStrainProp('name', e.target.value) } />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Abbreviation
                            <input className="form-control" type="text" value={ this.props.strainInfo.abbr } onChange={ e => this.props.changeStrainProp('abbr', e.target.value) } />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Type
                            <select className="form-control" value={ this.props.strainInfo.type } onChange={ e => this.props.changeStrainProp('type', e.target.value) } >
                                <option value="">Select Type of Strain</option>
                                <option value="indica">Indica</option>
                                <option value="sativa">Sativa</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Flowering Time
                            <input className="form-control" type="text" value={ this.props.strainInfo.flowerTime } onChange={ e => this.props.changeStrainProp('flowerTime', e.target.value) } />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Phenotype Number
                            <input className="form-control" type="number" value={ this.props.strainInfo.phenoNum } onChange={ e => this.props.changeStrainProp('phenoNum', e.target.value) } />
                        </label>
                    </div>
                </div>
            </Modal>
        )
    }
}

StrainModal.propTypes = {
    showModal: PropTypes.bool,
    strainInfo: PropTypes.object,
    onClose: PropTypes.func,
    onSave: PropTypes.func
}

export default StrainModal