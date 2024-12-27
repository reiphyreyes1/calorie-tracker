import { Activity } from "../types"

export type ActivityActions =
    | { type: "save-activity", payload: { newActivity: Activity } }
    | { type: "set-activeId", payload: { id: Activity["id"] } }
    | { type: "delete-activity", payload: { id: Activity["id"] } }
    | { type: "restart-app" }

export interface ActivityState {
    activities: Activity[]
    activeId: Activity["id"]
}

const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem("activities");
    return activities ? JSON.parse(activities) : [];
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ""
}


export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    console.log(state)
    console.log(action)

    if (action.type == "save-activity") {

        let updatedActivities: Activity[] = [];

        if (state.activeId) {
            updatedActivities = state.activities.map(item => item.id === state.activeId ? action.payload.newActivity : item);
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity];
        }

        return {
            ...state,
            activities: updatedActivities,
            activeId: ""
        };
    }

    if (action.type === "set-activeId") {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if (action.type === "delete-activity") {
        let updatedActivities: Activity[] = [];

        updatedActivities = state.activities.filter(item => item.id !== action.payload.id);

        return {
            ...state,
            activities: updatedActivities
        }
    }

    if (action.type === "restart-app") {
        return {
            activities: [],
            activeId: ""
        }
    }

    return state;
}



