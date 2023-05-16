import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <h1>💱 TrybeWallet 💳️</h1>
        <div>
          <h2 data-testid="email-field">{ email }</h2>
          <h2 data-testid="total-field">{0}</h2>
          <h2 data-testid="header-currency-field">BRL</h2>
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
