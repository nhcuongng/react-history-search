import React, { ReactElement, cloneElement, useState, useRef, useEffect } from "react";
import { LocalStorageKey as KEYWORDS_KEY_DEFAULT, ENTER_KEY_CODE } from "../constant";
import { interpolateStyle } from '../utils';

import { useConfig } from "./context";

type TProps = {
  onClick?: (value: string) => void;
  allowTabFill?: boolean,
}

export const Hint: React.FC<TProps> = (props) => {
  const child = React.Children.only(props.children) as ReactElement<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >;

  const inputRef = useRef<HTMLInputElement>(null);
  let hintRef = useRef<HTMLInputElement>(null);
  const [hint, setHint] = useState('');

  const { LocalStorageKey, isEnableEnterDown, handleSearch } = useConfig();

  const _KEYWORDS_KEY = LocalStorageKey || KEYWORDS_KEY_DEFAULT;

  const [nodes, setNodes] = useState<React.ReactNode[]>([]);
  const childProps = child.props;

  useEffect(() => {
    const inputStyle = inputRef.current && window.getComputedStyle(inputRef.current);
    inputStyle && styleHint(hintRef, inputStyle);
  });

  const styleHint = (
    hintRef: React.RefObject<HTMLInputElement>,
    inputStyle: CSSStyleDeclaration) => {
    if (hintRef?.current?.style) {
        hintRef.current.style.fontSize = inputStyle.fontSize;
        hintRef.current.style.width = inputStyle.width;
        hintRef.current.style.height = inputStyle.height;
        hintRef.current.style.lineHeight = inputStyle.lineHeight;
        hintRef.current.style.boxSizing = inputStyle.boxSizing;
        hintRef.current.style.margin = interpolateStyle(inputStyle, 'margin');
        hintRef.current.style.padding = interpolateStyle(inputStyle, 'padding');
        hintRef.current.style.borderStyle = interpolateStyle(inputStyle, 'border', 'style');
        hintRef.current.style.borderWidth = interpolateStyle(inputStyle, 'border', 'width');
    }
  };

  const getHint = (text: string) => {
    if (!text || text === '') {
        return '';
    }

    const options = JSON.parse(localStorage.getItem(_KEYWORDS_KEY) || JSON.stringify([''])) as string[];
    const match = options
        .filter(x => x.toLowerCase() !== text.toLowerCase() && x.toLowerCase().startsWith(text.toLowerCase()))
        .sort()[0];

    // While Text matching is case-insensitive, the casing entered by the user so far should be
    // preserved in the hint for UX benefits and also without the preservation, the hint won't
    // overlap well if user types a different case from the selected option.
    return match
        ? text + match.slice(text.length)
        : '';
  };

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
              &#10060;
            </span>
          </li>
        );
        tmp.push(newLi);
      }
      setNodes(tmp);
    }
  };

  const RIGHT = 39;
  const TAB = 9;
  const _onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const cursorIsAtTextEnd = (() => {
        // For selectable input types ("text", "search"), only select the hint if
        // it's at the end of the input value. For non-selectable types ("email",
        // "number"), always select the hint.

        const isNonSelectableType = e.currentTarget.selectionEnd == null;
        const cursorIsAtTextEnd = isNonSelectableType
            ? true
            : e.currentTarget.selectionEnd === e.currentTarget.value.length;

        return cursorIsAtTextEnd;
    })();

    const setAvailableHint = () => {
        if (hint !== '' && e.currentTarget.value !== hint) {
            e.currentTarget.value = hint;
            childProps.onChange && childProps.onChange(e as any);
            setHint('');
        }
    };

    if (cursorIsAtTextEnd && e.keyCode === RIGHT) {
        setAvailableHint();
    } else if (cursorIsAtTextEnd && props.allowTabFill && e.keyCode === TAB && hint !== '') {
        e.preventDefault();
        setAvailableHint();
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
    _onKeyDown(e)
    childProps.onKeyDown && childProps.onKeyDown(e);
  }

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    renderSearchHistory();
    setHint(getHint(e.target.value));
    childProps.onFocus && childProps.onFocus(e);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHint(getHint(e.target.value));
    childProps.onChange && childProps.onChange(e);
  };


  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setHint('');
      childProps.onBlur && childProps.onBlur(e);
  };

  const mainInput = cloneElement(
    child as any, {
    ...childProps,
    ref: inputRef,
    placeholder: childProps.placeholder || 'Search something',
    className: `${childProps.className} search-bar__input`,
    autoComplete: "off",
    onFocus,
    onKeyDown,
    onChange,
    onBlur,
  });

  return (
    <div
      style={{
          position: 'relative',
          display: 'inline-block'
      }}
    >
      {mainInput}
      <input
        className="rah-input-hint"
        defaultValue={hint}
        ref={hintRef}
        style={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            boxShadow: 'none',
            color: 'rgba(0, 0, 0, 0.35)',
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            left: 0
        }}
        tabIndex={-1}
      />
      <ul className="search-bar__history">{nodes.map((node) => node)}</ul>
    </div>
  );
};
