import React, {useContext, useState} from 'react';

import { Container } from './styles'
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'
import {toast} from 'react-toastify'

import {AiFillEdit} from 'react-icons/ai'

import {AuthContext} from '../../context/AuthContext'
import Tooltip from '../../components/tooltip/index'
import api from '../../services/api'

const schema = Yup.object().shape({

    name: Yup.string()
        .required("O nome é obrigatório!"),

    email: Yup.string()
        .email("Insira um e-mail válido!")
        .required("O e-mail é obrigatório!"),

    phone: Yup.string()
        .required("Número de telefone é obrigatório!"),

    password: Yup.string()
        .required("A senha é obrigatória!"),

    NewPassword: Yup.string()
        .required("Campo obrigatório!"),

    ConfirmeNewpassword: Yup.string()
        .required("Campo obrigatório!"),
})

export default function Profile(){

    const { user } = useContext(AuthContext)
    const { update } = useContext(AuthContext)

    const [edit, setEdit] = useState(true);

    async function handlSubmit(data) {
        await api.put(`user/userUp/${user._id}` ,{
            name: data.name,
            email: data.email,
            phone: data.phone
        }).then(() => {
            update({
                email: data.email,
                password: data.password
            })
            toast.success('Perfil atualizado.')
        }).catch((error) => {
            let erro = JSON.parse(error.request.response)
            toast.error(erro.error)
        })

    }

    async function onChange(event){
        event.target.value = event.target.value
            .replace(/\D/g,'')
            .replace(/(\d{0})(\d)/, '$1($2')
            .replace(/(\d{2})(\d)/, '$1) $2 ')
            .replace(/(\d{5})(\d)/, '$1-$2')
    }

    async function handleClick(){
        setEdit(false == edit)
        if(edit){
            toast.info('Campos de edição habilitado')
        } else {
            toast.info('Campos de edição desabilitado')

        }
    }


    return (
        <>
            <Container>
                <div>
                    <h1>Editar informações</h1>
                    <button className="Edit" onClick={handleClick}><AiFillEdit size={20}/><Tooltip texto="Habilitar campos de edição"/></button>
                </div>
                <Form schema={schema} initialData={user} onSubmit={handlSubmit}>
                    {
                        edit ? <Input label="Nome e sobrenome" name="name" placeholder="Nome e sobrenome" disabled/> : <Input label="Nome e sobrenome" name="name" placeholder="Nome e sobrenome"/>
                    }
                    {
                        edit ? <Input label="E-mail" type="email" name="email" placeholder="Nome e sobrenome" disabled/> :<Input label="E-mail" type="email" name="email" placeholder="Nome e sobrenome"/>
                    }
                    {
                        edit ? <Input label="Telefone" onChange={onChange} name="phone" maxLength="16" type="text" disabled/> : <Input label="Telefone" onChange={onChange} maxLength="16" type="text" name="phone"/>
                    }
                    <hr/>
                    <Input label="Nova Senha" type="password" name="NewPassword" maxLength="12" minLength="8" placeholder="Mínimo 8 caracteres e máximo  12 caracters" />
                    <Input label="Confirme nova senha" type="password" name="ConfirmeNewpassword" minLength="8" maxLength="12" placeholder="Mesma senha do campo anterior" />
                    <hr/>
                    <Input label="Senha atual" type="password" name="password" maxLength="12" minLength="8" placeholder="Necessario para validar as modificações" />
                    {
                        edit ? <button disabled>Desabilitado</button> : <button type="submit">Atualizar perfil</button>
                    }
                </Form>
            </Container>
        </>
    )
}