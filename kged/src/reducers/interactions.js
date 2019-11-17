import { omit } from 'lodash/fp'

const initialState = {
    interactions: {},
    activeInteraction: undefined
}

function interactions(state = initialState, action) {

    switch (action.type) {
        case 'ADD_INTERACTION':
            return state

        case 'UPDATE_INTERACTION':
            return state

        case 'DELETE_INTERACTION':
            return {
                ...state,
                interactions: omit(action.payload.interaction,state.interactions)
            }

        case 'SET_ACTIVE_INTERACTION':
            return {
                ...state,
                activeInteraction: action.payload.interaction
            }

        case 'SET_DOOR_INTERACTION':
            return {
                ...state,
                interactions: {
                    ...state.interactions,
                    [action.payload.interaction]: {
                        'click': [
                            {
                                'command': 'do_transition',
                                'destination': action.payload.destination
                            }
                        ]
                    }
                }
            }

        default:
            return state
    }
}

export default interactions