export default function reducer(state={
    revenue_performances: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {

switch (action.type) {
    case "FETCH_PERFORMANCE": {
        return {...state, fetching: true}
    }
    case "FETCH_PERFORMANCE_REJECTED": {
        return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_PERFORMANCE_FULFILLED": {
        return {
            ...state,
            fetching: false,
            fetched: true,
            revenue_performances: action.payload,
        }
    }}
    return state
}
