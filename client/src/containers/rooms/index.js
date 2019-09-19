import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { connect} from 'react-redux'
import classNames from 'classnames'
import { addRoom } from '../../actions/roomActions'
import NewRoomModal from '../../components/modals/new-room-modal'
import Room from './room'

const defaultRoom = {
  name: '',
  rows: 10,
  columns: 8,
  size: 60
}

class Rooms extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      newRoom: defaultRoom
    }

    this.handleClickNewRoom = this.handleClickNewRoom.bind(this)
    this.handleCloseNewRoom = this.handleCloseNewRoom.bind(this)
    this.handleSaveNewRoom = this.handleSaveNewRoom.bind(this)
    this.handleChangeNewRoomProp = this.handleChangeNewRoomProp.bind(this)
  }

  componentWillMount() {
    if (this.props.rooms.length > 0) {
      //this.props.changeRoom(this.props.rooms[0]._id)
      this.props.history.push('/rooms/' + this.props.rooms[0].name.toLowerCase())
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === '/rooms' && this.props.rooms.length > 0) {
      //this.props.changeRoom(this.props.rooms[0]._id)
      this.props.history.push('/rooms/' + this.props.rooms[0].name.toLowerCase())
    }
  }

  handleChangeNewRoomProp(prop, val) {
    let room = this.state.newRoom
    room[prop] = val
    this.setState({
      newRoom: room
    })
  }

  handleSaveNewRoom() {
    this.props.addRoom(this.state.newRoom)

    this.setState({
      showModal: false,
      newRoom: defaultRoom
    })
  }

  handleClickNewRoom() {
    this.setState({
      showModal: true
    })
  }

  handleCloseNewRoom() {
    this.setState({
      showModal: false
    })
  }

  render() {
    return (
      <div className="rooms">
        <ul className="nav nav-pills">
            {
              this.props.rooms.map(room => 
                  <li key={room._id} className="nav-item">
                    <NavLink to={'/rooms/' + room.name.toLowerCase()} activeClassName="active" className="nav-link">{room.name}</NavLink>
                  </li>
              )
            }
            <li className="nav-item">
                <a className="nav-link no-bg" href="#" style={{'borderColor': 'transparent'}} onClick={this.handleClickNewRoom}>
                    <i className="fa fa-plus"></i>
                </a>
            </li>
        </ul>
        <Route exact path="/rooms/:name" component={Room} />
        <NewRoomModal 
          showModal={this.state.showModal}
          onClose={this.handleCloseNewRoom}
          onSave={this.handleSaveNewRoom}
          changeNewRoomProp={this.handleChangeNewRoomProp}
          newRoom={this.state.newRoom} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  rooms: state.dbStore.rooms
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addRoom
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)