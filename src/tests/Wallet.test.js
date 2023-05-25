import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import mockData from './helpers/mockData';
import { SAVE_EMAIL } from '../redux/actions';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import rootReducer from '../redux/reducers';
import Wallet from '../pages/Wallet';

describe('Testes na page Wallet', () => {
  const emailExample = 'bill@bill.com';

  it('Verifica a existência do estado inicial', () => {
    const initialState = {
      user: {
        email: emailExample,
      },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };

    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState,
    });

    const loginEmail = screen.getByText(/bill@bill\.com/i);
    expect(loginEmail).toBeInTheDocument();

    const totalExpenses = screen.getByText('0.00');
    expect(totalExpenses).toBeInTheDocument();
  });

  it('Verifica os valores do estado são atualizados', () => {
    const state = {
      user: {
        email: emailExample,
      },
      wallet: {
        currencies: [],
        expenses: [
          {
            id: 0,
            currency: 'CAD',
            method: 'Dinheiro',
            tag: 'Lazer',
            description: 'Teste de despesa',
            value: '25',
            exchangeRates: {},
          },
        ],
        editor: false,
        idToEdit: 0,
      },
    };

    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      state,
    });

    const expense = screen.getByText(/lazer/i);
    expect(expense).toBeVisible();
  });

  it('Renderização de componentes diversos após login', () => {
    const initialState = {
      user: {
        email: '',
      },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };

    const action = {
      type: SAVE_EMAIL,
      payload: emailExample,
    };

    const expectedState = {
      user: {
        email: emailExample,
      },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };

    const state = rootReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  it('Verifica se após criar uma despesa e removê-la, há atualizações no estado global', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />);

    const descriptionInput = screen.getByTestId('description-input');
    const descriptionText = 'Coquinha do Tiago Quadros';
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(descriptionInput, descriptionText);
    await waitFor(() => {
      expect(descriptionInput).toHaveValue(descriptionText);
    });

    userEvent.click(addExpenseButton);

    await waitFor(() => {
      const getStore = store.getState();
      const { expenses } = getStore.wallet;
      expect(expenses).toHaveLength(1);
      expect(expenses[0].description).toBe(descriptionText);
    });

    const deleteExpenseButton = screen.getByTestId('delete-btn');
    userEvent.click(deleteExpenseButton);

    await waitFor(() => {
      const getStore = store.getState();
      const { expenses } = getStore.wallet;
      expect(expenses).toHaveLength(0);
    });
  });
  it('Teste se o redirecionamento está correto após clicar no botão de login e o e-mail aparece no header', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const loginInput = screen.getByRole('textbox', { name: /e-mail:/i });
    const loginEmail = 'bill@bill.com';

    const passwordInput = screen.getByLabelText(/senha:/i);
    const loginPassword = 'senhaxablau';

    const loginButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(loginInput, loginEmail);
    userEvent.type(passwordInput, loginPassword);

    await waitFor(() => { expect(loginButton).toBeEnabled(); });
    userEvent.click(loginButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const emailHeader = screen.getByRole('heading', { name: /bill@bill\.com/i });
    expect(emailHeader).toBeInTheDocument();
  });
});
