import AuthenticatedLayout from '../../layouts/AuthenticatedLayout'
import RoleSelectInput from '../../components/RoleSelectInput'
import useUsers from '../../hooks/useUsers'
import Spinner from '../../components/Spinner'
import Error from '../../components/Error'

const Dashboard = () => {
  const { error, isLoading, users } = useUsers()

  return (
    <AuthenticatedLayout>
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
                  <div className="overflow-auto">
                    <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-nowrap">
                          <th className="p-3">Name</th>
                          <th className="p-3">Email</th>
                          <th className="p-3">Role</th>
                        </tr>
                      </thead>

                      <tbody>
                        {users.map((user) => (
                          <tr
                            key={user.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <td className="px-3 py-2">XXX</td>
                            <td className="px-3 py-2">{user.email}</td>
                            <td className="px-3 py-2">
                              <RoleSelectInput user={user} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
export default Dashboard
