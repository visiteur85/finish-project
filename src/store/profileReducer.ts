export type ProfileInitialStateType = {}

let initialState: ProfileInitialStateType = {};

export const profileReducer = (state = initialState, action: ProfileActionType) => {
    switch (action.type) {
        default: return state
    }
};

export type ProfileActionType = any