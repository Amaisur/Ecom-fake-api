import React from 'react';
import { Autocomplete, Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { useState, useCallback, useMemo } from 'react';

function Search({products}) {
  const deselectedOptions = useMemo(
    () => [
      { value: 'rustic', label: 'Rustic' },
      { value: 'antique', label: 'Antique' },
      { value: 'vinyl', label: 'Vinyl' },
      { value: 'vintage', label: 'Vintage' },
      { value: 'refurbished', label: 'Refurbished' },
    ],
    []
  );
  
  const [selectedOptions, setSelectedOptions] = useState([]);  // No type annotation
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value) => {  // No type annotation
      setInputValue(value);
      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );

  const updateSelection = useCallback(
    (selected) => {  // No type annotation
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0] || '');
    },
    [options]
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      prefix={<Icon source={SearchIcon} tone="base" />}
      placeholder="Search"
      autoComplete="off"
    />
  );

  return (
    <div style={{ height: '225px' }}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
      />
    </div>
  );
}

export default Search;
