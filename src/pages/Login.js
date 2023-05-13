import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    isButtonDisabled: true,
    email: '',
    // password: '',
  };

  validationFields = (characters) => {
    const { email } = this.state;
    const minCharacters = 6;
    const validationInput = characters.length >= minCharacters;

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
    }, this.validationFields(value));
  };

  handleSubmitButton = () => {
    const { email, password, history, dispatch } = this.props;
    dispatch(saveEmail(email, password));
    history.push('/carteira');
  };

  render() {
    const { isButtonDisabled } = this.state;
    const { email, password } = this.props;

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
            onChange={ (e) => this.handleChange(e.target) }
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
            onChange={ (e) => this.handleChange(e.target) }
          />
        </div>
        <button
          type="submit"
          disabled={ isButtonDisabled }
          onClick={ () => this.handleSubmitButton() }
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
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
});

export default connect(mapStateToProps)(Login);
