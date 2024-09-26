import React from 'react';
import cors from 'cors';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Main = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
};

export default Main;
