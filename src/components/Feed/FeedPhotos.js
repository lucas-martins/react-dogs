import React from 'react'
import FeedPhotoItem from './FeedPhotoItem'
import useFetch from '../../hooks/useFetch'
import { PHOTOS_GET } from '../../api'
import Error from '../Helpers/Error'
import Loading from '../Helpers/Loading'
import styles from './FeedPhotos.module.css'

const FeedPhotos = ({setModalPhoto}) => {

  const {data, loading, error, request} = useFetch()

  React.useEffect(() => {
    const fetchPhotos = async () => {
      const {url, options} = PHOTOS_GET({page: 1, total: 6, user: 0})
      const {json} = await request(url, options)
      console.log(json)
    }

    fetchPhotos()
  }, [request])

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