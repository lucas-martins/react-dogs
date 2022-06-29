import React from 'react'
import FeedPhotoItem from './FeedPhotoItem'
import useFetch from '../../hooks/useFetch'
import { PHOTOS_GET } from '../../api'
import Error from '../Helpers/Error'
import Loading from '../Helpers/Loading'
import styles from './FeedPhotos.module.css'

const FeedPhotos = ({setModalPhoto, user, page, setInfinite}) => {

  const {data, loading, error, request} = useFetch()

  React.useEffect(() => {
    const fetchPhotos = async () => {
      const total = 3
      const {url, options} = PHOTOS_GET({page, total, user})
      const {response, json} = await request(url, options)
      // console.log('Request:', json)
      if(response && response.ok && json.length < total) setInfinite(false)
    }

    fetchPhotos()
  }, [request, user, page, setInfinite])

  if(error) return <Error error={error} />
  if(loading) return <Loading loading={loading} />
  if(data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map(photo => <FeedPhotoItem photo={photo} key={photo.id} setModalPhoto={setModalPhoto} />)}
      </ul>
    )
  else return null
}

export default FeedPhotos