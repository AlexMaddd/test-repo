// import {configureStore} from '@reduxjs/toolkit'
// import authReducer from '../src/state/slices/authSlice';

// const store = configureStore({
//     reducer: {
//       auth: authReducer
//     }
//   })

// // from docs Using with TypeScript
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

// export default store;

// new 
import { configureStore } from '@reduxjs/toolkit';

// State Reducers
// import authSlice from './state/slices/authSlice'
import combinedReducerss from '../src/state/slices/index';

// State Persistance Package
import storage from 'redux-persist/lib/storage';
// import { combineReducers } from 'redux';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    // blacklist: ['sites'],
 };

//  const persistRegConfig = {
//     key: 'allocations',
//     // change to persist in session or cache 
//     storage,
//     blacklist: ['status', 'error'], 
//  };

//  const reducers = combineReducers({ 
//     allocations: persistReducer(persistRegConfig, authSlice),
//   });

 const persistedReducer = persistReducer(persistConfig, combinedReducerss);

const store = configureStore({
    reducer: {
      root: persistedReducer
    },
    // intercept and stop non-serializable values
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
  })
export default store

export const persistor = persistStore(store)
export const persistReducers = persistReducer(persistConfig, persistedReducer);
export type RootState = ReturnType<typeof persistedReducer>
export type AppDispatch = typeof store.dispatch