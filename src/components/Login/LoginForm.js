import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import { UserContext } from '../../UserContext'
import Error from '../Helpers/Error'
import styles from './LoginForm.module.css'
import stylesBtn from '../Forms/Button.module.css'
import Head from '../Helpers/Head'

const LoginForm = () => {

    const username = useForm();
    const password = useForm();

    const {userLogin, erro, loading} = React.useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(username.validate() && password.validate()) {
            userLogin(username.value, password.value)
        }
    }

    return (
        <section className="animeLeft">
            <Head title="Login" />
            <h1 className="title">Login</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input label="Usuário" type="text" name="username" {...username} />
                <Input label="Senha" type="password" name="password"{...password} />
                {/* <input type="text" value={username} onChange={({target}) => setUsername(target.value)} />
                <input type="password" value={password} onChange={({target}) => setPassword(target.value)} /> */}
                {loading ? <Button disabled>Carregando...</Button> : <Button>Entrar</Button>}
                <Error error={erro && 'Dados incorretos.'} />
            </form>
            <Link className={styles.perdeu} to="/login/perdeu">Perdeu a Senha?</Link>
            <div className={styles.cadastro}>
                <h2 className={styles.subtitle}>Cadastre-se</h2>
                <p>Ainda não possui conta? Cadastre-se no site.</p>
                <Link className={stylesBtn.button} to="/login/criar">Cadastro</Link>

            </div>
        </section>
    )
}

export default LoginForm
