import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    return <h1>TrybeWallett</h1>;
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  // dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.wallet.email,
  password: state.wallet.password,

});

export default connect(mapStateToProps)(Wallet);
