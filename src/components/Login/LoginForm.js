import React from 'react'
import { Link } from 'react-router-dom'
import { TOKEN_POST, USER_GET } from '../../api'
import useForm from '../../hooks/useForm'
import Button from '../Forms/Button'
import Input from '../Forms/Input'

const LoginForm = () => {

    const username = useForm();
    const password = useForm();

    React.useEffect(() => {
        const token = window.localStorage.getItem('token')
        if(token) getUser(token)
    }, [])

    const getUser = async (token) => {
        const {url, options} = USER_GET(token)
        const response = await fetch(url, options)
        const json = await response.json()
        console.log(json)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(username.validate() && password.validate()) {
            const {url, options} = TOKEN_POST({username: username.value, password: password.value})

            const response = await fetch(url, options)
            const json = await response.json()
            window.localStorage.setItem('token', json.token)
            getUser(json.token)
        }
    }

    return (
        <section>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Usuário" type="text" name="username" {...username} />
                <Input label="Senha" type="password" name="password"{...password} />
                {/* <input type="text" value={username} onChange={({target}) => setUsername(target.value)} />
                <input type="password" value={password} onChange={({target}) => setPassword(target.value)} /> */}
                <Button>Entrar</Button>
            </form>
            <Link to="/login/criar">Cadastro</Link>
        </section>
    )
}

export default LoginForm
