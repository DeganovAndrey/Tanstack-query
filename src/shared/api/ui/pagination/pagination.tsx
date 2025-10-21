import { PaginationNav } from "./pagination-nav/pagintion-nav";
import s from "./Pagination.module.css";

type Props = {
  currentPage: number;
  pagesCount: number;
  onPageNumberChange: (page: number) => void;
  isFetching: boolean;
};

export const Pagination = ({
  currentPage,
  pagesCount,
  onPageNumberChange,
  isFetching,
}: Props) => {
  return (
    <div className={s.container}>
      <hr />
      <PaginationNav
        currentPage={currentPage}
        pagesCount={pagesCount}
        isFetching={isFetching}
        onChange={onPageNumberChange}
      />
      {isFetching && "⌛️"}
    </div>
  );
};
