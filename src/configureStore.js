
//import {loadState, saveState} from './localStorage';
//import throttle from 'lodash/throttle';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import todoApp from './reducers';

// const logger = (store ) => {
//   return (next) => {
//     if (!console.group) {
//       return next;
//     }
//     return (action) => {
//       console.group(action.type);
//       console.log("%c prev state",'color: gray', store.getState());
//       console.log("%c action",'color: blue', action);
//       const returnValue = next(action);
//       console.log('%c next state','color:green', store.getState());
//       console.groupEnd(action.type);
//       return returnValue;
//     }
//   } 
// }

// const promise = (store) => {
//   return (next) => {
//     return (action) => {
//       if (typeof action.then === 'function') {
//         return action.then(next);
//       }
//       return next(action);
//     };
//   };
// }

// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//   middlewares.slice().reverse().forEach(middleware=>
//     store.dispatch = middleware(store)(store.dispatch)
//   );
// };

// const thunk = (store) => (next) => (action) => 
//   typeof action === 'function' ? 
//     action(store.dispatch, store.getState) :
//     next(action);

const configureStore = () => {

    // local storage -> const persistedState = loadState();
    //const store = createStore(todoApp, persistedState);
    
    // store.subscribe(throttle(() => {
    //   saveState({
    //     todos: store.getState().todos
    //   })
    // }, 1000));
    
    const middlewares = [thunk];
    middlewares.push(createLogger());

    //wrapDispatchWithMiddlewares(store, middlewares);
    return createStore(
      todoApp, 
      applyMiddleware(thunk, createLogger())
      );
}

export default configureStore;


