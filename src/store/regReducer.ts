export type RegInitialStateType = {}

let initialState: RegInitialStateType = {};

export const regReducer = (state = initialState, action: RegActionType) => {
    switch (action.type) {
        default: return state
    }
};

export type RegActionType = any