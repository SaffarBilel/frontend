import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import QuestionsPage from './pages/QuestionsPage';
import HomePage from './pages/HomePage';
import AskQuestion from './pages/AskQuestion';
import QuestionDetailsPage from './pages/QuestionDetailsPage';


const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <nav className='navbar navbar-expand-lg navbar-light bg-primary'>
          <Link className='navbar-brand' to='/'>Mini StackOverFlow</Link>
          <button
            className='navbar-toggler'
            type='button'
          >

          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link' to='/question'>Questions</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/AskQuestion'>Poser votre question</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/question' component={QuestionsPage} />
          <Route path='/AskQuestion' component={AskQuestion} />
          <Route path='/questiondetail/:id' element={<QuestionDetailsPage/>}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
