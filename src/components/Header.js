import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;

    let eachExpense = 0;

    expenses.forEach((expense) => {
      const { currency, exchangeRates, value } = expense;

      const currencyRate = exchangeRates[currency].ask;
      const convertedCurrency = currencyRate * value;
      eachExpense += convertedCurrency;
    });

    const totalExpenses = eachExpense.toFixed(2);

    return (
      <header
        className="flex justify-between items-center py-4 px-6
        bg-green-500 text-white w-full"
      >
        <h1 className="text-2xl">💱 TrybeWallet 💳️</h1>
        <div className="flex items-center">
          <h2 className="mr-4" data-testid="email-field">{ email }</h2>
          <h2 className="mr-4" data-testid="total-field">{ totalExpenses }</h2>
          <h2 className="mr-4" data-testid="header-currency-field">BRL</h2>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses:
    PropTypes.shape({
      currency: PropTypes.string,
      description: PropTypes.string,
      exchangeRates: PropTypes.shape({
        BTC: PropTypes.shape({
          ask: PropTypes.number,
          code: PropTypes.string,
          name: PropTypes.string,
        }),
      }),
    }),
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
