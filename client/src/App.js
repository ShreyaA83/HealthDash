import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Data from './components/Data';
import Detail from './components/Detail';
import MultipleFoodDetails from './components/MultipleFoodDetails';
import CustomCursor from './components/CustomCursor';
import { Provider } from 'react-redux';
import store from './store';
import Welcome from './components/Welcome';
import { DataProvider as DataContextProvider } from './components/DataContext'; 
// import { DataProvider as HomeContextProvider } from './components/HomeContext'; 

// import Home from './components/Home';

function App() {
  return (
    <DataContextProvider>
      <Provider store={store}>
        {/* <HomeContextProvider> */}
          <Router>
            <div className="App">
              <CustomCursor />
              <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={<Welcome />} />
                <Route path="/dataset" element={<Data />} />
                <Route path="/details/:id" element={<Detail />} />
                <Route path="/multiplefooddetails" element={<MultipleFoodDetails />} />
              </Routes>
            </div>
          </Router>
        {/* </HomeContextProvider> */}
      </Provider>
    </DataContextProvider>
  );
}

export default App;
