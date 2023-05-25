import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesAction, getExchangesAction } from '../redux/actions';

class WalletForm extends Component {
  state = {
    currency: 'USD',
    description: '',
    id: 0,
    method: 'Dinheiro',
    tag: 'Alimentação',
    value: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesAction());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  clearForm = () => {
    this.setState({
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      value: '',
    });
  };

  handleClickAddExpense = (click) => {
    click.preventDefault();
    const { dispatch } = this.props;
    const { currency, description, id, method, tag, value } = this.state;

    const expenseToDispatch = { currency, description, id, method, tag, value };

    dispatch((getExchangesAction(expenseToDispatch)));
    this.clearForm();

    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl mb-4">Cadastre uma despesa 👇️</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="value-input2" className="block mb-1">Valor:</label>
            <input
              type="number"
              name="value"
              id="value-input2"
              data-testid="value-input"
              placeholder={ currency }
              value={ value }
              onChange={ this.handleChange }
              className="border border-gray-300 px-2 py-1 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description-input2" className="block mb-1">Descrição:</label>
            <input
              type="text"
              name="description"
              id="description-input2"
              data-testid="description-input"
              placeholder="Escreva aqui"
              value={ description }
              onChange={ this.handleChange }
              className="border border-gray-300 px-2 py-1 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="currency-input2" className="block mb-1">Moeda:</label>
            <select
              id="currency-input2"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
              className="border border-gray-300 px-2 py-1 rounded shadow-md"
            >
              {currencies.map((currenc) => (
                <option key={ currenc } value={ currenc }>
                  {currenc}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="method-input"
              className="block mb-1"
            >
              Método de Pagamento:
            </label>
            <select
              id="method-input"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
              className="border border-gray-300 px-2 py-1 rounded shadow-md"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="tag-input" className="block mb-1">Categoria:</label>
            <select
              id="tag-input"
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
              className="border border-gray-300 px-2 py-1 rounded shadow-md"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4
            bg-green-500 text-whitefont-semibold rounded-full
            hover:bg-green-600 focus:outline-none"
            onClick={ this.handleClickAddExpense }
          >
            Adicionar Despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
