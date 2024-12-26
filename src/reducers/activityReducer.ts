import { Activity } from "../types"

export interface ActivityActions {
    type: "SAVE_ACTIVITY" | "DELETE_ACTIVITY";
    payload: {
        newActivity: Activity
    };
}

interface ActivityState {
    activities: Activity[]
}

export const initialState: ActivityState = {
    activities: []
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
): ActivityState => {
    switch (action.type) {
        case "SAVE_ACTIVITY":

            return {
                ...state,
                activities: [...state.activities, action.payload.newActivity]
            };

        case "DELETE_ACTIVITY":
            return {
                activities: state.activities.filter(activity => activity.name !== action.payload.newActivity.name)
            }

        default: return state;
    }
}