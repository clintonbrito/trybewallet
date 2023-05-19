import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <WalletForm />
      </>
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
