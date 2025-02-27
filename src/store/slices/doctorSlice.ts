import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    image: string;
    experience: number;
    rating: number;
    consultationFee: number;
}

interface DoctorState {
    doctors: Doctor[];
    loading: boolean;
    error: string | null;
}

const initialState: DoctorState = {
    doctors: [],
    loading: false,
    error: null,
};

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/doctors', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctors');
    }
});

export const addDoctor = createAsyncThunk(
    'doctors/addDoctor',
    async (doctor: Omit<Doctor, 'id'>, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/doctors', doctor, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add doctor');
        }
    }
);

export const updateDoctor = createAsyncThunk(
    'doctors/updateDoctor',
    async (doctor: Doctor, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`/doctors/${doctor.id}`, doctor, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update doctor');
        }
    }
);

export const deleteDoctor = createAsyncThunk(
    'doctors/deleteDoctor',
    async (id: number, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            return await axios.delete(`/doctors/${id}`, {
                headers: {Authorization: `Bearer ${token}`},
            });
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete doctor');
        }
    }
);

const doctorSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.doctors = action.payload;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addDoctor.fulfilled, (state, action) => {
                state.doctors.push(action.payload);
            })
            .addCase(updateDoctor.fulfilled, (state, action) => {
                const index = state.doctors.findIndex((doctor) => doctor.id === action.payload.id);
                if (index !== -1) {
                    state.doctors[index] = action.payload;
                }
            })
            .addCase(deleteDoctor.fulfilled, (state, action) => {
                state.doctors = state.doctors.filter((doctor) => doctor.id !== action.payload);
            });
    },
});

export default doctorSlice.reducer;
