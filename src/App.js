import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import NewAccount from './components/new-account';
import Home from './components/home';

const App = () => {
  return (
   <>
    <BrowserRouter>
      <Route path="/" exact component={Home}/>
      <Route path="/profile" component={NewAccount}/>
    </BrowserRouter>
   </>
  );
}

export default App;