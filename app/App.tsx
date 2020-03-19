import React from 'react';

import AppContainer from './src/screens'
import { StockContextProvider } from './src/context/stock';

const App = () => {
  return (
    <>
      <StockContextProvider>
        <AppContainer />
      </StockContextProvider>
    </>
  );
};



export default App;
