import { Link } from 'react-router-dom'
import useChecks from '../../hooks/useChecks'
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import TextInput from '../../components/TextInput'
import SelectInput from '../../components/SelectInput'
import Pagination from '../../components/Pagination'
import { ArrowsUpDownIcon } from '@heroicons/react/16/solid'
import useAuthContext from '../../hooks/useAuthContext'

const Test = () => {
  const {
    totalChecks,
    totalPages,
    page,
    size,
    error,
    isLoading,
    filter,
    checks,
    handleDelete,
    handleDueDateSort,
    handleFilterChange,
    handlePageChange,
    handleNextPage,
    handlePrevPage,
  } = useChecks()

  const [auth] = useAuthContext()

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Checks
          </h2>
          {auth.user.role !== 'accountant' && (
            <Link
              to="/checks/create"
              className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
            >
              Add new
            </Link>
          )}
        </div>
      }
    >
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {error ? (
            <Error message={error} />
          ) : (
            <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
              <div className="p-6 text-gray-900 dark:text-gray-100">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    <div className="overflow-auto">
                      <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr className="text-nowrap">
                            <th
                              className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                              name="id"
                            >
                              Customer
                            </th>
                            <th
                              className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                              name="id"
                            >
                              Bank
                            </th>
                            <th
                              className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                              name="name"
                            >
                              Amount
                            </th>

                            <th
                              className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                              name="status"
                            >
                              <button
                                className="inline-flex items-center justify-center gap-2 uppercase whitespace-nowrap hover:bg-red-200"
                                onClick={handleDueDateSort}
                              >
                                Due date <ArrowsUpDownIcon className="w-6" />
                              </button>
                            </th>

                            <th
                              className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                              name="created_at"
                            >
                              Type
                            </th>

                            <th
                              className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                              name="due_date"
                            >
                              Status
                            </th>
                            {auth.user.role !== 'accountant' && (
                              <th className="px-3 py-3 text-center">Actions</th>
                            )}
                          </tr>
                        </thead>
                        <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr className="text-nowrap">
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>

                            <th className="px-3 py-3">
                              <SelectInput
                                className="w-full"
                                value={filter}
                                onChange={handleFilterChange}
                              >
                                <option value="">Select Status</option>
                                <option value="enCours">En Cours</option>
                                <option value="solde">Solde</option>
                              </SelectInput>
                            </th>
                            {auth.user.role !== 'accountant' && (
                              <th className="px-3 py-3"></th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {checks.map((check) => (
                            <tr
                              key={check.id}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                              <td className="px-3 py-2">{check.entite.name}</td>
                              <td className="px-3 py-2">{check.bank}</td>

                              <th className="px-3 py-2 ">{check.amount}</th>
                              <td className="px-3 py-2">{check.dueDate}</td>
                              <td className="px-3 py-2 text-nowrap">
                                {check.type}
                              </td>
                              <td className="px-3 py-2 text-nowrap">
                                <span
                                  className={`bg-${
                                    check.status === 'solde' ? 'red' : 'yellow'
                                  }-600 px-2 py-1 text-white  rounded text-nowrap`}
                                >
                                  {check.status}
                                </span>
                              </td>
                              {auth.user.role !== 'accountant' && (
                                <td className="px-3 py-2 text-center ">
                                  <Link
                                    to={`/checks/edit/${check.id}`}
                                    className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                  >
                                    Edit
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(check.id)}
                                    className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline"
                                  >
                                    Delete
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination
                      page={page}
                      size={size}
                      totalPages={totalPages}
                      totalChecks={totalChecks}
                      handlePageChange={handlePageChange}
                      handleNextPage={handleNextPage}
                      handlePrevPage={handlePrevPage}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
export default Test
