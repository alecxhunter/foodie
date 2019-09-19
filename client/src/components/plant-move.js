import React, {Component} from 'react';
import classNames from 'classnames';

class PlantMove extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRoom: props.rooms[0],
            selectedPlots: props.plots.filter(p => p.room === props.rooms[0]._id)
        };

        this.createSelectOptions = this.createSelectOptions.bind(this);
        this.handleChangeRoom = this.handleChangeRoom.bind(this);
        this.handleClickPlot = this.handleClickPlot.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        var room = nextProps.rooms.find(r => r._id === this.state.selectedRoom._id);
        var plots = nextProps.plots.filter(p => p.room === room._id);

        this.setState({
            selectedRoom: room,
            selectedPlots: plots
        });
    }

    createSelectOptions() {
        let items = [];
        for (let i = 0; i < this.props.rooms.length; i++) {
            items.push(<option key={i} value={this.props.rooms[i].name}>{this.props.rooms[i].name}</option>);
        }

        return items;
    }

    handleChangeRoom(e) {
        let room = this.props.rooms.find(r => r.name === e.target.value);
        let plots = this.props.plots.filter(p => p.room === room._id);
        this.setState({
            selectedRoom: room,
            selectedPlots: plots
        });
    }

    handleClickPlot(x, y) {
        // If plot exists, we don't want to overwrite it.
        let plot = this.state.selectedPlots.find(p => p.x === x && p.y === y) || { x, y, room: this.state.selectedRoom._id };
        if (plot.hasOwnProperty('_id')) return;

        this.props.movePlot(plot);
    }

    render() {
        var self = this;
        return (
            <div>
                <select className="form-control" value={this.state.selectedRoom.name} onChange={this.handleChangeRoom}>
                    {this.createSelectOptions()}
                </select>
                <table className="table table-bordered plots">
                    <tbody>
                    {
                        Array.apply(null, {length: self.state.selectedRoom.rows}).map(function(r, y) {
                            return (
                            <tr key={y}>
                            {
                                Array.apply(null, {length: self.state.selectedRoom.columns}).map(function(c, x) {                                
                                    let plot = self.state.selectedPlots.find(p => p.x == x && p.y == y) || { x, y, room: self.state.selectedRoom._id };
                                    let classes = classNames({
                                        'plot-taken': plot.hasOwnProperty('_id')
                                    });
                                    let style = {
                                        cursor: (plot.hasOwnProperty('_id')) ? 'auto' : 'pointer'
                                    };
                                    return (
                                        <td key={x} className={classes} style={style} onClick={() => self.handleClickPlot(x, y)}>

                                        </td>
                                    );
                                })
                            }
                            </tr>);
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
};

export default PlantMove;