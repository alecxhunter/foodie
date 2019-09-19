import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Plot from '../../components/plot'
import PlotModal from '../../components/modals/plot-modal'
import { updatePlot, savePlot, addPlot } from '../../actions/plotActions'
import Log from '../../util/log'
import {debug} from '../../util/log'

class Plots extends Component {
  constructor(props) {
    super(props)

    this.state = {
        showModal: false,
        selectedPlot: { }
    }

    this.handleClickPlot = this.handleClickPlot.bind(this)
    this.handleClosePlot = this.handleClosePlot.bind(this)
    this.handleSavePlot = this.handleSavePlot.bind(this)
    this.handleMovePlot = this.handleMovePlot.bind(this)
    this.handleChangePlotProp = this.handleChangePlotProp.bind(this)
  }

  handleClickPlot(plot) {
    Log.debug('Clicked plot: ', plot)

    this.setState({
        showModal: true,
        selectedPlot: plot
    })
  }

  handleClosePlot() {
    this.setState({
        showModal: false
    })
  }

  handleSavePlot() {
    if (this.state.selectedPlot.hasOwnProperty('_id')) {
        this.props.savePlot(this.state.selectedPlot)
    } else {
        this.props.addPlot(this.state.selectedPlot)
    }

    this.handleClosePlot()
  }

  handleChangePlotProp(prop, val) {
    Log.debug('Changing [', prop, '] to (', val, ')');

    let plot = this.state.selectedPlot
    plot[prop] = val

    this.props.updatePlot(plot)

    if (prop == 'actionItems' && val[val.length - 1].action == 'harvest')
        this.handleSavePlot();
  }

  handleMovePlot(destinationPlot) {    
    let plot = Object.assign({}, this.state.selectedPlot)
    plot.x = destinationPlot.x
    plot.y = destinationPlot.y
    plot.room = destinationPlot.room
    this.setState({
        selectedPlot: plot
    })

    this.props.updatePlot(plot)
    this.props.savePlot(plot)
  }

  render() {
    let self = this
    return (
    <div className="table-responsive">
        <table className="table table-bordered plots">
            <tbody>
            {
                Array.apply(null, {length: self.props.room.rows}).map(function(r, y) {
                    return (
                    <tr key={y}>
                    {
                        Array.apply(null, {length: self.props.room.columns}).map(function(c, x) {
                            let plot = self.props.plots.find(p => p.x === x && p.y === y && p.room === self.props.room._id) || { x, y, room: self.props.room._id, type: '' }
                            
                            return (
                                <Plot key={x} size={self.props.room.size} attrs={plot} onClick={() => self.handleClickPlot(plot)} />
                            );
                        })
                    }
                    </tr>);
                })
            }
            </tbody>
        </table>
        <PlotModal
          rooms={this.props.rooms}
          plots={this.props.plots}
          showModal={this.state.showModal} 
          plotInfo={this.state.selectedPlot} 
          onClose={this.handleClosePlot}
          onSave={this.handleSavePlot}
          changePlotProp={this.handleChangePlotProp}
          movePlot={this.handleMovePlot} />
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  plots: state.dbStore.plots,
  rooms: state.dbStore.rooms
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updatePlot,
  savePlot,
  addPlot
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Plots)