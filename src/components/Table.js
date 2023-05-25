import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  removeExpenseButton = (id) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(id));
  };

  render() {
    const { expenses } = this.props;

    return (
      <>
        <h2 className="text-2xl mb-4 text-center py-5 px-1">Registro de gastos</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Descrição</th>
              <th className="px-4 py-2">Tag</th>
              <th className="px-4 py-2">Método de pagamento</th>
              <th className="px-4 py-2">Valor</th>
              <th className="px-4 py-2">Moeda</th>
              <th className="px-4 py-2">Câmbio utilizado</th>
              <th className="px-4 py-2">Valor convertido</th>
              <th className="px-4 py-2">Moeda de conversão</th>
              <th className="px-4 py-2">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td className="text-center">{ expense.tag }</td>
                <td className="text-center">{ expense.method }</td>
                <td className="text-center">{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td className="text-center">
                  {
                    Number(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)
                  }
                </td>
                <td className="text-center">
                  { (Number(expense.value)
                * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2) }
                </td>
                <td className="text-center">Real</td>
                <td>
                  <button
                    className="bg-blue-500 hover:bg-blue-600
                    text-white font-bold py-1 px-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600
                    text-white font-bold py-1 px-1 rounded"
                    data-testid="delete-btn"
                    onClick={ () => this.removeExpenseButton(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
