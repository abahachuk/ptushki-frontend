import React, { useCallback, useState, FC, ReactNode, Fragment } from "react";
import { Button, DropdownItem, Input } from "reactstrap";

import { CustomDropdown } from "../dropdown/Dropdown";
import "./Autosuggest.scss";
import { CheckboxField } from "../checkbox/CheckboxField";
import { labels } from "../../config/i18n/labels";

interface Item {
  label: string;
  value: string;
  id: number | string;
  checked?: boolean;
}

export interface IChangeValue {
  value: string;
  type: string;
  checked?: boolean;
}

export interface IAutosuggest {
  collection?: Array<Item>;
  placeholder?: string;
  searchPlaceholder?: string;
  value?: string;
  onChangeValue?: ({ value, type, checked }: IChangeValue) => void;
  type?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  toggleButton?: ReactNode;
  multiselect?: boolean;
}

const blockName = "autosuggest";

export const Autosuggest: FC<IAutosuggest> = ({
  collection,
  placeholder,
  searchPlaceholder,
  value,
  onChangeValue,
  type = "",
  className,
  id,
  disabled,
  toggleButton,
  multiselect
}) => {
  const withSearch = collection.length > 7;
  const withSearchContainer = withSearch || multiselect;

  const [list, setCollection] = useState(collection);
  const [selectedItems, setSelectedItems] = useState(
    collection.filter(item => item.checked).map(item => item.id)
  );

  const onSelect = useCallback(
    (items: Item[], checked: boolean = true) => {
      onChangeValue({
        value: multiselect
          ? items.map(item => item.value).toString()
          : items[0].value,
        type,
        checked
      });
      setCollection(list);
      setSelectedItems(
        checked
          ? selectedItems.concat(items.map(item => item.id))
          : selectedItems.filter(
              selectedId => !items.some(item => item.id === selectedId)
            )
      );
    },
    [onChangeValue, multiselect, type, list, selectedItems]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setCollection(
        collection.filter(item =>
          item.label.toLowerCase().includes(e.target.value.toLowerCase())
        )
      ),
    [collection]
  );

  const renderItem = useCallback(
    (item: Item) => {
      const commonProps = { value: item.value, key: item.id };
      const handleSelect = (e: any, checked?: boolean) =>
        onSelect([item], checked);

      return multiselect ? (
        <CheckboxField
          label={item.label}
          onChange={handleSelect}
          checked={selectedItems.includes(item.id)}
          {...commonProps}
        />
      ) : (
        <DropdownItem
          onClick={handleSelect}
          className={`${blockName}__item`}
          {...commonProps}
        >
          {item.label}
        </DropdownItem>
      );
    },
    [multiselect, selectedItems, onSelect]
  );
  const someSelected =
    multiselect && list.some(item => selectedItems.includes(item.id));
  const everySelected =
    multiselect && !!list.length && selectedItems.length >= list.length;

  return (
    <CustomDropdown
      value={value}
      placeholder={placeholder}
      toggleButton={toggleButton}
      id={id}
      disabled={disabled}
      className={className}
    >
      {withSearchContainer && (
        <div className={`${blockName}__search-container d-flex flex-column`}>
          {withSearch && (
            <Input
              placeholder={searchPlaceholder}
              className={`${blockName}__input-field`}
              onChange={onChange}
            />
          )}
          {multiselect && (
            <Fragment>
              <Button
                color="link"
                className="text-dark align-self-end"
                style={{ fontSize: "12px", padding: 0 }}
                onClick={() =>
                  onSelect(
                    collection.filter(item => selectedItems.includes(item.id)),
                    false
                  )
                }
              >
                {labels.clear}
              </Button>
              <CheckboxField
                checked={everySelected}
                indeterminate={!everySelected && someSelected}
                label={labels.selectAll}
                onChange={(e, checked) => {
                  onSelect(list, checked);
                }}
              />
            </Fragment>
          )}
        </div>
      )}
      <div className={`${blockName}__menu`}>{list.map(renderItem)}</div>
    </CustomDropdown>
  );
};
