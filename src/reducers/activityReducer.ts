import { Activity } from "../types"

export type ActivityActions =
    | { type: "save-activity", payload: { newActivity: Activity } }
    | { type: "set-activeId", payload: { id: Activity["id"] } }


export interface ActivityState {
    activities: Activity[]
    activeId: Activity["id"]
}

export const initialState: ActivityState = {
    activities: [],
    activeId: ""
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    if (action.type == "save-activity") {

        let updatedActivities: Activity[] = [];

        if (state.activeId) {
            updatedActivities = state.activities.map(item => item.id === state.activeId ? action.payload.newActivity : item);
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity];
        }

        return {
            ...state,
            activities: updatedActivities
        };
    }

}



