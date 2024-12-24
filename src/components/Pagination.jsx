import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'

function Pagination({
  page,
  size,
  totalPages,
  totalChecks,
  handlePageChange,
  handleNextPage,
  handlePrevPage,
}) {
  const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1)
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:bg-gray-200 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:bg-gray-200 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{(page - 1) * size + 1}</span>{' '}
            to{' '}
            <span className="font-medium">
              {page !== totalPages ? size * page : totalChecks}
            </span>{' '}
            of <span className="font-medium">{totalChecks}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="inline-flex -space-x-px rounded-md shadow-sm isolate"
          >
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-200"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="w-5 h-5" />
            </button>
            {pagesArray.map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 ${
                  page === p
                    ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 dark:text-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={totalPages === page}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-200 "
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
export default Pagination
