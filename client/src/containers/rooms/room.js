import React, { Component } from 'react';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Plots from '../plots'
import PlotModal from '../../components/modals/plot-modal'
import Controls from '../../components/controls'
import { updateRoom } from '../../actions/roomActions'

class Room extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            selectedPlot: { }
        }

        this.handleChangeRoomProp = this.handleChangeRoomProp.bind(this)
    }

    handleChangeRoomProp(prop, val) {
        let room = this.props.room
        room[prop] = val

        this.props.updateRoom(room)
    }

    render() {
        return (
        <div>
            <Plots room={this.props.room} />
            <Controls 
                rows={this.props.room.rows}
                columns={this.props.room.columns}
                size={this.props.room.size}
                onControlChange={this.handleChangeRoomProp} />
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    rooms: state.dbStore.rooms,
    room: state.dbStore.rooms.find(r => r.name.toLowerCase() === ownProps.match.params.name),
    plots: state.dbStore.plots
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateRoom
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Room)