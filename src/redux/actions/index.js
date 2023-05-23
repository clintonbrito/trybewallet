// ACTION TYPES

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_WALLET = 'GET_WALLET';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

// ACTION CREATORS
export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const getCurrenciesAPI = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const getWallet = (wallet) => ({
  type: GET_WALLET,
  payload: wallet,
});

export const getCurrenciesAction = () => async (dispatch) => {
  const fetchCurrenciesAPI = 'https://economia.awesomeapi.com.br/json/all';
  const APIResponse = await fetch(fetchCurrenciesAPI);
  const results = await APIResponse.json();

  const response = Object.keys(results).filter((key) => key !== 'USDT');
  dispatch(getCurrenciesAPI(response));
};

export const getExchangesAction = (expenses) => async (dispatch) => {
  const fetchCurrenciesAPI = 'https://economia.awesomeapi.com.br/json/all';
  const APIResponse = await fetch(fetchCurrenciesAPI);
  const results = await APIResponse.json();

  const expensesArray = {
    ...expenses,
    exchangeRates: {
      ...results,
    },
  };

  dispatch(getWallet(expensesArray));
};
