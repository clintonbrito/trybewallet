import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
// import Login from '../pages/Login';

describe('Testes na page Login', () => {
  it('Verifica se o botão de login está desabilitado inicialmente', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toHaveAttribute('disabled');
  });

  it('Verifica a validação dos inputs de login', () => {
    renderWithRouterAndRedux(<App />);
    const loginEmail = 'bill@bill.com';
    const loginPassword = 'senhaxablau';

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByLabelText(/senha:/i);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, loginEmail);
    userEvent.type(passwordInput, loginPassword);
    expect(loginButton).not.toHaveAttribute('disabled');
  });
});
