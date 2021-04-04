import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import NewAccount from './components/new-account';
import Home from './components/home';
import Terms from './components/terms';
import Policy from './components/policy';
import NotFound from './components/not-found';
import Welcome from './components/welcome';

const App = () => {
  return (
   <>
    <BrowserRouter>
    <Switch>
      <Route path="/profile" component={NewAccount}/>
      <Route path="/terms" component={Terms}/>
      <Route path="/policy" component={Policy}/>
      <Route path="/welcome" component={Welcome}/>
      <Route path="/" exact component={Home}/>

      <Route component={NotFound}/>
    </Switch>
    </BrowserRouter>
    <ToastContainer/>
   </>
  );
}

export default App;