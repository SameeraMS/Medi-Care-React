import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Category {
    id: number;
    name: string;
}

export interface Hospital {
    id: number;
    name: string;
    image: string;
    address: string;
    rating: number;
    categories: Category[];
}

interface HospitalState {
    hospitals: Hospital[];
    loading: boolean;
    error: string | null;
}

const initialState: HospitalState = {
    hospitals: [],
    loading: false,
    error: null,
};

export const fetchHospitals = createAsyncThunk('hospitals/fetchHospitals', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:300/api/hospitals', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch hospitals');
    }
});

export const addHospital = createAsyncThunk(
    'hospitals/addHospital',
    async (hospital: Omit<Hospital, 'id'>, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:300/api/hospitals', hospital, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add hospital');
        }
    }
);

export const updateHospital = createAsyncThunk(
    'hospitals/updateHospital',
    async (hospital: Hospital, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:300/api/hospitals/${hospital.id}`, hospital, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update hospital');
        }
    }
);

export const deleteHospital = createAsyncThunk(
    'hospitals/deleteHospital',
    async (id: number, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:300/api/hospitals/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete hospital');
        }
    }
);

const hospitalSlice = createSlice({
    name: 'hospitals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHospitals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHospitals.fulfilled, (state, action) => {
                state.loading = false;
                state.hospitals = action.payload;
            })
            .addCase(fetchHospitals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addHospital.fulfilled, (state, action) => {
                state.hospitals.push(action.payload);
            })
            .addCase(updateHospital.fulfilled, (state, action) => {
                const index = state.hospitals.findIndex((hospital) => hospital.id === action.payload.id);
                if (index !== -1) {
                    state.hospitals[index] = action.payload;
                }
            })
            .addCase(deleteHospital.fulfilled, (state, action) => {
                state.hospitals = state.hospitals.filter((hospital) => hospital.id !== action.payload);
            });
    },
});

export default hospitalSlice.reducer;
