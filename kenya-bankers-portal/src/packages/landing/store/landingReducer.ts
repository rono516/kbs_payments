const initialState={
    loading: false,
}
export default function landingReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        case 'LOADED':
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}