import React from 'react';
import NavBar from './components/NavBar';
import ProductsContextProvider from './contexts/ProductsContext';
import Table from './components/ProductsTable';

function App() {
  return (
    <div className="App">
      <ProductsContextProvider>
        <NavBar />
        <Table />
      </ProductsContextProvider>
    </div>
  );
}

export default App;
