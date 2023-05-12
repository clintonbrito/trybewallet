// ACTION TYPES

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

// ACTION CREATORS
export const addEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

// Coloque aqui suas actions;
