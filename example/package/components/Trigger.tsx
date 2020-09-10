import React, { ReactElement, cloneElement } from "react";
import { LocalStorageKey as KEYWORDS_KEY_DEFAULT, limitHistories as LIMIT_HISTORIES_DEFAULT } from "../constant";
import { useConfig } from "./context";

type TProp = {
  dataId: string;
  onClick?: (value: string) => void,
};

export const Trigger: React.FC<TProp> = (props) => {
  const child = React.Children.only(props.children) as ReactElement<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >;

  const { LocalStorageKey, limitHistories, handleSearch } = useConfig();

  const _KEYWORDS_KEY = LocalStorageKey || KEYWORDS_KEY_DEFAULT;
  const _LIMIT_HISTORIES = limitHistories || LIMIT_HISTORIES_DEFAULT;

  const { dataId } = props;

  const childProps = child.props;

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const historiesString = localStorage.getItem(_KEYWORDS_KEY);
    const input = document.getElementById(dataId) as HTMLInputElement;
    if (input && input.value) {
      let keyHistory: string[] = [];
      if (historiesString) {
        keyHistory = JSON.parse(historiesString) as string[];
        if (keyHistory.length === _LIMIT_HISTORIES) keyHistory.pop();
        // khac thi moi luu vao local storage
        if (keyHistory.every((key) => key !== input.value)) {
          keyHistory.unshift(input.value);
        }
      } else {
        keyHistory = [input.value];
      }
      handleSearch && handleSearch(input.value)
      props.onClick && props.onClick(input.value)
      localStorage.setItem(_KEYWORDS_KEY, JSON.stringify(keyHistory));
    }
    childProps.onClick && childProps.onClick(e);
  };

  const trigger = cloneElement(child as any, {
    ...childProps,
    onClick
  });

  return trigger;
};
