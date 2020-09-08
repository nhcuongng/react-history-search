import { createContext, useContext } from 'react';
import { LocalStorageKey, limitHistories } from '../constant';

export type TConfig = {
  LocalStorageKey?: string,
  limitHistories?: number,
  isEnableEnterDown?: boolean,
  handleSearch?: (value: string) => void,
};

export const config: TConfig = {
  LocalStorageKey,
  limitHistories,
  isEnableEnterDown: false,
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