import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
// import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => <Login { ...props } /> }
        />
        <Route
          exact
          path="/carteira"
          render={ (props) => <Wallet { ...props } /> }
        />
      </Switch>
    );
  }
}

// const mapStateToProps = (state) => ({
//   email: state.user.email,
// });

// export default connect(mapStateToProps)(App);

export default App;
