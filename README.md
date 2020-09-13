# Search Like Google In React

[![npm version](https://badge.fury.io/js/react-history-search.svg)](https://badge.fury.io/js/react-history-search)
![npm](https://img.shields.io/npm/dw/react-history-search)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-history-search)
![David](https://img.shields.io/david/nhcuongng/react-history-search)

This is my component supported:

![exmple for react-history-search](https://raw.githubusercontent.com/nhcuongng/react-history-search/master/img/example.gif)

## Features

- Save search history to local storage
- Suggest history searched

## Usage/Examples

### Example 1: No options

```ts
import React from "react";
import { Provider, History, Trigger } from 'react-history-search';
import 'react-history-search/dist/index.css'; // import css

export const Main: React.FC = () => {
  const handleSearch = (value: string) => {
    alert(`Call some API to handle search keyword: ${value}`);
  };
  return (
    <>
      <History onClick={handleSearch}>
        <input id="some_unique_id"/>
      </History>
      <Trigger dataId="some_unique_id">
        <button onClick={handleSearch}>Search</button>
      </Trigger>
    </>
  );
};
```

### Example 2: With some options (*recommend*)

```ts
import React from "react";
import { Provider, History, Trigger } from 'react-history-search';
import 'react-history-search/dist/index.css'; // import css

export const Main: React.FC = () => {
  const handleSearch = (value: string) => {
    alert(`Call some API to handle search keyword: ${value}`);
  };
  return (
    <Provider value={{ // more options, see below
      // pass options in here
      handleSearch,
      isEnterDown: true,
    }}>
      <History isHint> // more props, see below
        <input id="some_unique_id"/>
      </History>
      // option isEnterDown is used, trigger maybe useless
      // <Trigger dataId="some_unique_id">
      //   <button>Search</button>
      // </Trigger>
    </Provider>
  );
};
```

## Options

| name  |  type |  defalut | optional  | description |
|---|---|---|---|---|
|  LocalStorageKey | string  |  searchKeywords | true | Key will save on local storage |
| limitHistory | number  | 5 | true  | limit histories will save in local storage |
| handleSearch | Function  | no |  true | callback return your keyword, you will handle search in here |
| isEnterDown | boolean  | false |  true | press enter to search |


## Components

| Name    	| description                                                                                                                                            	| props                                                                                                                                                                                                          	|
|---------	|--------------------------------------------------------------------------------------------------------------------------------------------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| History 	| Insert history table, require child component inside is input                                                                                          	| **onClick**={(keyword) => // handle your action search}.  **isTabFill**: boolean // type tab to fill hint.   **isHint**: boolean // enable table history table.   **isRemoveHistory**: boolean // enable button remove history 	|
| Trigger 	| Work like a button **search**, require child component inside is button . Tips: you can't necessary use it, if you use option  ```isEnableEnterDown``` 	| dataId (requried) is must same with id of input tag                                                                                                                                                            	|                                                                                                              	|


## Example

You can download [example](https://github.com/nhcuongng/react-history-search/tree/master/example)

## Thanks to

- Contributor [kmaCoders](https://github.com/kmacoders) for your support 💕 
- [react-autocomplete-hint](https://github.com/ejmudi/react-autocomplete-hint) package 😜