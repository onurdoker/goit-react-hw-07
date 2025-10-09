import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

export const filtersSlice = createSlice({
                                          name: "filters",
                                          initialState,
                                          reducers: {
                                            changeFilter: (state,
                                                           action) => {
                                              state.name = action.payload;
                                            },
                                          },
                                        });

export const filtersReducer = filtersSlice.reducer;
export const { changeFilter } = filtersSlice.actions;

export const selectNameFilter = state => state.filters.name;