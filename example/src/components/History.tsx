import React, { ReactElement, cloneElement, useState, useRef } from "react";
import { LocalStorageKey as KEYWORDS_KEY_DEFAULT, ENTER_KEY_CODE } from "../constant";

import { useConfig } from "../components/context";

type TProps = {
  onClick?: (value: string) => void;
}

export const History: React.FC<TProps> = (props) => {
  const child = React.Children.only(props.children) as ReactElement<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >;

  const inputRef = useRef<HTMLInputElement>(null);
  const { LocalStorageKey, isEnableEnterDown, handleSearch } = useConfig();

  const _KEYWORDS_KEY = LocalStorageKey || KEYWORDS_KEY_DEFAULT;

  const [nodes, setNodes] = useState<React.ReactNode[]>([]);
  const childProps = child.props;

  // Hàm render ra list lịch sử tìm kiếm
  const renderSearchHistory = () => {
    // Lấy lịch sử và lặp qua, từ đó tạo ra HTML string
    const historiesString = localStorage.getItem(_KEYWORDS_KEY);
    if (historiesString) {
      const histories = JSON.parse(historiesString) as string[];
      const tmp: React.ReactNode[] = [];
      for (let index = 0; index < histories.length; index++) {
        const newLi = (
          <li key={index} className="search-bar__history-item">
            <span 
              onClick={() => {
                props.onClick && props.onClick(histories[index]);
                handleSearch && handleSearch(histories[index]);
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              {histories[index]}
            </span>
            <span
              className="search-bar__history-remove"
              onClick={() => {
                histories.splice(index, 1);
                localStorage.setItem(_KEYWORDS_KEY, JSON.stringify(histories));
                renderSearchHistory();
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              Remove
            </span>
          </li>
        );
        tmp.push(newLi);
      }
      setNodes(tmp);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEnableEnterDown && e.keyCode === ENTER_KEY_CODE && inputRef && inputRef.current) {
      handleSearch && handleSearch(inputRef.current.value);
      const historiesString = localStorage.getItem(_KEYWORDS_KEY);
      if (historiesString) {
        const histories = JSON.parse(historiesString) as string[];
        histories.unshift(inputRef.current.value);
        localStorage.setItem(_KEYWORDS_KEY, JSON.stringify(histories));
      } else {
        localStorage.setItem(_KEYWORDS_KEY, JSON.stringify([inputRef.current.value]));
      }
    }
    childProps.onKeyDown && childProps.onKeyDown(e);
  }

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    renderSearchHistory();
    childProps.onFocus && childProps.onFocus(e);
  };

  const mainInput = cloneElement(child as any, {
    ...childProps,
    ref: inputRef,
    className: `${childProps.className} search-bar__input`,
    autoComplete: "off",
    onFocus,
    onKeyDown
  });

  return (
    <>
      {mainInput}
      <ul className="search-bar__history">{nodes.map((node) => node)}</ul>
    </>
  );
};
