import React, {useState, useMemo, useEffect} from 'react';
import { format, subDays, addDays} from 'date-fns'
import pt from 'date-fns/locale/pt'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import {Link} from 'react-router-dom'
import Logo from '../../assets/logo-branca.svg'

import {toast} from 'react-toastify'
import api from "../../services/api"
import Tooltip from '../../components/tooltip/index'
import {AiFillPlusCircle} from 'react-icons/ai'

import {Container, Time, Loading} from './styles.js'
import ReactLoading from 'react-loading'

export default function Scheduling(){
    const [ schedule, setSchedule ] = useState([]);
    const [ date, setDate ] = useState(new Date());
    const [loading, setLoading] = useState(true);

    const dateFormatted = useMemo(
        () => format(date, "d 'de' MMMM", { locale: pt}),
        [date]
    );

    useEffect(async () => {
        setLoading(true)

        var data = ''
        if(date.getMonth() < 10){
            data = `0${date.getMonth()+1}-${date.getFullYear()}`
        }else {
            data = `${date.getMonth()+1}-${date.getFullYear()}`
        }
        if(date.getDate() < 10){
            data = `0${date.getDate()}-${data}`
        } else {
            data = `${date.getDate()}-${data}`
        }

        try {
            await api.get(`agendamento/list/${data.toString()}`).then((response) => {
                setSchedule(response.data)
                setLoading(false)
            }).catch((error) => {
                let erro = JSON.parse(error.request.response)
                toast.error(erro.error)
            })
        } catch (error) {
            toast.error('Ocorreu um erro ao tentar listar os agendamentos. Entre em contato com o suporte.')
        }

        
    },[date])

    function handlePrevDay() {
        setDate(subDays(date, 1));
    }

    function handleNextDay() {
        setDate(addDays(date, 1));
    }

    if (loading){
        return <><Loading><h1>Carregando</h1><ReactLoading  color="#fff" /></Loading></>
    } else {
        if(schedule.length === 0){
            return (
                <Container>
                    <div className="cabe">
                        <img src={Logo} alt="Carol Nutri"/>
                        <h1>Explore o agendamento</h1>
                        <Link to="/cadastrar-agendamento">
                            <AiFillPlusCircle size={60}/>
                            <Tooltip texto="Cadastrar nova data."/>
                        </Link>
                    </div>
                    <header>
                        <button type="button" onClick={handlePrevDay}> 
                            <MdChevronLeft size={36} color="#FFF"/>
                        </button>
                        <strong>{dateFormatted}</strong>
                        <button type="button" onClick={handleNextDay}> 
                            <MdChevronRight size={36} color="#FFF"/>
                        </button>
                    </header>
                    <h2>Nada agendado para este dia</h2>
                </Container>
            )
        } else {
            return (
                <Container>
                    <div className="cabe">
                        <img src={Logo} alt="Carol Nutri"/>
                        <h1>Explore o agendamento</h1>
                        <Link to="/cadastrar-agendamento">
                            <AiFillPlusCircle size={60}/>
                            <Tooltip texto="Cadastrar nova data."/>
                        </Link>
                    </div>
                    <header>
                        <button type="button" onClick={handlePrevDay}> 
                            <MdChevronLeft size={36} color="#FFF"/>
                        </button>
                        <strong>{dateFormatted}</strong>
                        <button type="button" onClick={handleNextDay}> 
                            <MdChevronRight size={36} color="#FFF"/>
                        </button>
                    </header>
    
                    <ul>
                        { schedule.map(agendamento => (
                            <div key={String(agendamento._id)} >
                                {
                                    agendamento.status ? <Time available ><Link to={`/editar-agendamento/${agendamento._id}`}><strong >{agendamento.status ? 'Disponível para agendamento' : 'Não Disponível'}</strong><span>{agendamento.hours}</span></Link></Time> : <Time past ><Link to={`/editar-agendamento/${agendamento._id}`}><strong >{agendamento.status ? 'Disponível para agendamento' : 'Não Disponível'}</strong><span>{agendamento.hours}</span></Link></Time>
                                }
                            </div>
                        ))}
                    </ul>
                </Container>
            )
        }
    }
}

