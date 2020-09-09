import React, { ReactElement, cloneElement, useState, useRef } from "react";
import { LocalStorageKey as KEYWORDS_KEY_DEFAULT, ENTER_KEY_CODE, limitHistories as LIMIT_HISTORIES_DEFAULT } from "../constant";

import { useConfig } from "../components/context";
import { Hint } from './Hint';

type TProps = {
  onClick?: (value: string) => void;
}

export const History: React.FC<TProps> & {
  Hint: typeof Hint;
} = (props) => {
  const child = React.Children.only(props.children) as ReactElement<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >;

  const inputRef = useRef<HTMLInputElement>(null);
  const { LocalStorageKey, isEnableEnterDown, handleSearch, limitHistories } = useConfig();

  const _KEYWORDS_KEY = LocalStorageKey || KEYWORDS_KEY_DEFAULT;
  const _LIMIT_HISTORIES = limitHistories || LIMIT_HISTORIES_DEFAULT;

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
      let keyHistory: string[] = [];
      if (historiesString) {
        keyHistory = JSON.parse(historiesString) as string[];
        if (keyHistory.length === _LIMIT_HISTORIES) keyHistory.pop();
        // khac thi moi luu vao local storage
        if (keyHistory.every((key) => key !== inputRef.current!.value)) {
          keyHistory.unshift(inputRef.current.value);
        }
      } else {
        keyHistory = [inputRef.current.value];
      }
      localStorage.setItem(_KEYWORDS_KEY, JSON.stringify(keyHistory));
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

History.Hint = Hint;