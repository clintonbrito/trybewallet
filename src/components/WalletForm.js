import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesAction } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
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

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl mb-4">Cadastre uma despesa 👇️</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="value-input" className="block mb-1">Valor:</label>
            <input
              type="number"
              name="value"
              id="value-input"
              data-testid="value-input"
              placeholder="R$"
              value={ value }
              onChange={ this.handleChange }
              className="border border-gray-300 px-2 py-1 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description-input" className="block mb-1">Descrição:</label>
            <input
              type="text"
              name="description"
              id="description-input"
              data-testid="description-input"
              placeholder="Escreva aqui"
              value={ description }
              onChange={ this.handleChange }
              className="border border-gray-300 px-2 py-1 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="currency-input" className="block mb-1">Moeda:</label>
            <select
              id="currency-input"
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
            // onClick={this.handleClick}
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
