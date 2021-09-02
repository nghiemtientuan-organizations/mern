import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Auth from './components/Auth';
import AuthContextProvider from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <ProtectedRoute exact path='/home' component={DashboardPage} />
          <Route
            exact
            path='/login'
            render={(props) => <Auth {...props} authRouter='login' />}
          />
          <Route
            exact
            path='/register'
            render={(props) => <Auth {...props} authRouter='register' />}
          />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
