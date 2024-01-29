import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    email: "",
    firstname: "",
    lastname: "",
    id: "",
    token: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            return {
                ...state,
                isAuthenticated: true,
                id: action.payload.user.id,
                firstname: action.payload.user.firstname,
                lastname: action.payload.user.lastname,
                email: action.payload.user.email,
                token: action.payload.token,
            };
        },
        logoutRedux: (state, action) => {
            return {
                ...initialState,
            };
        },
    },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;