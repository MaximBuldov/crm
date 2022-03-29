import {createSlice} from "@reduxjs/toolkit";
import {loginUser, logoutUser} from "../actions/user";
import {setData, setError, setLoading} from "../functions";
import {createJob, fetchJob, fetchJobs, updateJob} from "../actions/jobs";

const initialState = {
	data: null,
	status: null,
	error: null
}

const jobsSlice = createSlice({
	name: 'jobs',
	initialState,
	reducers: {
	},
	extraReducers: {
		[createJob.pending]: setLoading,
		[createJob.fulfilled]: (state, action) => {
			state.data.unshift(action.payload)
			state.status = 'resolved'
		},
		[createJob.rejected]: setError,
		[fetchJobs.pending]: setLoading,
		[fetchJobs.fulfilled]: setData,
		[fetchJobs.rejected]: setError,
		[fetchJob.pending]: setLoading,
		[fetchJob.fulfilled]: (state) => {
			state.status = 'resolved'
			state.error = null
		},
		[fetchJob.rejected]: setError,
		[updateJob.pending]: (state) => {
			state.status = 'updating'
			state.error = null
		},
		[updateJob.fulfilled]: (state, action) => {
			state.data[state.data.findIndex(el => el.id === action.payload.id)] = {
				...action.payload
			}
			state.status = 'resolved'
			state.error = null
		},
		[updateJob.rejected]: setError,
	}
})

//export const {removeUserData} = userSlice.actions

export default jobsSlice.reducer