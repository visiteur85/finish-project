export type loginInitialStateType = {}

let initialState: loginInitialStateType = {};

export const loginReducer = (state = initialState, action: LoginActionType) => {
    switch (action.type) {
        default: return state
    }
};

export type LoginActionType = any