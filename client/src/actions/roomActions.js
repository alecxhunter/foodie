import {  } from 'react-router-dom'
import * as types from './actionTypes'
import roomsApi from '../api/roomsApi'

export const addRoom = room => {
    return dispatch => {
        return roomsApi.create(room).then(roomResponse => {
            dispatch({
                type: types.ADD_ROOM,
                room: roomResponse
            })
        })
    }
}

export const loadRooms = () => {
    return dispatch => {
        return roomsApi.getAllRooms().then(rooms => {
            dispatch({
                type: types.LOAD_ROOMS_SUCCESS,
                rooms
            })

            changeRoom(rooms[0])
        })
    }
}

export const changeRoom = id => {
    return dispatch => {
        dispatch({
            type: types.CHANGE_ROOM,
            id
        })
    }
}

export const updateRoom = room => {
    return dispatch => {
        return roomsApi.updateRoom(room).then(roomResponse => {
            dispatch({
                type: types.UPDATE_ROOM,
                room: roomResponse
            })
        })
    }
}