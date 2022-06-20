import React from 'react'
import { COMMENT_POST } from '../../api'
import {ReactComponent as Enviar} from '../../assets/enviar.svg'
import useFetch from '../../hooks/useFetch'
import Error from '../Helpers/Error'
import styles from './PhotoCommentForm.module.css'

const PhotoCommentsForm = ({id, setComments, single}) => {
  const [comment, setComment] = React.useState('')
  const {request, error} = useFetch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {url, options} = COMMENT_POST(id, {comment})
    const {response, json} = await request(url, options)
    if(response.ok) {
        setComment('')
        setComments((comments) => [...comments, json])
    }
  }

  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={handleSubmit}>
        <textarea className={styles.textarea} id="comment" name="comment" placeholder='Comente...' 
            value={comment} onChange={({target}) => setComment(target.value)}></textarea>
        <button className={styles.button}>
            <Enviar />
        </button>
        {error && <Error error={error} />}
    </form>
  )
}

export default PhotoCommentsForm