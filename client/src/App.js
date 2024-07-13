import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Data from './components/Data';
import Detail from './components/Detail';
import MultipleFoodDetails from './components/MultipleFoodDetails';
import CustomCursor from './components/CustomCursor';
import { Provider } from 'react-redux';
import store from './store';
import Welcome from './components/Welcome';


function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
      <CustomCursor />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dataset" element={<Data />} />
          <Route path="/details/:id" element={<Detail />} />
          <Route path="/multiplefooddetails" element={<MultipleFoodDetails />} />
        </Routes>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
