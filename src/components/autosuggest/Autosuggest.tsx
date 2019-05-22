import React, { useCallback, useState, FC } from "react";
import sn from "classnames";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from "reactstrap";

import "./Autosuggest.scss";

interface Item {
  label: string;
  value: string;
  id: number | string;
}

interface Autosuggest {
  collection: Array<Item>;
  placeholder?: string;
  searchPlaceholder?: string;
  value: string;
  onChangeValue: (value: string) => void;
}

const blockName = "autosuggest";

export const Autosuggest: FC<Autosuggest> = ({
  collection,
  placeholder,
  searchPlaceholder,
  value,
  onChangeValue
}) => {
  const [isOpen, toggleOpen] = useState(false);
  const [list, setCollection] = useState(collection);

  const toggleDropdown = () => toggleOpen(!isOpen);

  const onSelect = useCallback(
    (e: any) => {
      onChangeValue(e.target.value);
      setCollection(collection);
    },
    [collection, onChangeValue]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setCollection(
        collection.filter(
          item =>
            item.value.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
            -1
        )
      ),
    [collection]
  );

  const renderItem = useCallback(
    (item: Item) => (
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
    <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
      <DropdownToggle
        outline
        className={sn(
          `${blockName}__dropdown`,
          value && `${blockName}__dropdown--value`
        )}
      >
        {value || placeholder}
      </DropdownToggle>
      <DropdownMenu className={`${blockName}__menu-container`}>
        <div className={`${blockName}__search-container`}>
          <Input
            placeholder={searchPlaceholder}
            className={`${blockName}__input-field`}
            onChange={onChange}
          />
        </div>
        <div className={`${blockName}__menu`}>{list.map(renderItem)}</div>
      </DropdownMenu>
    </Dropdown>
  );
};
