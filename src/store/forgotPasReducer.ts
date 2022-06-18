export type FogInitialStateType = {}

let initialState: FogInitialStateType = {};

export const forgotPasReducer = (state = initialState, action: FogotActionType) => {
    switch (action.type) {
        default: return state
    }
};

export type FogotActionType = any