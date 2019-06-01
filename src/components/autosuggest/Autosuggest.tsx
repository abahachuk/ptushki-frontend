import React, { useCallback, useState, FC, ReactNode } from "react";
import { DropdownItem, Input } from "reactstrap";

import { CustomDropdown } from "../dropdown/Dropdown";

import "./Autosuggest.scss";

interface Item {
  label: string;
  value: string;
  id: number | string;
}

export interface IChangeValue {
  value: string;
  type: string;
}

export interface IAutosuggest {
  collection?: Array<Item>;
  placeholder?: string;
  searchPlaceholder?: string;
  value?: string;
  onChangeValue?: ({ value, type }: IChangeValue) => void;
  type?: string;
  toggleButton?: ReactNode;
}

const blockName = "autosuggest";

export const Autosuggest: FC<IAutosuggest> = ({
  collection,
  placeholder,
  searchPlaceholder,
  value,
  onChangeValue,
  type = "",
  toggleButton
}) => {
  const [list, setCollection] = useState(collection);

  const onSelect = useCallback(
    (e: any) => {
      onChangeValue({ value: e.target.value, type });
      setCollection(collection);
    },
    [collection, onChangeValue, type]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setCollection(
        collection.filter(
          item =>
            item.label.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
            -1
        )
      ),
    [collection]
  );

  const renderItem = useCallback(
    (item: Item) =>
      // @ts-ignore
      item.label && (
        <DropdownItem
          onClick={onSelect}
          value={item.value}
          key={item.id}
          className={`${blockName}__item`}
        >
          {item.label}
        </DropdownItem>
      ),
    [onSelect]
  );

  return (
    <CustomDropdown
      value={value}
      placeholder={placeholder}
      toggleButton={toggleButton}
    >
      {collection.length > 7 && (
        <div className={`${blockName}__search-container`}>
          <Input
            placeholder={searchPlaceholder}
            className={`${blockName}__input-field`}
            onChange={onChange}
          />
        </div>
      )}
      <div className={`${blockName}__menu`}>{list.map(renderItem)}</div>
    </CustomDropdown>
  );
};
