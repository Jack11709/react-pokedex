import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './styles/main.scss'

import PokeIndex from './components/PokeIndex'
import PokeShow from './components/PokeShow'

const App = () => (
  <Router>
    <main>
      <div className="logo">
        <Link to="/"/>
      </div>
      <Switch>
        <Route path="/:id" component={PokeShow} />
        <Route exact path="/" component={PokeIndex} />
      </Switch>
    </main>
  </Router>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
