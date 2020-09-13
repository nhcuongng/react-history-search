import React from "react";
import { Provider, History, Trigger } from '../../package'
import '../../package/App.css';

import '../Example.css';

// import { Provider, History, Trigger } from 'react-histories-search';
// import 'react-histories-search/dist/index.css';

export const Main: React.FC = () => {
  const handleSearch = (value: string) => {
    alert(`Call some API to handle search keyword: ${value}`);
  };
  return (
    <Provider value={{
      // pass options in here
      LocalStorageKey: 'key_in_local_storage',
      limitHistories: 5,
      handleSearch,
      isEnableEnterDown: true,
    }}>
      <h3 className='title'>
        <span className='react'>React</span>{' '}
        <span className='histories'>Hist<span className='icon'>&#128269;</span>ries</span>{' '}
        <span className='search'>Search</span>{' '}
      </h3>

      <History.Hint allowTabFill>
        <input id="some_unique_id"/>
      </History.Hint>
      <Trigger dataId="some_unique_id">
        <button>&#128269;</button>
      </Trigger>

    </Provider>
  );
};
