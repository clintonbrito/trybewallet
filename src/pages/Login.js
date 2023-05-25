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
      <form className="max-w-sm mx-auto mt-40">
        <div className="mb-4">
          <label
            htmlFor="email-input"
            className="block mb-2 text-green-500 text-center"
          >
            E-mail:
          </label>
          <input
            name="email"
            type="email"
            id="email-input"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
            className="w-full px-4 py-2 border
            border-green-500 rounded focus:outline-none focus:border-green-600"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password-input"
            className="block mb-2
          text-green-500 text-center"
          >
            Senha:
          </label>
          <input
            name="password"
            type="password"
            id="password-input"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
            className="w-full px-4 py-2 border
            border-green-500 rounded focus:outline-none focus:border-green-600"
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
          className={ `w-full py-2 px-4
            bg-green-500 text-white font-semibold rounded-full
            hover:bg-green-600 focus:outline-none
            ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}` }
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
