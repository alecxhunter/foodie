import React, { Component } from 'react'
import PlotModal from '../modals/plot-modal'
import Log from '../../util/log'

class RoomDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            selectedPlot: {}
        }

        this.handleClosePlot = this.handleClosePlot.bind(this)
        this.handleSavePlot = this.handleSavePlot.bind(this)
        this.handleChangePlotProp = this.handleChangePlotProp.bind(this)
        this.handleClickPlot = this.handleClickPlot.bind(this)
        this.handleMovePlot = this.handleMovePlot.bind(this)
    }

    handleClosePlot() {
        this.setState({
            showModal: false
        })
    }

    handleSavePlot() {
        Log.debug('Saving plot...', this.state.selectedPlot)
        this.props.savePlot(this.state.selectedPlot)

        this.handleClosePlot()
    }

    handleChangePlotProp(prop, val) {
        Log.debug('Changing [', prop, '] from (', this.state.selectedPlot[prop], ') to (', val, ')');

        let plot = this.state.selectedPlot
        plot[prop] = val

        this.props.updatePlot(plot)
    }

    handleMovePlot(destinationPlot) {
        let plot = Object.assign({}, this.state.selectedPlot)
        Log.debug('Moving plot from (', plot.x, ', ', plot.y, ') to (', destinationPlot.x, ', ', destinationPlot.y, ')')
        if (plot.room !== destinationPlot.room) {
            let currentRoom = this.props.allRooms.find(room => room._id === plot.room)
            let destinationRoom = this.props.allRooms.find(room => room._id === destinationPlot.room)
            Log.debug('   Moving from ', currentRoom._id, ' (', currentRoom.name, ') room to ', destinationRoom._id, ' (', destinationRoom.name, ') room')
        }

        plot.x = destinationPlot.x
        plot.y = destinationPlot.y
        plot.room = destinationPlot.room
        this.setState({
            selectedPlot: plot
        })

        this.props.updatePlot(plot)
    }

    handleClickPlot(plot) {
        this.setState({
            selectedPlot: plot,
            showModal: true
        })
    }

    daysSinceDate(date, plot) {
        plot = plot || {}
        let DAY = 1000 * 60 * 60 * 24;
        let now = plot.harvestDt ? new Date(plot.harvestDt) : new Date();

        return Math.round(Math.abs((date.getTime() - now.getTime()) / DAY));
    }

    getDayIndicator(plot) {
        if (plot.flowerDt) {
            return this.daysSinceDate(new Date(plot.flowerDt), plot) + 'F';
        }

        if (plot.startDt) {
            return this.daysSinceDate(new Date(plot.startDt)) + 'V';
        }

        return null;
    }

    render() {
        return (
            <div className="room-dashboard">
                <div className="dashboard">
                    {this.props.tab.toLowerCase() === 'plants'
                        ? this.props.plots.filter(plot => plot.type === 'plant').map((plot, idx) => (
                            <div key={idx} className="dashboard-item" onClick={() => this.handleClickPlot(plot)}>
                                <header>{plot.strain} <span className="pull-right">[{this.getDayIndicator(plot)}]</span></header>
                                <article>
                                    <img className="img-responsive" src="http://via.placeholder.com/100x100" />
                                </article>
                            </div>
                        )) :
                        <div>
                            <p><strong>Name:</strong> {this.props.room.name}</p>
                            <p><strong>Rows:</strong> {this.props.room.rows}</p>
                            <p><strong>Columns:</strong> {this.props.room.columns}</p>
                            <p><strong>Plants:</strong> {this.props.plots.filter(plot => plot.type === 'plant').length}</p>
                            <p><strong>Lights:</strong> {this.props.plots.filter(plot => plot.type === 'light').length}</p>
                        </div>
                    }
                </div>
                <PlotModal
                    rooms={this.props.allRooms}
                    plots={this.props.allPlots}
                    showModal={this.state.showModal}
                    plotInfo={this.state.selectedPlot}
                    onClose={this.handleClosePlot}
                    onSave={this.handleSavePlot}
                    changePlotProp={this.handleChangePlotProp}
                    movePlot={this.handleMovePlot}
                    deletePlot={this.props.deletePlot} />
            </div>
        )
    }
}

export default RoomDashboard