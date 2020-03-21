import React from 'react';

import AppContainer from './src/screens'
import { StockContextProvider } from './src/context/stock';
import BottomBannerAds from './src/components/View/BottomBannerAds';

const App = () => {
  return (
    <>
      <StockContextProvider>
        <AppContainer />
      </StockContextProvider>
      <BottomBannerAds />
    </>
  );
};



export default App;
