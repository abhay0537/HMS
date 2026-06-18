import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

 const initialState={
    service:[],
    isLoading:false,
    error:''
}

 export const getservice=createAsyncThunk("getService", async(_, { rejectWithValue })=>{
    try {
    const res=await fetch("http://localhost:8080/public/service")
    if (!res.ok) {
        throw new Error("Unable to load services")
    }
    const data=await res.json()
    return data
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
export const getService=createSlice({
    name:'getDoctor',
    initialState,
    extraReducers:{
        [getservice.pending]:(state)=>{
            state.isLoading=true
        },
        [getservice.fulfilled]:(state,action)=>{
            state.isLoading=false
            state.service=action.payload
        },
        [getservice.rejected]:(state,action)=>{
            state.isLoading=false
            state.error=action.payload || "Unable to load services"
        }

    }

})


export default getService.reducer
