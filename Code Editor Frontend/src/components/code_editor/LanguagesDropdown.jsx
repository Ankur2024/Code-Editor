import React from "react";
import Select from "react-select";
import { customStyles } from "../../constants/CustomStyles.js";
import LanguageOptions from "../../constants/LanguageOptions.js";

const LanguagesDropdown = ({ onSelectChange }) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={LanguageOptions}
      styles={customStyles}
      defaultValue={LanguageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;