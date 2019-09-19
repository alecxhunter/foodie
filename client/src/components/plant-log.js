import React, {Component} from 'react';
import formatDate from '../util/format-date';

class PlantLog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actionItem: {
                action: 'water',
                amount: undefined,
                actionDt: formatDate(Date.now())
            }
        };

        this.handleChangeAction = this.handleChangeAction.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleAddAction = this.handleAddAction.bind(this);
        this.getLogContent = this.getLogContent.bind(this);
    }

    handleChangeAction(e) {
        this.setState({
            actionItem: {
                action: e.target.value,
                amount: undefined,
                actionDt: formatDate(Date.now())
            }
        });
    }
    
    handleChangeAmount(e) {
        this.setState({
            actionItem: {
                action: this.state.actionItem.action,
                amount: e.target.value,
                actionDt: formatDate(Date.now())
            }
        });
    }

    handleAddAction() {
        var actionItems = this.props.plotInfo.actionItems || [];  
        actionItems.push(this.state.actionItem);

        if (this.state.actionItem.action === 'water') {
            this.props.changePlotProp('lastWateredDt', this.state.actionItem.actionDt);
        }

        if (this.state.actionItem.action === 'harvest') {
            // change stage of life
            this.props.changePlotProp('stage', 'harvest')

            // set harvest date
            this.props.changePlotProp('harvestDt', formatDate(Date.now()))

            // remove plant from room
            this.props.changePlotProp('room', 0)
        }

        this.props.changePlotProp('actionItems', actionItems);
    }

    getLogContent() {
        if (!this.props.plotInfo.actionItems)
            return null;
        
        var self = this;

        return Array.apply(null, {length: self.props.plotInfo.actionItems.length}).map(function(cur, i) {
            var opts = { };
            //if (!self.props.plotInfo.actionItems[i].amount)
            //    opts['colSpan'] = 2;
            
            return (
                <tr key={i}>
                    <td {...opts}>{self.props.plotInfo.actionItems[i].action}</td>
                    {
                        <td>{self.props.plotInfo.actionItems[i].amount}</td>
                    }
                    <td>{formatDate(self.props.plotInfo.actionItems[i].actionDt)}</td>
                </tr>
            );
        })
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.getLogContent() }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <select className="form-control" value={this.state.actionItem.action} onChange={this.handleChangeAction}>
                                    <option value="water">Water</option>
                                    <option value="feed">Feed</option>
                                    <option value="prune">Prune</option>
                                    <option value="transplant">Transplant</option>
                                    <option value="harvest">Harvest</option>                       
                                </select>
                            </td>
                            { this.state.actionItem.action == 'feed' 
                                ? (
                                    <td>
                                        <label>
                                            <input type="text" className="form-control" value={this.state.actionItem.amount} onChange={this.handleChangeAmount} />
                                        </label>
                                    </td>
                                ) 
                                : <td></td>
                            }
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={this.handleAddAction}>
                                    Add
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>           
            </div>
        );
    }
};

export default PlantLog;