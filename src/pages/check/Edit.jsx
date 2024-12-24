import { useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import AuthenticatedLayout from '../../layouts/AuthenticatedLayout'

import InputLabel from '../../components/InputLabel'
import SelectInput from '../../components/SelectInput'

import customerService from '../../services/customers'
import checkService from '../../services/checks'
import TextInput from '../../components/TextInput'
import InputError from '../../components/InputError'

const Edit = () => {
  const { id } = useParams()
  const [customers, setCustomers] = useState([])
  const [formData, setFormData] = useState({
    bank: '',
    amount: '',
    dueDate: '',
    status: '',
    type: 'versable',
    entite: '',
  })
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    checkService.getById(id).then((check) => setFormData(check))
  }, [id])
  console.log('form data =>', formData)

  useEffect(() => {
    customerService.getAll().then((customers) => setCustomers(customers))
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    try {
      await checkService.update(id, formData)
      navigate('/checks')
    } catch (error) {
      setError(error.response.data.error)
    }
  }
  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Edit Check
          </h2>
        </div>
      }
    >
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <form
              onSubmit={handleSubmit}
              className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="status" value="Status" />
                <SelectInput
                  id="status"
                  name="status"
                  className="block w-full mt-1"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">--Please choose a status--</option>
                  <option value="enCours">En cours</option>
                  <option value="solde">Solde</option>
                </SelectInput>
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="customer" value="Customer" />
                <SelectInput
                  id="customer"
                  name="entite"
                  className="block w-full mt-1"
                  value={formData.entite}
                  onChange={handleChange}
                >
                  <option value="">--Please choose a customer--</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </SelectInput>
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="bank" value="Bank" />
                <TextInput
                  type="text"
                  id="bank"
                  name="bank"
                  value={formData.bank}
                  onChange={handleChange}
                  required
                  className="block w-full mt-1"
                />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="amount" value="Amount" />
                <TextInput
                  id="amount"
                  type="number"
                  step="0.001"
                  min="0"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="block w-full mt-1"
                />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="dueDate" value="Due date" />
                <TextInput
                  id="dueDate"
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="block w-full mt-1"
                />
              </div>
              <fieldset className="mt-4">
                <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Type
                </legend>
                <div className="mt-1">
                  <div className="flex items-center mb-6">
                    <input
                      type="radio"
                      name="type"
                      value="versable"
                      onChange={handleChange}
                      checked={formData.type === 'versable'}
                      id="versable"
                    />
                    <label htmlFor="versable" className="ms-3">
                      Versable
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="garentie"
                      onChange={handleChange}
                      checked={formData.type === 'garentie'}
                      id="garentie"
                    />
                    <label htmlFor="garentie" className="ms-3">
                      Garentie
                    </label>
                  </div>
                </div>
              </fieldset>
              {error && <InputError message={error} />}
              <div className="mt-4 text-right">
                <Link
                  to="/checks"
                  className="px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200"
                >
                  Cancel
                </Link>
                <button className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
export default Edit
