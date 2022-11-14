import React from "react";
import "../styles/pagination_styles.scss";

const Pagination = ({
  pageCount,
  pageIndex,
  setPageIndex,
}: {
  pageCount: number;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const pagination = [];
  let pageCountSet = [];
  let lastIndexes: any[] = [];

  for (let i = 1; i <= pageCount; i++) {
    pageCountSet.push(i);
  }

  switch (pageCount > 6) {
    case true:
      switch (pageIndex) {
        case 1:
          if (pageIndex === 1) {
            lastIndexes = pageCountSet.slice(pageIndex - 1, pageIndex + 2);
            lastIndexes.push(pageCount);
            lastIndexes.splice(lastIndexes.length - 1, 0, "...");
          }
          break;

        case pageCountSet[pageCountSet.length - 1]:
          if (pageIndex === pageCountSet[pageCountSet.length - 1]) {
            lastIndexes = pageCountSet.slice(pageIndex - 4, pageIndex);
            lastIndexes.unshift(1);
            lastIndexes.splice(1, 0, "...");
          }
          break;

        case pageCountSet[1]:
          if (pageIndex === pageCountSet[1]) {
            lastIndexes = pageCountSet.slice(0, pageIndex + 2);
            lastIndexes.push(pageCount);
            lastIndexes.splice(lastIndexes.length - 1, 0, "...");
          }
          break;

        case pageCountSet[2]:
          if (pageIndex === pageCountSet[2]) {
            lastIndexes = pageCountSet.slice(0, pageIndex + 2);
            lastIndexes.push(pageCount);
            lastIndexes.splice(lastIndexes.length - 1, 0, "...");
          }
          break;

        case pageCountSet[pageCountSet.length - 2]:
          if (pageIndex === pageCountSet[pageCountSet.length - 2]) {
            lastIndexes = pageCountSet.slice(pageIndex - 3, pageIndex + 1);
            lastIndexes.unshift(1);
            lastIndexes.splice(1, 0, "...");
          }
          break;

        case pageCountSet[pageCountSet.length - 3]:
          if (pageIndex === pageCountSet[pageCountSet.length - 3]) {
            lastIndexes = pageCountSet.slice(pageIndex - 2, pageIndex + 2);
            lastIndexes.unshift(1);
            lastIndexes.splice(1, 0, "...");
          }
          break;

        default:
          lastIndexes = pageCountSet.slice(pageIndex - 2, pageIndex + 1);
          lastIndexes.unshift(1);
          lastIndexes.push(pageCount);
          lastIndexes.splice(lastIndexes.length - 1, 0, "...");
          lastIndexes.splice(1, 0, "...");

          break;
      }
      break;

    default:
      for (let i = 1; i <= pageCount; i++) {
        pagination.push(
          <div
            key={i}
            className="pageButtons"
            style={{
              ...(pageIndex === i && {
                color: "#FFFFFF",
                backgroundColor: "#204080",
                border: "none",
              }),
            }}
          >
            <span onClick={() => setPageIndex(i)} className="page-link">
              {i}
            </span>
          </div>
        );
      }
      break;
  }

  lastIndexes.map((index) => {
    return pagination.push(
      <>
        {index !== "..." && (
          <div
            key={index}
            className="pageButtons"
            style={{
              ...(pageIndex === index && {
                color: "#FFFFFF",
                backgroundColor: "#204080",
                border: "none",
              }),
            }}
          >
            <span onClick={() => setPageIndex(index)} className="page-link">
              {index}
            </span>
          </div>
        )}
        {index === "..." && <div className="pageItem">...</div>}
      </>
    );
  });

  const nextFn = () => {
    setPageIndex((currentPage) => Math.min(currentPage + 1, pageCount));
  };

  const prevFn = () => {
    setPageIndex((currentPage) => Math.max(currentPage - 1, 1));
  };

  return (
    <div className="paginationContainer">
      <button
        className="paginationButtons"
        disabled={pageIndex === 1}
        onClick={() => prevFn()}
      >
        Previous
      </button>
      {pagination}
      <button
        className="paginationButtons"
        disabled={pageIndex === pageCount}
        onClick={() => nextFn()}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
