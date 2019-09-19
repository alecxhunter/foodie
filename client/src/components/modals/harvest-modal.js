import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Modal from './modal'
import formatDate from '../../util/format-date'

class HarvestModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            grams: 0
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.plotInfo._id !== this.props.plotInfo._id) {
            this.setState({ grams: 0})
        }
    }
    
    dateDiff = (d1, d2) => {
        d1 = new Date(d1), d2 = d2 ? new Date(d2) : new Date()
        return Math.round((d2 - d1) / (1000*60*60*24))
    }

    shortDate = (date) => {
        let d = new Date(date), pad = (s) => s < 10 ? '0' + s : s
        return date ? pad(d.getMonth()+1) + '/' + pad(d.getDate()) + '/' + d.getFullYear().toString().slice(-2) : 'N/A'
    }

    handleSubmit = () => {
        let plot = Object.assign({}, this.props.plotInfo)
        plot.actionItems.push({ action: 'trim', amount: this.state.grams, actionDt: formatDate(Date.now()) })
        plot.stage = 'trim'
        this.props.plotActions.update(plot)
        this.props.plotActions.save(plot)
        this.props.onClose()
    }

    render = () => {
        return (
            <Modal 
                showModal={this.props.showModal} 
                onClose={this.props.onClose}
                onSave={this.props.onSave} >
                <div style={ { marginBottom: '16px' } }>
                    <h3 className="text-center">{ this.props.plotInfo.strain }</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Stage</th>
                                <th>Date</th>
                                <th>Days</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Veg</td>
                                <td>{ this.shortDate(this.props.plotInfo.startDt) }</td>
                                <td>{ this.dateDiff(this.props.plotInfo.startDt, this.props.plotInfo.flowerDt) }</td>
                            </tr>
                            <tr>
                                <td>Flower</td>
                                <td>{ this.shortDate(this.props.plotInfo.flowerDt) }</td>
                                <td>{ this.dateDiff(this.props.plotInfo.flowerDt, this.props.plotInfo.harvestDt) }</td>
                            </tr>
                            <tr>
                                <td>Harvest</td>
                                <td>{ this.shortDate(this.props.plotInfo.harvestDt) }</td>
                                <td>{ this.dateDiff(this.props.plotInfo.harvestDt) }</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-6 col-sm-4">
                            <div className="input-group">
                                <input className="form-control" type="number" value={ this.state.grams } onChange={e => this.setState({ grams: e.target.value }) } />
                                <div className="input-group-append">
                                    <span className="input-group-text">grams</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-4">
                            <button className="btn btn-sm btn-primary inline" type="button" onClick={ this.handleSubmit }>Submit</button>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

HarvestModal.propTypes = {
    showModal: PropTypes.bool,
    plotInfo: PropTypes.object,
    plotActions: PropTypes.object,
    onClose: PropTypes.func,
    onSave: PropTypes.func
}

export default HarvestModal