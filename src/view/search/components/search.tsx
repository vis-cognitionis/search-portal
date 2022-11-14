import React, { useState, useEffect } from "react";

import { IconUser } from "core/components/icons/icons";
import { DataProps } from "core/interfaces/data_interface";
import mockData from "mock_data.json";
import SearchBar from "./searchbar";
import "../styles/search_styles.scss";

export const mainData: DataProps[] = JSON.parse(
  localStorage.getItem("mainData")!
);

const SearchArea = () => {
  useEffect(() => {
    localStorage.setItem(
      "mainData",
      JSON.stringify(
        mockData.data.map((item) =>
          item.reduce((data, value, index) => {
            return { ...data, [mockData.cols[index].toLowerCase()]: value };
          }, {} as DataProps)
        )
      )
    );
  }, []);

  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState(mainData);

  useEffect(() => {
    const filter = mainData.filter((item) => {
      const filteredItem: DataProps[] = Object.values(item);
      return (
        searchValue.length > 1 &&
        filteredItem
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    });
    setFilteredItems(filter);
  }, [searchValue]);

  const handleSearch = () => {
    localStorage.setItem("searchBarValue", searchValue);
    localStorage.setItem("searchBarMenu", JSON.stringify(filteredItems));
    localStorage.setItem("mainData", JSON.stringify(mainData));
    document.location.href = `${process.env.PUBLIC_URL}/results`;
  };

  return (
    <div className="searchContainer">
      <SearchBar
        handleSearch={handleSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      {filteredItems && filteredItems.length !== 0 ? (
        <div style={{ position: "relative" }}>
          <div className="searchBarMenu">
            <div className="searchBarScrollMenu">
              {filteredItems.length !== 0 &&
                filteredItems.slice(0, 3).map((item, index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                        }}
                      >
                        <div style={{ marginTop: "15px" }}>
                          <IconUser />
                        </div>
                        <div>
                          <p className="nameSurname">{item["name surname"]}</p>

                          <div className="smallTexts">
                            <small>{item.email}</small>
                            <br />
                            <small>{item.company}</small>
                            <br />
                            <small>{item.country}</small>
                            <br />

                            <small>{item.city}</small>
                            <br />
                            <small>{item.date}</small>
                          </div>
                        </div>
                      </div>

                      {index !== filteredItems.length - 1 && (
                        <hr
                          style={{
                            width: "100%",
                            border: "1px solid #666666",
                            opacity: 0.1,
                          }}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
          <p
            onClick={() => searchValue !== "" && handleSearch()}
            className="showMore"
          >
            Show more...
          </p>
        </div>
      ) : null}
    </div>
  );
};
export default SearchArea;
