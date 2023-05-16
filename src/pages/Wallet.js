import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h2>
          testee
        </h2>
      </>
    );
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
