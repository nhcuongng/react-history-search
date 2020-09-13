import { createContext, useContext } from 'react';
import { LocalStorageKey, limitHistory } from '../constant';

export type TConfig = {
  LocalStorageKey?: string,
  limitHistory?: number,
  isEnterDown?: boolean,
  handleSearch?: (value: string) => void,
};

export const config: TConfig = {
  LocalStorageKey,
  limitHistory,
  isEnterDown: false,
}

const ConfigContext = createContext<null | TConfig>(null);

export const { Provider, Consumer } = ConfigContext;

export function useConfig() {
  let store = useContext(ConfigContext);
  if (store === null) {
    store = config;
  }
  return store;
}