import React from 'react'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router';

export const UserContext = React.createContext();


export const UserStorage = ({children}) => {
    const [data, setData] = React.useState(null)
    const [login, setLogin] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [erro, setErro] = React.useState(null)
    const navigate = useNavigate()

    const userLogout = React.useCallback( async () => {
        setData(null)
        setErro(null)
        setLoading(false)
        setLogin(false)
        window.localStorage.removeItem('token')
        navigate('/login')
    }, [navigate])

    const getUser = async (token) => {
        const {url, options} = USER_GET(token)
        const userResponse = await fetch(url, options)
        const json = await userResponse.json()
        setData(json)
        setLogin(true)
    }

    const userLogin = async (username, password) => {
        try {
            setErro(null)
            setLoading(true)
            const {url, options} = TOKEN_POST({username, password})
            const tokenResponse = await fetch(url, options)
            if(!tokenResponse.ok) throw new Error(`Usuário Inválido`)
            const {token} = await tokenResponse.json()
            window.localStorage.setItem('token', token)
            await getUser(token)
            navigate('/conta')
        } catch (er) {
            console.log(er)
            setErro("er")
            setLogin(false)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const autoLogin = async () => {
            const token = window.localStorage.getItem('token')
            if(token) {
                try {
                    setErro(null)
                    setLoading(true)
                    const {url, options} = TOKEN_VALIDATE_POST(token)
                    const response = await fetch(url, options)
                    if(!response.ok) throw new Error('Token Inválido')
                    await getUser(token)
                } catch (er) {
                    userLogout()
                } finally {
                    setLoading(false)
                }

            }
        }
        autoLogin()
    }, [userLogout])


    return (
        <UserContext.Provider value={{userLogin, userLogout, data, erro, loading, login}}> 
            {children} 
        </UserContext.Provider>
    )
}
