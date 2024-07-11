// store.js
import { createStore } from 'redux';
import { cursorReducer } from './reducer';

const store = createStore(cursorReducer);

export default store;
