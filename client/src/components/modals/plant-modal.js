import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PlantInfo from '../plant-info';
import PlantLog from '../plant-log';
import PlantMove from '../plant-move';

class PlantModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'info'
        };

        this.getTabContent = this.getTabContent.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.plotInfo._id != nextProps.plotInfo._id) {
            this.setState({
                selectedTab: 'info'
            });
        }
    }

    handleChangeTab(newTab) {
        this.setState({
            selectedTab: newTab
        });
    }

    getTabContent() {
        switch(this.state.selectedTab.toLowerCase()) {
            case 'info':
                return (
                    <PlantInfo plotInfo={this.props.plotInfo} changePlotProp={this.props.changePlotProp} deletePlot={this.props.deletePlot} closeModal={this.props.closeModal} />
                );
            case 'log':
                return (
                    <PlantLog plotInfo={this.props.plotInfo} changePlotProp={this.props.changePlotProp} />
                );
            case 'move':
                return (
                    <PlantMove plotInfo={this.props.plotInfo} changePlotProp={this.props.changePlotProp} movePlot={this.props.movePlot} rooms={this.props.rooms} plots={this.props.plots} />
                );
        }
        
    }

    render() {
        let tabs = ['Info', 'Move', 'Log'];
        let self = this;
        return (
            <div className="plant-modal">
                <ul className="nav nav-tabs">
                    {
                        tabs.map((tab, idx) => {
                            let classes = classNames({
                                'nav-link': true,
                                'active': self.state.selectedTab.toLowerCase() === tab.toLowerCase()
                            });
                            return (
                                <li key={idx} className="nav-item">
                                    <a className={classes} href="#" onClick={() => self.handleChangeTab(tab)}>{tab}</a>
                                </li>
                            );
                        })
                    }
                </ul>
                {this.getTabContent()}
            </div>
        );
    }
};

PlantModal.propTypes = {
    plotInfo: PropTypes.object,
    changePlotProp: PropTypes.func,
    deletePlot: PropTypes.func
};

export default PlantModal;