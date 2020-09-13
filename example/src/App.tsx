import React from "react";
import { Provider, History, Trigger } from '../package'
import '../package/App.css';
import './index.css';

// import { Provider, History, Trigger } from 'react-histories-search';
// import 'react-histories-search/dist/index.css';

export default function App() {
  const handleSearch = (value: string) => {
    alert(`Call some API to handle search keyword: ${value}`);
  };
  return (
    <Provider value={{
      // pass options in here
      LocalStorageKey: 'key_in_local_storage',
      limitHistory: 5,
      handleSearch,
      isEnterDown: true,
    }}>
      <h3 className='title'>
        <span className='react'>React</span>{' '}
        <span className='histories'>Hist<span className='icon'>&#128269;</span>ry</span>{' '}
        <span className='search'>Search</span>{' '}
      </h3>

      <History isHint isTabFill isRemoveHistory>
        <input id="some_unique_id"/>
      </History>
      {/* If you want a button to trigger search action */}
      {/* <Trigger dataId="some_unique_id">
        <button>&#128269;</button>
      </Trigger> */}
    </Provider>
  );
};
