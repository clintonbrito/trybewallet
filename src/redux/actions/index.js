// ACTION TYPES

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

// ACTION CREATORS
export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const getCurrenciesAPI = (currenciesFetch) => ({
  type: GET_CURRENCIES,
  payload: currenciesFetch,
});

export const getCurrenciesAction = () => async (dispatch) => {
  const fetchCurrenciesAPI = 'https://economia.awesomeapi.com.br/json/all';
  const APIResponse = await fetch(fetchCurrenciesAPI);
  const results = await APIResponse.json();

  const response = Object.keys(results).filter((key) => key !== 'USDT');
  dispatch(getCurrenciesAPI(response));
};

// results.map(
//   ({
//     USD,
//     CAD,
//     GBP,
//     ARS,
//     BTC,
//     LTC,
//     EUR,
//     JPY,
//     CHF,
//     AUD,
//     CNY,
//     ILS,
//     ETH,
//     XRP,
//     DOGE,
//   }) => ({
//     USD,
//     CAD,
//     GBP,
//     ARS,
//     BTC,
//     LTC,
//     EUR,
//     JPY,
//     CHF,
//     AUD,
//     CNY,
//     ILS,
//     ETH,
//     XRP,
//     DOGE,
//   }),

// Coloque aqui suas actions;
