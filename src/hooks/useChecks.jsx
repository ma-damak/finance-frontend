import { useCallback, useEffect, useState } from 'react'

import checkService from '../services/checks'

const useChecks = () => {
  const [checks, setChecks] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalChecks, setTotalChecks] = useState(0)

  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [search, setSearch] = useState('')
  const [dueDateSort, setDueDateSort] = useState(1)
  const [filter, setFilter] = useState('')

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const handlePageChange = (p) => {
    if (p !== page) {
      setPage(p)
    }
  }
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleDueDateSort = () => {
    setDueDateSort(-dueDateSort)
  }

  const loadChecks = useCallback(async () => {
    try {
      setIsLoading(true)
      const { checks, totalPages, totalChecks } =
        await checkService.getPaginated(page, size, search, dueDateSort, filter)

      setChecks(checks)
      setTotalPages(totalPages)
      setTotalChecks(totalChecks)
    } catch (error) {
      setError(error.message || 'Failed to fetch checks')
    } finally {
      setIsLoading(false)
    }
  }, [page, size, search, dueDateSort, filter])

  const handleDelete = (checkId) => {
    if (confirm('Are you sure you wanna delete this check?')) {
      checkService.deleteCheck(checkId).then(() => loadChecks())
    }
  }

  useEffect(() => {
    loadChecks()
  }, [loadChecks])

  return {
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
  }
}
export default useChecks
