import * as types from './actionTypes'
import plotsApi from '../api/plotsApi'

export const loadPlots = () => {
    return dispatch => {
        return plotsApi.getAllPlots().then(plots => {
            dispatch({
                type: types.LOAD_PLOTS_SUCCESS,
                plots
            })
        })
    }
}

export const addPlot = plot => {
    return dispatch => {
        return plotsApi.createPlot(plot).then(plotResponse => {
            dispatch({
                type: types.ADD_PLOT,
                plot: plotResponse
            })
        })
    }
}

export const updatePlot = plot => {
    return dispatch => {
        dispatch({
            type: types.UPDATE_PLOT,
            plot
        })
    }
}

export const savePlot = plot => {
    return dispatch => {
        return plotsApi.updatePlot(plot).then(plotResponse => {
            dispatch({
                type: types.SAVE_PLOT,
                plot: plotResponse
            })
        })
    }
}

export const deletePlot = plot => {
    return dispatch => {
        return plotsApi.deletePlot(plot).then(plotResponse => {
            dispatch({
                type: types.DELETE_PLOT,
                plot: plotResponse
            })
        })
    }
}