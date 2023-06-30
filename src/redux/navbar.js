import { createSlice} from '@reduxjs/toolkit'

const initialState= {
  isLoanding: false,
  currentStoreInfoId: '',
  currentUserProfileId: '',
  isCurrentStoreManagedByTicTag: false
}

export const navbarSlice = createSlice({
  name: 'navbarSlice',
  initialState,
  reducers: {

    setIsLoading: (state, action) => {
      state.isLoanding = action.payload
    },
    setCurrentStoreInfoId: (state, action) => {
      state.currentStoreInfoId = action.payload
    },
    setCurrentUserProfileId: (state, action) => {
      state.currentUserProfileId = action.payload
    },
    setIsCurrentStoreManagedByTicTag: (state, action) => {
      state.isCurrentStoreManagedByTicTag = action.payload
    },

  },
})

export const { setIsLoading, setCurrentStoreInfoId, setCurrentUserProfileId, setIsCurrentStoreManagedByTicTag } = navbarSlice.actions;

export default navbarSlice.reducer;