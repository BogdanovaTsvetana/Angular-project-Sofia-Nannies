import { createReducer, on } from "@ngrx/store";
import { ICurrentUser } from "../share/interfaces/user";
import { login, logout, updateUser, becomeNanny, deleteNanny } from "./actions";

export interface IrootState {
    currentUser: ICurrentUser,
}

export const currentUserReducer = createReducer<ICurrentUser>(
    undefined,
    on(login, (_, action) => action.currentUser),
    on(logout, () => undefined),
    on(updateUser, (state, action) => {
        return {
            ...state,
            firstName: action.currentUser.firstName,
            lastName: action.currentUser.lastName,
            email: action.currentUser.email,
        }
    }),
    on(becomeNanny, (state, action) => {
        return {
            ...state,
            isNanny: true
        }
    }),
    on(deleteNanny, (state, action) => {
        return {
            ...state,
            isNanny: false
        }
    }),
)
 

