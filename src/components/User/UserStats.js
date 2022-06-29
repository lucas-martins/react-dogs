import React from 'react'
import Head from '../Helpers/Head'
import useFetch from '../../hooks/useFetch'
import { STATS_GET } from '../../api'
import Loading from '../Helpers/Loading'
import Error from '../Helpers/Error'
const UserStatsGraph = React.lazy(() => import('./UserStatsGraphs'))

const UserStats = () => {
  const {data, error, loading, request} = useFetch()

  React.useEffect(() => {
    const getData = async () => {
      const {url, options} = STATS_GET()
      await request(url, options)
    }
    getData()
  }, [request])

  if(loading) return <Loading />
  if(error) return <Error error={error} />
  if(data)
    return (
      <React.Suspense fallback={<></>}>
        <Head title="Estatísticas" />
        <UserStatsGraph data={data} />
      </React.Suspense>
    )
  else return null
}

export default UserStats