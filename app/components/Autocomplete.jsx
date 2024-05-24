import { IconButton } from "@instructure/ui-buttons";
import {
  IconSearchLine,
  IconStarSolid,
  IconTroubleLine,
} from "@instructure/ui-icons";
import { Select } from "@instructure/ui-select";
import { View } from "@instructure/ui-view";
import { useState } from "react";
import PropTypes from "prop-types";

const Autocomplete = ({
  dataset,
  label,
  selectedOption,
  onSelectedOptionChange,
  name = "",
  focus = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isShowingOptions, setIsShowingOptions] = useState(false);
  const [highlightedOptionId, setHighlightedOptionId] = useState(null);

  const [filteredOptions, setFilteredOptions] = useState(dataset);

  const getOptionById = (queryId) => {
    return dataset.find(({ id }) => id === queryId);
  };

  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  // Better: Adjust the state while rendering
  const [prevDataset, setPrevDataset] = useState(dataset);
  if (dataset !== prevDataset) {
    setPrevDataset(dataset);
    setFilteredOptions(dataset);
  }

  const filterOptions = (value) => {
    return dataset.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
  };

  const matchValue = () => {
    // an option matching user input exists
    if (filteredOptions.length === 1) {
      const onlyOption = filteredOptions[0];
      // automatically select the matching option
      if (onlyOption.label.toLowerCase() === inputValue.toLowerCase()) {
        return {
          inputValue: onlyOption.label,
          selectedOption: onlyOption.id,
          filteredOptions: filterOptions(""),
        };
      }
    }
    // allow user to return to empty input and no selection
    if (inputValue.length === 0) {
      return { selectedOption: null, inputValue: "" };
    }
    // no match found, return selected option label to input
    if (selectedOption) {
      const selected = getOptionById(selectedOption);
      return { inputValue: selected.label };
    }
    // input value is from highlighted option, not user input
    // clear input, reset options
    if (highlightedOptionId) {
      if (inputValue === getOptionById(highlightedOptionId).label) {
        return {
          inputValue: "",
          filteredOptions: filterOptions(""),
        };
      }
    }
  };

  const handleShowOptions = (event) => {
    setIsShowingOptions(true);
  };

  const handleHideOptions = (event) => {
    setIsShowingOptions(false);
    setHighlightedOptionId(null);
    const value = matchValue().inputValue;

    setInputValue(value);
  };

  const handleBlur = (event) => {
    setHighlightedOptionId(null);
  };

  const handleHighlightOption = (event, { id }) => {
    event.persist();
    const option = getOptionById(id);
    if (!option) return; // prevent highlighting of empty option
    setHighlightedOptionId(id);
    setInputValue(event.type === "keydown" ? option.label : inputValue);
  };

  const handleSelectOption = (event, { id }) => {
    const option = getOptionById(id);
    if (!option) return; // prevent selecting of empty option
    onSelectedOptionChange(id);
    setInputValue("");
    setIsShowingOptions(false);
    setFilteredOptions(dataset);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const newOptions = filterOptions(value);
    setInputValue(value);
    setFilteredOptions(newOptions);
    setHighlightedOptionId(newOptions.length > 0 ? newOptions[0].id : null);
    setIsShowingOptions(true);
  };

  const handleClearInput = (event) => {
    setIsShowingOptions(false);
    setHighlightedOptionId(null);
    onSelectedOptionChange("");
    setFilteredOptions(filterOptions(""));
    setInputValue("");
  };

  const renderAfterInput = () => {
    if (!inputValue.length && !selectedOption) {
      return null;
    }

    return (
      <IconButton
        type="button"
        size="small"
        withBackground={false}
        withBorder={false}
        screenReaderLabel="Clear search"
        onClick={handleClearInput}
      >
        <IconTroubleLine />
      </IconButton>
    );
  };

  return (
    <View as="div">
      <input type="hidden" name={name} value={selectedOption || ""} />
      <Select
        id={`autocomplete_${name}`}
        aria-describedby={`Select a ${name}`}
        autoFocus={focus}
        isInline={true}
        renderLabel={label}
        assistiveText="Type or use arrow keys to navigate options."
        placeholder="Start typing to search..."
        inputValue={
          inputValue.length > 0
            ? inputValue
            : getOptionById(selectedOption)?.label
        }
        isShowingOptions={isShowingOptions}
        onBlur={handleBlur}
        onInputChange={handleInputChange}
        onRequestShowOptions={handleShowOptions}
        onRequestHideOptions={handleHideOptions}
        onRequestHighlightOption={handleHighlightOption}
        onRequestSelectOption={handleSelectOption}
        renderBeforeInput={<IconSearchLine inline={false} />}
        renderAfterInput={renderAfterInput()}
        width="100%"
      >
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => {
            return (
              <Select.Option
                id={`option-${name}-${option.id}`}
                value={option.id}
                key={`autocomp-option-${name}-${option.id}`}
                isHighlighted={option.id === highlightedOptionId}
                isSelected={option.id === selectedOption}
                isDisabled={option.disabled}
                renderBeforeLabel={option.showIcon && <IconStarSolid />}
              >
                {option.label}
              </Select.Option>
            );
          })
        ) : (
          <Select.Option id={`empty-option-${name}`} key="empty-option">
            No results found
          </Select.Option>
        )}
      </Select>
    </View>
  );
};

Autocomplete.propTypes = {
  dataset: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, label: PropTypes.string })
  ),
  label: PropTypes.string.isRequired,
  selectedOption: PropTypes.string,
  onSelectedOptionChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  focus: PropTypes.bool,
};

export default Autocomplete;
