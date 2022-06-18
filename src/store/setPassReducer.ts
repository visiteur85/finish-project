export type SetPassInitialStateType = {}

let initialState: SetPassInitialStateType = {};

export const setPassReducer = (state = initialState, action: SetPassActionType) => {
    switch (action.type) {
        default: return state
    }
};

export type SetPassActionType = any