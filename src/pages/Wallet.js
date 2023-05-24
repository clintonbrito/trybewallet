import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          <div>
            <WalletForm />
          </div>
          <div>
            <Table />
          </div>
        </div>
      </div>
    );
  }
}

// Wallet.propTypes = {
//   email: PropTypes.s
//   password: PropTypes.string,
//   // dispatch: PropTypes.func,
// }.isRequired;

// const mapStateToProps = (state) => ({
//   email: state.wallet.email,
//   password: state.wallet.password,
// });

export default Wallet;
