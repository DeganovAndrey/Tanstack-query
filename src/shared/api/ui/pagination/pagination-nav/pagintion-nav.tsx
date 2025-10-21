import { getPaginationPages } from "../utils/get-paginatioan-pages";
import s from "./pagination-nav.module.css";
// import { getPaginationPages } from "../utils/get-pagination-pages.ts";

type Props = {
  currentPage: number;
  pagesCount: number;
  onChange: (page: number) => void;
  isFetching: boolean;
};

const SIBLING_COUNT = 1;

export const PaginationNav = ({ currentPage, pagesCount, onChange }: Props) => {
  const pages = getPaginationPages(currentPage, pagesCount, SIBLING_COUNT);

  return (
    <div className={s.pagination}>
      {pages.map((item, idx) =>
        item === "..." ? (
          <span className={s.ellipsis} key={`ellipsis-${idx}`}>
            ...
          </span>
        ) : (
          <button
            key={item}
            className={
              item === currentPage
                ? `${s.pageButton} ${s.pageButtonActive}`
                : s.pageButton
            }
            onClick={() => item !== currentPage && onChange(Number(item))}
            disabled={item === currentPage}
            type="button"
          >
            {item}
          </button>
        )
      )}
    </div>
  );
};
