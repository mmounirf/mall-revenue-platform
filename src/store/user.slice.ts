import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginResponse, UserRoles } from '../api/types';

export type UserState = LoginResponse & { isInitialized: boolean };

export const initialUserState: UserState = {
    isInitialized: true,
    token: 'token',
    user: {
        id: '1',
        name: 'Mohamed Mounir',
        role: 'Stakeholder' as unknown as UserRoles,
        userName: 'mou',
    },
    scope: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser(state: UserState, action: PayloadAction<UserState>) {
            return action.payload;
        },
        initUser(state: UserState) {
            return {
                ...state,
                isInitialized: true,
            };
        },
    },
});

export const { setUser, initUser } = userSlice.actions;

export default userSlice.reducer;
