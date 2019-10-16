import { fetchRooms, exportRooms } from 'api'
import { setActiveEntity, updateActiveEntity } from './entity'
import { isExistingEntity } from 'utils'
import { DuplicateEntityError } from 'utils/errors'


export const loadRooms = () => {
    return (dispatch, getState) => {
        const rooms = fetchRooms()
        dispatch({
            type: 'GET_ROOMS',
            payload: {
                rooms
            }
        })
    }
}

export const setRoomBackgroundImage = (roomId, filePath) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_ROOM_BACKGROUND_IMAGE',
            payload: {
                roomId: roomId,
                filePath: filePath
            }
        })
        dispatch(updateActiveRoom())
    }
}

export const addRoom = (room) => {
    return (dispatch, getState) => {
        if (isExistingEntity(getState(), room.name)) {
            throw new DuplicateEntityError('Nimi on jo käytössä')
        }
        dispatch({
            type: 'ADD_ROOM',
            payload: {
                room: room
            }
        })
    }
}

export const updateRoomId = (oldId, newId) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_ROOM_ID',
            payload: {
                oldId: oldId,
                newId: newId
            }
        })
        dispatch(updateActiveRoom(newId))
    }
}

export const deleteRoom = (room) => ({
    type: 'DELETE_ROOM',
    payload: {
        room: room
    }
})

export const setActiveRoom = (room) => {
    return (dispatch) => {
        dispatch(setActiveEntity(room))
        dispatch({
            type: 'SET_ACTIVE_ROOM',
            payload: {
                room: room
            }
        })
    }
}

export const updateActiveRoom = (id = null) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_ACTIVE_ROOM',
            payload: { id: id }
        })
        dispatch(updateActiveEntity({category: 'room', id: id}))
    }
}

export const saveRooms = () => {
    return (dispatch, getState) => {
        const state = getState()
        exportRooms(state.rooms.rooms)
        dispatch({
            type: 'EXPORT_ROOMS',
            payload: {}
        })
    }
}
