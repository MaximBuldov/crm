import {createSlice} from "@reduxjs/toolkit";
import {loginUser, logoutUser} from "../actions/user";
import {setData, setError, setLoading} from "../functions";

const initialState = {
	data: null,
	status: null,
	error: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
	},
	extraReducers: {
		[loginUser.pending]: setLoading,
		[loginUser.fulfilled]: setData,
		[loginUser.rejected]: setError,
		[logoutUser.pending]: setLoading,
		[logoutUser.fulfilled]: (state) => {
			state.data = null
			state.status = null
			state.error = null
		},
		[logoutUser.rejected]: setError,
	}
})

//export const {removeUserData} = userSlice.actions

export default userSlice.reducer