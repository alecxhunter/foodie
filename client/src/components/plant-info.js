import React, {Component} from 'react';
import formatDate from '../util/format-date';

class PlantInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: props.plotInfo.strain ? false : true,
            confirmDelete: false
        }

        this.handleChangeStage = this.handleChangeStage.bind(this);
        this.handleChangeStrain = this.handleChangeStrain.bind(this);
        this.handleChangeAbbr = this.handleChangeAbbr.bind(this);
        this.handleChangeMedium = this.handleChangeMedium.bind(this);
        this.handleChangeStartDt = this.handleChangeStartDt.bind(this);
        this.handleChangeFlowerDt = this.handleChangeFlowerDt.bind(this);
        this.handleChangeWateredDt = this.handleChangeWateredDt.bind(this);
        this.getEditContent = this.getEditContent.bind(this);
        this.handleToggleEditMode = this.handleToggleEditMode.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.plotInfo._id != nextProps.plotInfo._id) {
            this.setState({
                edit: nextProps.plotInfo.strain ? false : true
            })
        }
    }

    handleChangeStage(e) {
        this.props.changePlotProp('stage', e.target.value)
    }

    handleChangeStrain(e) {
        this.props.changePlotProp('strain', e.target.value)
    }

    handleChangeAbbr(e) {
        this.props.changePlotProp( 'abbr', e.target.value)
    }

    handleChangeMedium(e) {
        this.props.changePlotProp('medium', e.target.value)
    }

    handleChangeStartDt(e) {
        this.props.changePlotProp('startDt', e.target.value)
    }
    
    handleChangeFlowerDt(e) {
        this.props.changePlotProp('flowerDt', e.target.value)
    }
    
    handleChangeWateredDt(e) {
        this.props.changePlotProp('lastWateredDt', e.target.value)
    }

    handleToggleEditMode() {
        let newMode = !this.state.edit;
        this.setState({
            edit: newMode
        })
    }

    handleClickDelete() {
        if (this.state.confirmDelete) {
            // Delete this plot
            this.props.deletePlot(this.props.plotInfo)
            this.props.closeModal()
        } else {
            this.setState({
                confirmDelete: true
            })

            // Reset the button after 3 seconds
            setTimeout(() => {
                this.setState({
                    confirmDelete: false
                })
            }, 3000)
        }
    }

    getEditContent() {
        return (
            <div>
                <div className="pull-right">
                    <button className="btn btn-danger btn-sm" onClick={this.handleClickDelete}>
                        { !this.state.confirmDelete ? <i className="fa fa-trash" aria-hidden="true"></i> : <span style={{fontSize: '12px'}}>Are you sure?</span> }
                    </button>
                    <span style={{marginRight: '8px'}}></span>
                    <button className="btn btn-primary btn-sm" onClick={this.handleToggleEditMode}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                    </button>
                </div>
                <p>
                    <label>Strain
                        <input type="text" className="form-control" placeholder="Strain Name" value={this.props.plotInfo.strain || ''} onChange={this.handleChangeStrain} />
                    </label>
                </p>
                <p>
                    <label>Abbreviation
                        <input type="text" className="form-control" placeholder="Abbreviation" value={this.props.plotInfo.abbr || ''} onChange={this.handleChangeAbbr} />
                    </label>
                </p>
                <p>
                    <label>Stage of Life
                        <select className="form-control" value={this.props.plotInfo.stage || ''} onChange={this.handleChangeStage}>
                            <option value="">Select Stage of Life</option>
                            <option value="clone">Clone</option>
                            <option value="veg">Veg</option>
                            <option value="flower">Flower</option>
                            <option value="harvest">Harvest</option>
                            <option value="trim">Trim</option>
                        </select>
                    </label>
                </p>
                <p>
                    <label>Medium
                        <select className="form-control" value={this.props.plotInfo.medium || ''} onChange={this.handleChangeMedium}>
                            <option value="">Choose the Medium</option>
                            <option value="hydro">Hydroponic</option>
                            <option value="soil">Soil</option>
                        </select>
                    </label>
                </p>
                <p>
                    <label>Start Date
                        <input type="date" className="form-control" value={formatDate(this.props.plotInfo.startDt)} onChange={this.handleChangeStartDt} />
                    </label>
                </p>
                <p>
                    <label>Flower Date
                        <input type="date" className="form-control" value={formatDate(this.props.plotInfo.flowerDt)} onChange={this.handleChangeFlowerDt} />
                    </label>
                </p>
                <p>
                    <label>Last Watered
                        <input type="date" className="form-control" value={formatDate(this.props.plotInfo.lastWateredDt)} onChange={this.handleChangeWateredDt} />
                    </label>
                </p>
            </div>
        );
    }

    getDisplayContent() {
        const capFirst = (str) => {
            if (!str) return null;
            return str.charAt(0).toUpperCase() + str.slice(1);
        };

        return (
            <div className="plant-info">
                <button className="btn btn-primary btn-sm pull-right" onClick={this.handleToggleEditMode}>
                    Edit
                </button>
                <ul className="inline list-unstyled">
                    <li>
                        <strong>Strain</strong>
                        <p>{ this.props.plotInfo.strain || 'N/A'}</p>
                    </li>
                    <li>
                        <strong>Medium</strong>
                        <p>{ capFirst(this.props.plotInfo.medium) || 'N/A' }</p>
                    </li>
                    <li>
                        <strong>Stage of Life</strong>
                        <p>{ capFirst(this.props.plotInfo.stage) || 'N/A' }</p>
                    </li>
                </ul>
                <ul className="inline list-unstyled">
                    <li>
                        <strong>Start Date</strong>
                        <p>{ formatDate(this.props.plotInfo.startDt) || 'N/A' }</p>
                    </li>
                    <li>
                        <strong>Flower Date</strong>
                        <p>{ formatDate(this.props.plotInfo.flowerDt) || 'N/A' }</p>
                    </li>
                    <li>
                        <strong>Last Watered</strong>
                        <p>{ formatDate(this.props.plotInfo.lastWateredDt) || 'N/A' }</p>
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        let content = this.state.edit ? this.getEditContent() :this.getDisplayContent();
        return content;
    }
};

export default PlantInfo;