import axios from "axios";

export function fetchPerformanceRevenue() {
    return function(dispatch) {
        axios.get("data.json")
        .then((response) => {
            dispatch({type: "FETCH_PERFORMANCE_FULFILLED", payload: response.data})
        })
        .catch((err) => {
            dispatch({type: "FETCH_PERFORMANCE_REJECTED", payload: err})
        })
    }
}

