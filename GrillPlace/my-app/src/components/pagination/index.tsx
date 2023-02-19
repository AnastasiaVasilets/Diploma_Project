import ReactPaginate from 'react-paginate';

import styles from './pagination.module.css'

type PaginationProps = {
    currentPage: number;
    onChangePage: (number: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
    return (
        <div>
            <ReactPaginate
            className={styles.pagination}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={6}
            pageCount={6}
            forcePage={currentPage - 1}
            previousLabel="<"
        />
      </div>
    )
}

export default Pagination