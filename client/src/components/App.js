import React from 'react';
import Footer from './Footer';
import VisibleTodoList from '../containers/VisibleTodos';
import TopBar from './TopBar';
  
import './App.css';
import 'font-awesome/css/font-awesome.css';

const App = () => (
  <div>
    <TopBar/>
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
