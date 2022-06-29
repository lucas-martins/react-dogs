import React from 'react'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import { PASSWORD_LOST } from '../../api'
import Error from '../Helpers/Error'

const LoginPasswordLost = () => {
    const login = useForm()
    const {data, loading, error, request} = useFetch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(login.validate()) {
            const {url, options} = PASSWORD_LOST({login: login.value, url: window.location.href.replace('perdeu', 'resetar')})
            const {json} = await request(url, options)
            console.log(json)
        }
    }

    const checkButtonToShow = () => {
        if(loading) return <Button disabled>Enviando...</Button>
        else return <Button>Enviar E-mail</Button>
    }

    return (
        <section>
            <h1 className='title'>Perdeu a senha?</h1>
            {data ? <p style={{color: '#4c1'}}>{data}</p> : 
                <form onSubmit={handleSubmit}>
                    <Input label="E-mail/Usuário" type="text" name="email" {...login} />
                    {checkButtonToShow()}
                </form>
            }
            {error && <Error error={error} />}
        </section>
    )
}

export default LoginPasswordLost
