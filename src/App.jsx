import React, { useState, useContext, createContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Question from './components/Question';
import Result from './components/Result';
import { questions } from './data/questions';

const AuthContext = createContext();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, score, setScore, currentQuestionIndex, setCurrentQuestionIndex }}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/question" component={Question} />
          <PrivateRoute path="/result" component={Result} />
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default App;