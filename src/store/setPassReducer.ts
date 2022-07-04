
const initialState = {

}
export type InitialStateType = typeof initialState
export const setPassReducer = (state = initialState, action: SetPassActionType):InitialStateType => {
    switch (action.type) {

        default: return state
    }
};

export type SetPassActionType = any