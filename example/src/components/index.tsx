import React from "react";
import { Trigger } from "./Trigger";
import { History } from "./History";
import { Provider } from './context';

export const Main: React.FC = () => {
  const handleSearch = (value: string) => {
    alert(`Call some API to handle search keyword: ${value}`);
  };
  return (
    <Provider value={{
      LocalStorageKey: 'aaa',
      limitHistories: 5,
      handleSearch,
      isEnableEnterDown: true,
    }}>
      <History>
        <input id="some_unique_id"/>
      </History>
      <Trigger dataId="some_unique_id">
        <button>Search</button>
      </Trigger>
    </Provider>
  );
};
