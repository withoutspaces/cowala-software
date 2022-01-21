import React from 'react';

import { useForm } from 'react-hook-form'
import './App.css';
import Form from './components/Form';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Form />
    </div>
  );
}

export default App;
