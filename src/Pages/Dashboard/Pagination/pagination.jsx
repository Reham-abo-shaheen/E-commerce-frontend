import ReactPaginate from 'react-paginate';
import "./pagination.css"
// Example items, to simulate fetching from another resources.



export default function PaginatedItems({ itemsPerPage, setPage, total }) {
    const pageCount = total / itemsPerPage;


    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={(e) => setPage(e.selected + 1)}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                containerClassName="custom-pagination flex items-center justify-center bg-white p-2 rounded-md"
                pageLinkClassName="page-tag-ancor mx-2 text-color rounded-full"
                activeClassName="bg-pink"
                activeLinkClassName="bg-highlight text-white"
                nextLinkClassName="text-highlight"
                previousLinkClassName="text-highlight"
            />
        </>
    );
}