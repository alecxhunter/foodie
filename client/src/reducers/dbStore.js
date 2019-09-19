import * as types from '../actions/actionTypes'

const initialState = {
  rooms: [],
  plots: [],
  strains: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.rooms
      }
    case types.ADD_ROOM:
      let rooms = state.rooms.slice()
      rooms.push(action.room)
      return {
        ...state,
        rooms
      }
    case types.UPDATE_ROOM:
      return {
        ...state,
        rooms: state.rooms.map(room => room._id === action.room._id ? action.room : room)
      }
    case types.LOAD_PLOTS_SUCCESS:
      return {
        ...state,
        plots: action.plots
      }
    case types.ADD_PLOT:
      let plots = state.plots.slice()
      plots.push(action.plot)
      return {
        ...state,
        plots
      }
    case types.UPDATE_PLOT:
      return {
        ...state,
        plots: state.plots.map(plot => plot._id === action.plot._id ? action.plot : plot)
      }
    case types.DELETE_PLOT:
      let idx = state.plots.findIndex(p => p._id === action.plot._id)
      let plotsD = state.plots.slice() // Make a copy
      plotsD.splice(idx, 1) // Remove plot
      return {
        ...state,
        plots: plotsD
      }
    case types.LOAD_STRAINS_SUCCESS:
      return {
        ...state,
        strains: action.strains
      }
    case types.ADD_STRAIN:
      let strains = state.strains.slice()
      strains.push(action.strain)  
      return {
        ...state,
        strains
      }
    case types.UPDATE_STRAIN:
      return {
        ...state,
        strains: state.strains.map(strain => strain._id === action.strain._id ? action.strain : strain)
      }
    default:
      return state
  }
}