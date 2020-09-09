import React from "react";
import { Provider, History, Trigger } from 'ezy-search';

export const Main: React.FC = () => {
  const handleSearch = (value: string) => {
    alert(`Call some API to handle search keyword: ${value}`);
  };
  return (
    <>
      <History.Hint>
        <input id="some_unique_id"/>
      </History.Hint>
      <Trigger dataId="some_unique_id">
        <button >Search</button>
      </Trigger>
    </>
  );
};
