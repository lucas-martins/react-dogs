import React from 'react'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import { PASSWORD_RESET } from '../../api'
import Error from '../Helpers/Error'
import { useNavigate } from 'react-router-dom'
import Head from '../Helpers/Head'

const LoginPasswordReset = () => {
    const [login, setLogin] = React.useState('')
    const [key, setKey] = React.useState('')
    const password = useForm()
    const {error, loading, request} = useFetch()
    const navigate = useNavigate()

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const keyParam = params.get('key')
        const loginParam = params.get('login')
        if(keyParam) setKey(keyParam)
        if(loginParam) setLogin(loginParam)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password.validate()) {
            const {url, options} = PASSWORD_RESET({login, key, password: password.value})
            const {response} = await request(url, options)
            if(response.ok) navigate('/login')
        }
    }

    return (
        <section className='animeLeft'>
            <Head title="Resete a senha" />
            <h1 className='title'>Resete a Senha</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Nova Senha" type="password" name="password" {...password} />
                {loading ? 
                    <Button disabled>Resetando...</Button> :
                    <Button>Resetar</Button>
                }
            </form>
            {error && <Error error={error} />}
        </section>
    )
}

export default LoginPasswordReset
