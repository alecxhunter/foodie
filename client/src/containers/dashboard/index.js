import React, { Component } from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updatePlot, savePlot, deletePlot } from '../../actions/plotActions'
import RoomDashboard from '../../components/room-dashboard'
import HarvestModal from '../../components/modals/harvest-modal'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRoom: props.rooms[0] || { },
      selectedTab: 'Plants',
      showHarvestModal: false,
      harvestedPlot: { }
    }

    this.tabs = ['Plants', 'Details']

    this.createSelectOptions = this.createSelectOptions.bind(this)
    this.handleChangeRoom = this.handleChangeRoom.bind(this)
    this.handleChangeTab = this.handleChangeTab.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.selectedRoom.hasOwnProperty('_id') && nextProps.rooms.length > 0) {
      this.setState({
        selectedRoom: nextProps.rooms[0]
      })
    }
  }

  createSelectOptions = () => {
    let items = [];
    for (let i = 0; i < this.props.rooms.length; i++) {
        items.push(<option key={i} value={this.props.rooms[i].name}>{this.props.rooms[i].name}</option>);
    }
  
    return items;
  }

  handleChangeRoom(room) {
    this.setState({
      selectedRoom: room
    })
  }

  handleChangeTab(tab) {
    this.setState({
      selectedTab: tab
    })
  }

  daysSinceDate(date) {
    let DAY = 1000 * 60 * 60 * 24;
    let now = new Date();

    return Math.round(Math.abs((date.getTime() - now.getTime()) / DAY));
  }

  getDayIndicator(plot) {
      if (plot.flowerDt) {
          return this.daysSinceDate(new Date(plot.flowerDt)) + 'F';
      }     

      if (plot.startDt) {
          return this.daysSinceDate(new Date(plot.startDt)) + 'V';
      }

      return null;
  }

  render() {
    return (
      <div>
        <h3>Rooms</h3>
        <div className="dashboard-filters">
          <ul className="nav nav-pills">
            {this.props.rooms.map((room, idx) => {
              let classes = classNames({ 'nav-link': true, 'active': this.state.selectedRoom._id === room._id })
              return <li className="nav-item" key={idx}>
                      <a href="#" className={classes} onClick={() => this.handleChangeRoom(room)}>{room.name}</a>
                    </li>
            })}      
          </ul>
          <ul className="nav nav-pills">
            {this.tabs.map((tab, idx) => {
              let classes = classNames({ 'nav-link': true, 'active': this.state.selectedTab === tab})
              return <li className="nav-item" key={idx}>
                      <a href="#" className={classes} onClick={() => this.handleChangeTab(tab)}>{tab}</a>
                    </li>
            })}
          </ul>
        </div>
        <RoomDashboard
          allRooms={this.props.rooms}
          allPlots={this.props.plots}
          room={this.state.selectedRoom}
          tab={this.state.selectedTab}
          plots={this.props.plots.filter(p => p.room === this.state.selectedRoom._id)}
          updatePlot={this.props.updatePlot}
          savePlot={this.props.savePlot}
          deletePlot={this.props.deletePlot} />
        <hr/>
        <h3>Harvested</h3>
        <div className="dashboard">
            {
              this.props.plots.filter(p => p.stage === 'harvest').map((plot, idx) => {
                return (
                  <div key={idx} className="dashboard-item" onClick={ () => this.setState({ showHarvestModal: true, harvestedPlot: plot }) }>
                    <header>{plot.strain} <span>[{this.getDayIndicator(plot)}]</span></header>
                    <img className="img-responsive" src="http://via.placeholder.com/100x100" />
                  </div>
                )
              })
            }
            <HarvestModal
              showModal={this.state.showHarvestModal}
              plotInfo={this.state.harvestedPlot}
              onClose={ () => this.setState({ showHarvestModal: false }) }
              plotActions={ { update: this.props.updatePlot, save: this.props.savePlot } }
              />
        </div>
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
  deletePlot
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)