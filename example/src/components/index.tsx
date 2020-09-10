import React from "react";
// import { Provider, History, Trigger } from '../../package'
import { Provider, History, Trigger } from 'ezy-search';
import 'ezy-search/dist/index.css';

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
      <History.Hint>
        <input id="some_unique_id"/>
      </History.Hint>
      <Trigger dataId="some_unique_id">
        <button>Search</button>
      </Trigger>
    </Provider>
  );
};
