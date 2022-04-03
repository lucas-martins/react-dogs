import React from 'react'
import { Link } from 'react-router-dom'
import { TOKEN_POST, USER_GET } from '../../api'
import useForm from '../../hooks/useForm'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import { UserContext } from '../../UserContext'

const LoginForm = () => {

    const username = useForm();
    const password = useForm();

    const {userLogin} = React.useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(username.validate() && password.validate()) {
            userLogin(username.value, password.value)
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
