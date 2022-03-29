import {createAsyncThunk} from "@reduxjs/toolkit";
import {$apiGet, $apiPost, $apiPut} from "../../http";
import login from "../../pages/Login";


export const createJob = createAsyncThunk(
	'jobs/createJob',
	async ({values, jobNumber, jobStatus},{rejectWithValue}) => {
		try {
			const customer = await $apiPost.post('customers', {
				data: {
					...values,
					jobNumber
				}
			})
			const res = await $apiPost.post('jobs', {
				data: {
					...values,
					customer: customer.data.data.id,
					jobNumber, jobStatus
				}
			})
			return res.data.data
		} catch (error) {
			return rejectWithValue(error.response.data.error.message)
		}
	}
)

export const fetchJobs = createAsyncThunk(
	'jobs/fetchJobs',
	async (_,{rejectWithValue}) => {
		try {
			const res = await $apiGet.get('jobs', {
				params: {
					populate: ['customer.phones', 'manager', 'origin', 'destination']
				}
			})
			return res.data.data
		} catch (error) {
			return rejectWithValue(error.response.data.error.message)
		}
	}
)

export const fetchJob = createAsyncThunk(
	'jobs/fetchJob',
	async ({id},{rejectWithValue}) => {
		try {
			const res = await $apiGet.get(`jobs/${id}`, {
				params: {
					populate: ['customer.phones', 'manager', 'origin', 'destination']
				}
			})
			return res.data.data
		} catch (error) {
			return rejectWithValue(error.response.data.error.message)
		}
	}
)

export const updateJob = createAsyncThunk(
	'jobs/updateJob',
	async ({id, data},{rejectWithValue}) => {
		try {
			const res = await $apiPut(`jobs/${id}`, {
				data: {
					data
				},
				params: {
					populate: ['customer', 'manager']
				}
			})
			return res.data.data
		} catch (error) {
			return rejectWithValue(error.response.data.error.message)
		}
	}
)