import React, { SetStateAction } from "react";
import FilledButton from "core/components/buttons/filled_button";
import { IconSearch } from "core/components/icons/icons";
import "../styles/search_styles.scss";

const SearchBar = ({
  searchValue,
  setSearchValue,
  handleSearch,
  type = "text",
  icon = true,
  style,
}: {
  searchValue: string;
  setSearchValue: React.Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
  type?: React.HTMLInputTypeAttribute;
  icon?: boolean;
  style?: React.CSSProperties;
}) => {
  return (
    <form className="inputAreaContainer" onSubmit={(e) => e.preventDefault()}>
      <div className="inputArea">
        {icon && <IconSearch className="iconSearch" />}
        <input
          type={type}
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          className="searchBarInput"
          style={style}
        />
      </div>
      <FilledButton
        buttonName="Search"
        onClick={() => searchValue.length > 1 && handleSearch()}
        type="submit"
      />
    </form>
  );
};
export default SearchBar;
