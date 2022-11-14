import React, { useEffect, useState } from "react";

import { DataProps } from "core/interfaces/data_interface";
import { IconUser } from "core/components/icons/icons";
import { mainData } from "./search/components/search";
import Pagination from "./pagination/components/pagination";
import SearchBar from "./search/components/searchbar";
import Header from "./header/components/header";
import "./search/styles/search_styles.scss";
import "../view/styles.scss";

const ResultPage = () => {
  const data: DataProps[] = JSON.parse(localStorage.getItem("searchBarMenu")!);
  const searchBarValue: string = localStorage.getItem("searchBarValue")!;

  const [searchValue, setSearchValue] = useState<string>(searchBarValue);
  const [filteredItems, setFilteredItems] = useState<any>(data);
  const [sortName, setSortName] = useState<boolean>(false);
  const [sortDate, setSortDate] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<string>("");

  const handleSearch = () => {
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
    setCurrentPage(1);
  };

  useEffect(() => {
    searchValue.length === 0 && setFilteredItems(mainData);
  }, [searchValue]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemCount: number = 12;
  const pageCount: number = Math.ceil(
    filteredItems && filteredItems.length / itemCount
  );

  const getCurrentTableData = (): DataProps[] => {
    return (
      filteredItems &&
      filteredItems
        .sort((a: any, b: any) => {
          let nameA = a["name surname"].toLowerCase();
          let nameB = b["name surname"].toLowerCase();

          const dateA = a.date.split("/");
          const dateB = b.date.split("/");
          let fdateA = new Date(`${dateA[1]} ${dateA[0]} ${dateA[2]}`);
          let fdateB = new Date(`${dateB[1]} ${dateB[0]} ${dateB[2]}`);

          if (sortType === "nameSurname") {
            if (sortName) {
              if (nameA < nameB) {
                return -1;
              }
            } else {
              if (nameA > nameB) {
                return -1;
              }
            }
          } else {
            if (sortDate) {
              if (fdateA < fdateB) {
                return -1;
              }
            } else {
              if (fdateA > fdateB) {
                return -1;
              }
            }
          }
        })
        .slice(currentPage * itemCount - itemCount, currentPage * itemCount)
    );
  };

  const sortButtons = [
    {
      name: "Name ascending",
      onclick: () => {
        setSortType("nameSurname");
        setSortName(true);
        setIsClicked("Name ascending");
      },
    },
    {
      name: "Name descending",
      onclick: () => {
        setSortType("nameSurname");
        setSortName(false);
        setIsClicked("Name descending");
      },
    },
    {
      name: "Year ascending",
      onclick: () => {
        setSortType("date");
        setSortDate(true);
        setIsClicked("Year ascending");
      },
    },
    {
      name: "Year descending",
      onclick: () => {
        setSortType("date");
        setSortDate(false);
        setIsClicked("Year descending");
      },
    },
  ];

  return (
    <>
      <Header status="result" style={{ justifyContent: "space-between" }}>
        <SearchBar
          type="search"
          handleSearch={handleSearch}
          icon={false}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          style={{ paddingLeft: "12px" }}
        />
      </Header>

      <div className="resultSection">
        <div className="resultListContainer">
          <div
            style={{
              position: "relative",
            }}
          >
            <div className="resultList">
              {getCurrentTableData().length > 0 ? (
                getCurrentTableData().map((item, index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className="resultListItem">
                        <div className="listItem">
                          <IconUser />
                          <div className="listItem2">
                            <p style={{ margin: 0 }}>{item.company}</p>
                            <small style={{ color: "#72777A" }}>
                              {item.country} {""} {item.city}
                            </small>
                          </div>
                        </div>
                        <div className="listItem3">
                          <small>{item["name surname"]}</small>
                          <p className="" style={{ margin: 0 }}>
                            {item.date}
                          </p>
                        </div>
                      </div>
                      {index !== getCurrentTableData().length - 1 && (
                        <hr className="resultLine" />
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="noResult">
                  There are no results that match your search!
                </p>
              )}
            </div>

            <button
              style={{ position: "absolute", right: -180, top: "-5px" }}
              className="orderBy"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <img src="order.png" /> Order By
            </button>
            {openMenu && (
              <div
                style={{ position: "absolute", right: -210, top: "40px" }}
                className="menuContainer"
              >
                {sortButtons.map((button) => {
                  return (
                    <button
                      style={{
                        ...(isClicked === button.name && {
                          backgroundColor: "#B3B3B3",
                          color: "#FFFFFF",
                        }),
                      }}
                      className="menuButtons"
                      onClick={button.onclick}
                    >
                      {button.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {Boolean(pageCount > 3) && (
          <div className="pagination">
            <Pagination
              pageCount={pageCount}
              pageIndex={currentPage}
              setPageIndex={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default ResultPage;
