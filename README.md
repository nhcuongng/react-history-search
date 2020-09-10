# Search Like Google In React

[![npm version](https://badge.fury.io/js/react-histories-search.svg)](https://badge.fury.io/js/react-histories-search)
![npm](https://img.shields.io/npm/dw/react-histories-search)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-histories-search)
![David](https://img.shields.io/david/nhcuongng/react-histories-search)

This is my component supported:

![exmple for react-histories-search](https://raw.githubusercontent.com/nhcuongng/react-histories-search/master/img/example.gif)

## features

- Save search histories to local storage
- Suggest histories searched

## Usage/Examples

### Example 1: No options

```ts
import React from "react";
import { Provider, History, Trigger } from 'react-histories-search';
import 'react-histories-search/dist/index.css'; // import css

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

### Example 2: Full options (*recommend*)

```ts
import React from "react";
import { Provider, History, Trigger } from 'react-histories-search';
import 'react-histories-search/dist/index.css'; // import css

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
```

## Options

| name  |  type |  defalut | optional  | description |
|---|---|---|---|---|
|  LocalStorageKey | string  |  searchKeywords | true | Key will save on local storage |
| limitHistories | number  | 5 | true  | limit histories will save in local storage |
| handleSearch | Function  | no |  true | callback return your keyword, you will handle search in here |
| isEnableEnterDown | boolean  | false |  true | press enter to search |

## Components

| Name         	| description                                                                                                    	| props                                                                                                                 	|
|--------------	|----------------------------------------------------------------------------------------------------------------	|-----------------------------------------------------------------------------------------------------------------------	|
| History      	| Insert history table                                                                                           	| onClick={(keyword) => // handle your action search}                                                                   	|
| History.Hint 	| Insert hints to input tag, hints based on  **previous keyword**                                                	| onClick (like ```<History />```) allowTabFill: type is boolean, allow you type  **tab** to fill text on input by hint 	|
| Trigger      	| Work like a button **search**. Tips: you can't not necessary use it, if you use option  ```isEnableEnterDown``` | dataId (requried) is must same with id of input tag	|                                                                                                                       	|

## Example

You can download [example](https://github.com/nhcuongng/react-histories-search/tree/master/example)

## Thanks to

- **sondnf8** for [jsfiddle](https://jsfiddle.net/sondnf8/m90q73y2/10/?fbclid=IwAR0398sEz_3gAcGkPlzDDsg6uqYuhpgZ9V0p-bRtx1HSnrkAQOkzlm290uE)
- [react-autocomplete-hint](https://github.com/ejmudi/react-autocomplete-hint) package