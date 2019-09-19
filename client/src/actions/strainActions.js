import * as types from './actionTypes'
import strainsApi from '../api/strainsApi'

export const loadStrains = () => {
    return dispatch => {
        return strainsApi.getAllStrains().then(strains => {
            dispatch({
                type: types.LOAD_STRAINS_SUCCESS,
                strains
            })
        })
    }
}

export const addStrain = strain => {
    return dispatch => {
        return strainsApi.createStrain(strain).then(strainResponse => {
            dispatch({
                type: types.ADD_STRAIN,
                strain: strainResponse
            })
        })
    }
}

export const updateStrain = strain => {
    return dispatch => {
        dispatch({
            type: types.UPDATE_STRAIN,
            strain
        })
    }
}

export const saveStrain = strain => {
    return dispatch => {
        return strainsApi.updateStrain(strain).then(strainResponse => {
            dispatch({
                type: types.SAVE_STRAIN,
                strain: strainResponse
            })
        })
    }
}