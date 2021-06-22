import React from 'react';
import Header from './components/Header';
import Directory from './components/Directory';
import { StoreProvider } from './utils/GlobalState';
import './App.scss';

function App() {
  return (
    <main className="container">
      <StoreProvider>			
        <Header />
			  <Directory />
      </StoreProvider>
		</main>
  );
}

export default App;
