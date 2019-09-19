import React, { Component } from 'react'
import { Route, NavLink, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { connect} from 'react-redux'
import classNames from 'classnames'
import { addStrain, updateStrain, saveStrain } from '../../actions/strainActions'
import StrainModal from '../../components/modals/strain-modal'
import Log from '../../util/log'
import Carousel from '../../components/carousel/carousel'
import { StrainTypes } from '../../constants'

const defaultStrain = {
    name: '',
    abbr: '',
    type: '',
    flowerTime: '',
    phenoNum: ''
}

class Strains extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            selectedStrain: defaultStrain
        }

        this.handleShowModal = this.handleShowModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.saveStrain = this.saveStrain.bind(this)
        this.changeStrainProp = this.changeStrainProp.bind(this)
    }

    handleShowModal(strain) {
        this.setState({
            showModal: true,
            selectedStrain: strain || defaultStrain
        })
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    saveStrain() {
        if (this.state.selectedStrain.hasOwnProperty('_id')) {
            this.props.saveStrain(this.state.selectedStrain)
        } else {
            this.props.addStrain(this.state.selectedStrain)
        }

        this.closeModal()
    }

    changeStrainProp(prop, val) {
        Log.debug('Changing [', prop, '] to (', val, ')')
        let strain = Object.assign({}, this.state.selectedStrain)
        strain[prop] = val

        if (strain.hasOwnProperty('_id')) this.props.updateStrain(strain)

        this.setState({ selectedStrain: strain })
    }

    renderStrainSlide(strain) {
        return (
            <div key={ strain._id } className="strain-slide">
                <header>
                    <h5>{ strain.name }</h5>
                    <h6>({ strain.abbr })</h6>
                </header>
                <article>
                    <p>{ strain.type }</p>
                    <p>{ strain.flowerTime }</p>
                    <p>#{ strain.phenoNum }</p>
                </article>
            </div>
        )
    }

    render() {
        let getReadableStrainType = type => StrainTypes.find(s => s.value === type).name

        return (
            <div>
                <div className="dashboard">
                    { this.props.strains.map((strain, idx) => 
                        <div key={idx} className="strain-item dashboard-item" onClick={ () => this.handleShowModal(strain) }>
                            <header>
                                <h5>{ strain.name}</h5>
                                <h6 className="small">{ getReadableStrainType(strain.type) }</h6>
                            </header>
                            <article>
                                <p>Flowering Time: { strain.flowerTime }</p>
                            </article>
                        </div>
                    )}
                    <div className="add-strain-item  align-self-center" onClick={ () => this.handleShowModal() }>
                        <i className="fa fa-5x fa-plus"></i>
                    </div>
                </div>
                <StrainModal
                    showModal={ this.state.showModal }
                    strainInfo={ this.state.selectedStrain }
                    onClose={ this.closeModal }
                    onSave={ this.saveStrain }
                    changeStrainProp={ this.changeStrainProp }
                />
                {/* <Carousel data={ this.props.strains } renderSlide={ this.renderStrainSlide } /> */}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    strains: state.dbStore.strains
})
  
const mapDispatchToProps = dispatch => bindActionCreators({
    addStrain, updateStrain, saveStrain
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Strains)