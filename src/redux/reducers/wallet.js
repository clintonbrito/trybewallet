// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

import { GET_CURRENCIES, GET_WALLET } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case GET_WALLET:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };
  default:
    return state;
  }
};

export default wallet;
