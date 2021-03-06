import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom'

import {toast} from 'react-toastify'
import { FiChevronLeft } from 'react-icons/fi'
import { AiFillEdit } from "react-icons/ai";
import { useHistory } from 'react-router-dom'
import { Form, Input, Textarea, Check } from '@rocketseat/unform'
import ReactLoading from 'react-loading'

import api from '../../services/api'
import {Return, Container, Editor, Loading} from './styles'
import Tooltip from '../../components/tooltip/index'

export default function Agendamento(){

    var history = useHistory()

    const { params } = useRouteMatch();

    const [loading, setLoading] = useState(true);
    const [agendamento, setAgendamento] = useState([]);
    const [edit, setEdit] = useState(true);

    useEffect(async () => {
        setLoading(true)
        try {
            await api.get(`agendamento/listId/${params.id}`).then((response) => {
                setAgendamento(response.data)
                setLoading(false)
            }).catch((error) => {
                let erro = JSON.parse(error.request.response)
                toast.error(erro.error)
            })
        } catch (error) {
            toast.error('Ocorreu um erro. Entre em contato com o suporte.')
        }
        
    },[params.id])

    async function handlSubmit(data) {
        if(data.virtualDate === "" || data.hours === "" ){
            toast.info('Campos obrigatórios vazios')
        } else {
            const vet = data.virtualDate.split('-')
            const dataFake = `${vet[2]}-${vet[1]}-${vet[0]}`
            await api.put(`agendamento/edit/${agendamento._id}` ,{ 
                virtualDate: dataFake,
                hours: data.hours,
                status: data.status,
             }).then(async () => {
                 toast.success('Agendamento atualizado')
                 history.push('/agenda')
            }).catch((error) => {
                let erro = JSON.parse(error.request.response)
                toast.error(erro.error)
            })
        }
    }
    
    async function handleClick(){
        setEdit(false === edit)
        if(edit){
            toast.info('Campos de edição habilitados')
        } else {
            toast.info('Campos de edição desabilitados')
        }
    }

    if (loading){
        return (
            <Loading><h1>Carregando</h1><ReactLoading  color="#fff" /></Loading>
        )
    } else {

        return (
        <Container>
            <Return>
                <Link to="/agenda">
                    <FiChevronLeft/>
                    Voltar
                </Link>
            </Return>

            <Editor>
                <div>
                    <h2>Editar agendamento</h2>
                    <button className="Edit" onClick={handleClick}><AiFillEdit size={20}/><Tooltip texto="Habilitar campos para edição"/></button>
                </div>

                <Form onSubmit={handlSubmit} initialData={agendamento}>
                    <div>
                    {
                        edit ? <Input  name="virtualDate" id="virtualDate" type="date" label="Data para o agendamento" disabled /> : <Input  name="virtualDate" type="date" id="virtualDate" label="Data para o agendamento"/>
                    }
                    {
                        edit ? <Input  name="hours" id="hours" type="time" placeholder="Informe o horário da consulta" label="Horário" disabled /> : <Input  name="hours" id="hours" type="time" placeholder="Informe o horário da consulta" label="Horário" />
                    }
                    </div>
                    {
                        edit ?  <Check label="Agendamento disponível" name="status" id="status" disabled/> : <Check id="status" label="Agendamento disponível" name="status" />
                    }
                    {
                        edit ? <button disabled>Desabilitado</button> : <button onSubmit={e => { e.preventDefault()}} type="submit" >Atualizar dados</button>
                    }

                </Form>
            </Editor>
        </Container>
        )
    }

}