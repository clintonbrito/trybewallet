import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    isButtonDisabled: true,
    email: '',
    password: '',
  };

  validationFields = () => {
    const { email, password } = this.state;
    const minCharacters = 6;
    const validationInput = password.length >= minCharacters;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const resultRegex = emailRegex.test(email);
    if (validationInput && resultRegex) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
    // const result = validationInput && resultRegex;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationFields);
  };

  handleSubmitButton = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isButtonDisabled, email, password } = this.state;
    // const {  } = this.props;

    return (
      <form>
        <div>
          <label htmlFor="email-input">E-mail:</label>
          <input
            name="email"
            type="email"
            id="email-input"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <label htmlFor="password-input">Senha:</label>
          <input
            name="password"
            type="password"
            id="password-input"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
        </div>
        <button
          type="submit"
          disabled={ isButtonDisabled }
          onClick={ (event) => {
            this.handleSubmitButton();
            // dispatch(saveEmail(email));
            // history.push('/carteira');
            event.preventDefault();
          } }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

// const mapStateToProps = (state) => ({
//   email: state.user.email,
//   password: state.user.password,
// });

export default connect()(Login);
