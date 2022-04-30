import React from 'react'

const validations = {
    email: {
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Preencha um e-mail um válido'
    },
    number: {
        regex: /^\d+$/,
        message: 'Utilize números apenas'
    }
}

const useForm = (type) => {
    const [value, setValue] = React.useState('')
    const [error, setError] = React.useState(null)

    const validate = (val) => {
        if(!type) return true
        if(val.length === 0) {
            setError('Preencha um valor')
            return false
        } else if(validations[type] && !validations[type].regex.test(val)) {
            setError(validations[type].message)
            return false
        } else {
            setError(null)
            return true
        }
    }

    const onChange = ({target}) => {
        if(error) validate(target.value)
        setValue(target.value)
    }

    return {
        value,
        setValue,
        onChange,
        validate: () => validate(value),
        onBlur: () => validate(value),
        error
    }
}

export default useForm
