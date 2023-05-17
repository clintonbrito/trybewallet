import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header
        className="flex justify-between items-center py-4 px-6 bg-green-500 text-white"
      >
        <h1 className="text-2xl">💱 TrybeWallet 💳️</h1>
        <div className="flex items-center">
          <h2 className="mr-4" data-testid="email-field">{ email }</h2>
          <h2 className="mr-4" data-testid="total-field">{0}</h2>
          <h2 className="mr-4" data-testid="header-currency-field">BRL</h2>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
