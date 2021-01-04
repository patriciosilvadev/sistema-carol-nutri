import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom'

import {toast} from 'react-toastify'
import { Form, Input, Textarea, Select, Check, Scope } from '@rocketseat/unform'

import { FiChevronLeft } from 'react-icons/fi'
import {AiOutlineMail, AiOutlinePhone, AiOutlineBell, AiFillEdit} from 'react-icons/ai'

import Tooltip from '../../components/tooltip/index'
import api from '../../services/api'

import {Return, UsuarioInfo, Container, MedicalInfo} from './styles'


export default function Paciente(){

    const { params } = useRouteMatch();

    const [paciente, setPaciente] = useState([]);
    const [informacoesMedicas, setInformacoesMedicas] = useState({});
    const [edit, setEdit] = useState(true);

    useEffect(async () => {
        await api.get(`form/list/${params.paciente}`).then((response) => {
            console.log(response.data)
            setInformacoesMedicas(response?.data)
        }).catch((error) => {
            setInformacoesMedicas(undefined)
            let erro = JSON.parse(error.request.response)
            toast.info(erro.error)
        })
        await api.get(`user/user/${params.paciente}`).then((response) => {
            setPaciente(response.data)
        }).catch((error) => {
            let erro = JSON.parse(error.request.response)
            toast.error(erro.error)
        })
    },[params.paciente])

    async function handleSubmitRegister(data){
        await api.post(`form/register`, {

            user: params.paciente,
            PersonalInformation: data.PersonalInformation,
            nutritionalSemiology: data.nutritionalSemiology,
            waterConsumption: data.waterConsumption,
            allergiesAndIntolerances: data.allergiesAndIntolerances,
            useOfMedicines: data.useOfMedicines,
            physicalActivity: data.physicalActivity,
            alcoholicBeverage: data.alcoholicBeverage,
            smoking: data.smoking,
            schedules: data.schedules,
            dietaryEvaluation: data.dietaryEvaluation,
            preferencesAndAversions: data.preferencesAndAversions,
            anthropometricEvaluation: data.anthropometricEvaluation

        }).then((response) => {
            setEdit(true)
            setInformacoesMedicas(response.data)
            toast.success('Dados cadastrados.')
        }).catch((error) => {
            let erro = JSON.parse(error.request.response)
            toast.error(erro.error)
        })     
    }

    async function handleSubmitEdit(data){
        await api.put(`form/edit/${informacoesMedicas._id}`, {
            
            PersonalInformation: data.PersonalInformation,
            nutritionalSemiology: data.nutritionalSemiology,
            waterConsumption: data.waterConsumption,
            allergiesAndIntolerances: data.allergiesAndIntolerances,
            useOfMedicines: data.useOfMedicines,
            physicalActivity: data.physicalActivity,
            alcoholicBeverage: data.alcoholicBeverage,
            smoking: data.smoking,
            schedules: data.schedules,
            dietaryEvaluation: data.dietaryEvaluation,
            preferencesAndAversions: data.preferencesAndAversions,
            anthropometricEvaluation: data.anthropometricEvaluation

        }).then((response) => {
            setEdit(true)
            setInformacoesMedicas(response.data)
            toast.success('Dados atualizados')
        }).catch((error) => {
            let erro = JSON.parse(error.request.response)
            toast.error(erro.error)
        })        
    }

    async function handleClick(){
        setEdit(false == edit)
        if(edit){
            toast.info('Campos de edição habilitado')
        } else {
            toast.info('Campos de edição desabilitado')
        }
    }

    if(!informacoesMedicas){
        return (
            <Container>
                <Return>
                    <Link to="/pacientes">
                        <FiChevronLeft/>
                        Voltar
                    </Link>
                </Return>
        
                <UsuarioInfo>
                    <header>
                        <img src="https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"/>
                        <div>
                            <strong>
                                {paciente.name}
                            </strong>
                            <p>
                                <AiOutlineMail/> {paciente.email}
                            </p>
                            <span>
                            <AiOutlinePhone size={18}/> {paciente.phone}
                            </span>
                            <br/>
                            <span>
                            <AiOutlineBell/> {paciente.status}
                            </span>
                        </div>
                    </header>
                    <hr/>
                </UsuarioInfo>
    
                <MedicalInfo>
                    <Form onSubmit={handleSubmitRegister}>
                        <h4>1. INFORMAÇÕES PESSOAIS</h4>
                        <div name="PersonalInformation">
                            <div>
                                <Input label="Data de nascimento" type="date" name="dateBirth" placeholder="Data de nascimento" />
                            </div>
                            <div>
                                <Select label="Estado civil" name="maritalStatus" id="maritalStatus" options={[{id: "solteiro", title: 'Solteiro'}, {id: "casado", title: 'Casado'}, {id: "divorciado", title: 'Divorciado'}]} placeholder="Selecione uma opção"/>  
                            </div>
                            <div>
                                <Input label="Peso" type="Number" max="400" min="0" step="0.1" name="Weight" placeholder="Peso em kg" />
                            </div>
                            <div>
                                <Input label="Altura" type="Number" max="3.00" min="0" step="0.01" name="height" placeholder="Altura em metros" />
                            </div>               
                        </div>
    
                        <div>
                            <div>
                                <Input label="Profissão" type="text" name="profession" placeholder="Profissão" />
                            </div>  
                            <div>
                                <Select label="Transito intestinal" name="IntestinalTransit" id="IntestinalTransit" options={[{id: "1", title: '1'}, {id: "2", title: '2'}, {id: "3", title: '3'}, {id: "4", title: '4'}, {id: "5", title: '5'}, {id: "6", title: '6'}, {id: '7', title: '7'}]} placeholder="Selecione uma opção" /> 
                            </div>
                            <div>
                                <Select label="Escala urinaria" name="UrinaryStaining" id="UrinaryStaining" options={[{id: "1", title: '1'}, {id: "2", title: '2'}, {id: "3", title: '3'}, {id: "4", title: '4'}, {id: "5", title: '5'}, {id: "6", title: '6'}, {id: '7', title: '7'}, {id: '8', title: '8'}]} placeholder="Selecione uma opção" />
                            </div>
                            <div>
                                <Select label="Genero fisiologico" name="genre" id="genre" options={[{id: "Mulher", title: 'Mulher'}, {id: "Homem", title: 'Homem'}]} placeholder="Selecione uma opção" />
                            </div>
                            <div>
                                <Select label="Qualidade do sono" name="sleepQuality" id="sleepQuality" options={[{id: "Ruim", title: 'Ruim'}, {id: "Bom", title: 'Bom'}]} placeholder="Selecione uma opção" />
                            </div>
                        </div>
    
                        <div>
                            <div>
                                <Textarea label="Historico clínico" id="clinicalHistory" name="clinicalHistory" rows="6" cols="30">
                                </Textarea>
                            </div>
    
                            <div>
                                <Textarea label="Objetivo" id="objective" name="objective" rows="6" cols="30">
                                </Textarea>
                            </div>
                        </div>
                        <hr/>
    
                        <h4>2. SEMIOLOGIA NUTRICIONAL</h4>
    
                        <h5>2.1 ALTERAÇÃO DE PESO</h5>
                        <div>
                            <div>
                                <Select label="Tipo" name="kgChanges" id="kgChanges" options={[{id: "PerdaPeso", title: 'Perda de Peso'}, {id: "GanhoPeso", title: 'Ganho de Peso'}]} placeholder="Selecione uma opção" placeholder="Selecione uma opção"/>
                            </div>
                            <div>
                                <Input label="Quantidade" type="Number" max="400" step="0.1" name="obsWeight" placeholder="Peso em kg" />
                            </div>               
                        </div>
    
                        <h5>2.2 EXAME FÍSICO</h5>
                        <div>
                            <div>
                                <Check label="Pele Ressecada"  id="drySkin" name="drySkin" />
                            </div>
    
                            <div>
                                <Check label="Umidade das mucosas"  id="mucousMoisture" name="mucousMoisture"/>
                            </div>
                            <div>
                                <Check label="Queda de cabelo"  id="lossOfHair" name="lossOfHair"/>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Check label="Edema"  id="edema" name="edema"/>
                            </div>
                            <div>
                                <Check label="Fraqueza" id="weakness" name="weakness"/>
                            </div>
                            <div>
                                <Check label="Palidez conjutival" defaultChecked="sim" id="conjunctivalPallor" name="conjunctivalPallor"/>
                            </div>
                            <div>
                                <Check label="Unhas coiloníquas" id="koilonychicNails" name="koilonychicNails"/>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Textarea label="Observação" id="obsPhysicalExam" name="obsPhysicalExam" rows="6" cols="30">
                                </Textarea>
                            </div>
                        </div>
    
                        <h5>2.3 ALTERAÇÃO NO APARELHO DIGESTIVO</h5>
                        <div>
                            <div>
                                <Check label="Dispepsia" id="dyspepsia" name="dyspepsia" />
                            </div>
    
                            <div>
                                <Check label="Dores estomacais" id="stomachPains" name="stomachPains"/>
                            </div>
                            <div>
                                <Check label="Nauseas" id="nausea" name="nausea"/>
                            </div>
    
                            <div>
                                <Check label="Vômitos" id="vomiting" name="vomiting"/>
                            </div>
                            <div>
                                <Check label="Disfagia" id="dysphagia" name="dysphagia"/>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Textarea label="Observação" id="obsDisgestiveSystem" name="obsDisgestiveSystem" rows="6" cols="30">
                                </Textarea>
                            </div>
                        </div>
    
                        <h5>2.4 ALTERAÇÕES INTESTINAIS</h5>
                        <div>
                            <div>
                                <Check label="Diarreia" id="diarreia" name="diarreia"/>
                            </div>
                            <div>
                                <Check label="Constipação" id="cold" name="cold"/>
                            </div>
                            <div>
                                <Textarea label="Observação" id="obsIntestinalChanges" name="obsIntestinalChanges" rows="6" cols="30">
                                </Textarea>
                            </div>
                        </div>
                        <hr/>
    
                        <h4>3. CONSUNO DE ÁGUA</h4>
                        <div>
                            <div>
                                <Textarea labe="Descrição" id="waterConsumption" name="waterConsumption" rows="6" cols="30">
                                </Textarea>
                            </div>
                        </div>
                        <hr/>
        
                        <h4>4. ALERGIAS E INTOLERÂNCIAS</h4>
                        <div>
                            <div>
                                <Textarea label="Alergia alimentar" id="foodAllergy" name="foodAllergy" rows="6" cols="30">
                                </Textarea>
                            </div>
    
                            <div>
                                <Textarea label="Outras alergias" id="otherAllergies" name="otherAllergies" rows="6" cols="30">
                                </Textarea>
                            </div>
    
                            <div>
                                <Textarea label="Intolerâncias" id="intolerances" name="intolerances" rows="6" cols="30">
                                </Textarea>
                            </div>
                        </div>
                        <hr/>
    
                        <h4>5. USO DE MEDICAMENTOS/SUPLEMENTOS</h4>
                        <hr/>
    
                        <h4>6. ATIVIDADE FÍSICA</h4>
                        <div>
                            <div>
                                <Check label="Pratica atividade Física" id="physicalActivityYesNo" name="physicalActivityYesNo"/>
                            </div>
                            <div>
                                <Textarea label="Discrição da frenquência" id="frequencyActivity" name="frequencyActivity" rows="6" cols="30">
                                </Textarea>
                            </div>
                        </div>
                        <hr/>
    
                        <h4>7. BEBIDA ALCOÓLICA</h4>
                        <div>
                            <div>
                                <Check label="Ingere bebida alcoolica" id="yesNoBeverage" name="yesNoBeverage"/>
                            </div>
                            <div>
                                <Textarea label="Discrição da frenquência" id="frequencyBeverage" name="frequencyBeverage" rows="6" cols="30">
                                </Textarea>
                            </div>
                        </div>
                        <hr/>
    
                        <h4>8. TABAGISMO</h4>
                        <div>
                            <div>
                                <Check label="Fumante" id="smoking" name="smoking"/>
                            </div>
                        </div>
                        <hr/>
    
                        <h4>9. HORARIOS</h4>
                        <div>
                            <div>
                                <Input label="Acorda às" type="time" name="wakeUp" />
                            </div>
                            <div>
                                <Input label="Dorme às" type="time" name="profession" />
                            </div>
                            <div>
                                <Input label="Atividade física às" type="time" name="physicalActivity" />
                            </div> 
                        </div>
                        <hr/>
    
                        <h4>10. AVALIAÇÃO DIETÉTICA</h4>
    
                        <h5>10.1. PREFERÊNCIAS E AVERSÕES</h5>
                        <hr/>
    
                        <button className="Salve" type="submit" onSubmit={e => { e.preventDefault()}} >Cadastrar dados</button>
                    </Form>
                </MedicalInfo>
            </Container>
            )
    } else {
        return (
            <Container>
                <Return>
                    <Link to="/pacientes">
                        <FiChevronLeft/>
                        Voltar
                    </Link>
                </Return>
        
                <UsuarioInfo>
                    <header>
                        <img src="https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"/>
                        <div>
                            <strong>
                                {paciente.name}
                            </strong>
                            <p>
                                <AiOutlineMail/> {paciente.email}
                            </p>
                            <span>
                            <AiOutlinePhone size={18}/> {paciente.phone}
                            </span>
                            <br/>
                            <span>
                            <AiOutlineBell/> {paciente.status}
                            </span>
                        </div>
                    </header>
                    <hr/>
                </UsuarioInfo>
    
                <MedicalInfo>
                    <button className="Edit" onClick={handleClick}><AiFillEdit size={20}/><Tooltip texto="Editar informações"/></button>
                    <Form onSubmit={handleSubmitEdit} initialData={informacoesMedicas}>
                        <h4>1. INFORMAÇÕES PESSOAIS</h4>
                        <Scope path="PersonalInformation">
                            <div>
                                <div>
                                    {
                                        edit ? <Input label="Data de nascimento" type="date" name="dateBirth" placeholder="Data de nascimento" disabled/> : <Input label="Data de nascimento" type="date" name="dateBirth" placeholder="Data de nascimento" />
                                    }
                                </div>
                                <div>
                                    {
                                        edit ? <Input label="Estado civil" name="maritalStatus" id="maritalStatus" placeholder="Sem informação" disabled/> : <Select label="Estado civil" name="maritalStatus" id="maritalStatus" options={[{id: "Solteiro", title: 'Solteiro'}, {id: "Casado", title: 'Casado'}, {id: "Divorciado", title: 'Divorciado'}]} placeholder="Selecione uma opção" />
                                    }  
                                </div>
                                <div>
                                    {
                                        edit ? <Input label="Peso" type="Number" max="400" min="0" step="0.1" name="Weight" placeholder="Peso em kg" disabled/> : <Input label="Peso" type="Number" max="400" min="0" step="0.1" name="Weight" placeholder="Peso em kg" />
                                    }
                                </div>
                                <div>
                                    {
                                        edit ? <Input label="Altura" type="Number" max="3.00" min="0" step="0.01" name="height" placeholder="Sem informação" disabled /> : <Input label="Altura" type="Number" max="3.00" min="0" step="0.01" name="height" placeholder="Altura em metros" />
                                    }
                                </div>               
                            </div>
                            <div>
                                <div>
                                    {
                                        edit ? <Input label="Profissão" type="text" name="profession" placeholder="Profissão" disabled/> : <Input label="Profissão" type="text" name="profession" placeholder="Profissão" />
                                    }
                                    
                                </div>  
                                <div>
                                    {
                                        edit ? <Input label="Transito intestinal" name="IntestinalTransit" id="IntestinalTransit"  placeholder="Sem informação" disabled/> : <Select label="Transito intestinal" name="IntestinalTransit" id="IntestinalTransit" options={[{id: "1", title: '1'}, {id: "2", title: '2'}, {id: "3", title: '3'}, {id: "4", title: '4'}, {id: "5", title: '5'}, {id: "6", title: '6'}, {id: '7', title: '7'}]} placeholder="Selecione uma opção" />
                                    }
                                </div>
                                <div>
                                    {
                                        edit ? <Input  label="Escala urinaria" name="UrinaryStaining" id="UrinaryStaining" placeholder="Sem informação" disabled/> : <Select  label="Escala urinaria" name="UrinaryStaining" id="UrinaryStaining" options={[{id: "1", title: '1'}, {id: "2", title: '2'}, {id: "3", title: '3'}, {id: "4", title: '4'}, {id: "5", title: '5'}, {id: "6", title: '6'}, {id: '7', title: '7'}, {id: '8', title: '8'}]} placeholder="Selecione uma opção" />
                                    }
                                </div>
                                <div>
                                    {
                                        edit ? <Input label="Genero fisiologico" name="genre" id="genre" placeholder="Sem informação"  disabled/> : <Select label="Genero fisiologico" name="genre" id="genre" options={[{id: "Mulher", title: 'Mulher'}, {id: "Homem", title: 'Homem'}]} placeholder="Selecione uma opção" />
                                    }
                                </div>
                                <div>
                                    {
                                        edit ? <Input label="Qualidade do sono" name="sleepQuality" id="sleepQuality" placeholder="Sem informação" disabled/> : <Select label="Qualidade do sono" name="sleepQuality" id="sleepQuality" options={[{id: "Ruim", title: 'Ruim'}, {id: "Bom", title: 'Bom'}]} placeholder="Selecione uma opção" />
                                    }
                                </div>
                            </div>
                            <div>
                                <div>
                                    {
                                        edit ? <Textarea label="Historico clínico" id="clinicalHistory" name="clinicalHistory" rows="6" cols="30" disabled/> : <Textarea label="Historico clínico" id="clinicalHistory" name="clinicalHistory" rows="6" cols="30" />
                                    }
                                </div>
        
                                <div>
                                    {
                                        edit ? <Textarea label="Objetivo" id="objective" name="objective" rows="6" cols="30" disabled /> : <Textarea label="Objetivo" id="objective" name="objective" rows="6" cols="30" />
                                    }
                                </div>
                            </div>
                        </Scope>
                        <hr/>

                    <h4>2. SEMIOLOGIA NUTRICIONAL</h4>
                    <Scope path="nutritionalSemiology">
                        <h5>2.1 ALTERAÇÃO DE PESO</h5>
                        <Scope path="weightChanges">
                            <div>
                                <div>
                                    {
                                        edit ? <Input label="Tipo" name="kgChanges" id="kgChanges" placeholder="Sem informação" disabled/> : <Select label="Tipo" name="kgChanges" id="kgChanges" options={[{id: "PerdaPeso", title: 'Perda de Peso'}, {id: "GanhoPeso", title: 'Ganho de Peso'}]} placeholder="Selecione uma opção" placeholder="Selecione uma opção"/>
                                    }
                                </div>
                                <div>
                                    {
                                        edit ? <Input label="Quantidade" type="Number" max="400" step="0.1" name="obsWeight" placeholder="Sem informação" disabled /> : <Input label="Quantidade" type="Number" max="400" step="0.1" name="obsWeight" placeholder="Peso em kg" />
                                    }
                                </div>               
                            </div>
                        </Scope>

                        <h5>2.2 EXAME FÍSICO</h5>
                        <Scope path="physicalExam">
                            <div>
                                <div>
                                    {
                                        edit ? <Check label="Pele Ressecada"  id="drySkin" name="drySkin" disabled /> : <Check label="Pele Ressecada"  id="drySkin" name="drySkin" />
                                    }
                                </div>
        
                                <div>
                                    {
                                        edit ? <Check label="Umidade das mucosas"  id="mucousMoisture" name="mucousMoisture" disabled /> : <Check label="Umidade das mucosas"  id="mucousMoisture" name="mucousMoisture"/>
                                    }
                                </div>
                                <div>
                                    {
                                        edit ? <Check label="Queda de cabelo"  id="lossOfHair" name="lossOfHair" disabled /> : <Check label="Queda de cabelo"  id="lossOfHair" name="lossOfHair"/>
                                    }
                                </div>
                            </div>
                            <div>
                                <div>
                                    {
                                        edit ? <Check label="Edema"  id="edema" name="edema" disabled /> : <Check label="Edema"  id="edema" name="edema"/>
                                    }
                                    
                                </div>
                                <div>
                                    {
                                        edit ? <Check label="Fraqueza" id="weakness" name="weakness" disabled/> : <Check label="Fraqueza" id="weakness" name="weakness"/>
                                    }
                                    
                                </div>
                                <div>
                                    {
                                        edit ? <Check label="Palidez conjutival" defaultChecked="sim" id="conjunctivalPallor" name="conjunctivalPallor" disabled /> : <Check label="Palidez conjutival" defaultChecked="sim" id="conjunctivalPallor" name="conjunctivalPallor"/>
                                    }
                                    
                                </div>
                                <div>
                                    {
                                        edit ? <Check label="Unhas coiloníquas" id="koilonychicNails" name="koilonychicNails" disabled /> : <Check label="Unhas coiloníquas" id="koilonychicNails" name="koilonychicNails"/>
                                    }
                                    
                                </div>
                            </div>
                            <div>
                                <div>
                                    {
                                        edit ? <Textarea label="Observação" id="obsPhysicalExam" name="obsPhysicalExam" rows="6" cols="30" disabled/> : <Textarea label="Observação" id="obsPhysicalExam" name="obsPhysicalExam" rows="6" cols="30"/>
                                    }
                                </div>
                            </div>
                        </Scope>

                        <h5>2.3 ALTERAÇÃO NO APARELHO DIGESTIVO</h5>
                        <Scope path="disgestiveSystem">
                            <div>
                                <div>
                                    {
                                        edit ? <Check label="Dispepsia" id="dyspepsia" name="dyspepsia" disabled /> : <Check label="Dispepsia" id="dyspepsia" name="dyspepsia" />
                                    }
                                    
                                </div>
        
                                <div>
                                    {
                                        edit ? <Check label="Dores estomacais" id="stomachPains" name="stomachPains" disabled /> : <Check label="Dores estomacais" id="stomachPains" name="stomachPains"/>
                                    }
                                </div>
                                <div>
                                    {
                                        edit ? <Check label="Nauseas" id="nausea" name="nausea" disabled /> : <Check label="Nauseas" id="nausea" name="nausea"/>
                                    }
                                    
                                </div>
        
                                <div>
                                    {
                                        edit ? <Check label="Vômitos" id="vomiting" name="vomiting" disabled /> : <Check label="Vômitos" id="vomiting" name="vomiting"/>
                                    }
                                    
                                </div>
                                <div>
                                    {
                                        edit ? <Check label="Disfagia" id="dysphagia" name="dysphagia" disabled /> : <Check label="Disfagia" id="dysphagia" name="dysphagia"/>
                                    }
                                    
                                </div>
                            </div>
                            <div>
                                <div>
                                    {
                                        edit ? <Textarea label="Observação" id="obsDisgestiveSystem" name="obsDisgestiveSystem" rows="6" cols="30" disabled /> : <Textarea label="Observação" id="obsDisgestiveSystem" name="obsDisgestiveSystem" rows="6" cols="30"/>
                                    }
                                    
                                </div>
                            </div>
                        </Scope>
    
                        <h5>2.4 ALTERAÇÕES INTESTINAIS</h5>
                        <Scope path="intestinalChanges">
                            <div>
                                <div>
                                    {
                                        edit ? <Check label="Diarreia" id="diarreia" name="diarreia" disabled/> : <Check label="Diarreia" id="diarreia" name="diarreia" />
                                    }
                                </div>
                                <div>
                                    {
                                        edit ? <Check label="Constipação" id="cold" name="cold" disabled/> : <Check label="Constipação" id="cold" name="cold" />
                                    }
                                    
                                </div>
                                <div>
                                    {
                                        edit ? <Textarea label="Observação" id="obsIntestinalChanges" name="obsIntestinalChanges" rows="6" cols="30" disabled /> : <Textarea label="Observação" id="obsIntestinalChanges" name="obsIntestinalChanges" rows="6" cols="30" />
                                    }
                                    
                                </div>
                            </div>
                        </Scope>
                    </Scope>
                        <hr/>

                        <h4>3. CONSUNO DE ÁGUA</h4>
                        <div>
                            <div>
                                {
                                    edit ? <Textarea labe="Descrição" id="waterConsumption" name="waterConsumption" rows="6" cols="30" disabled /> : <Textarea labe="Descrição" id="waterConsumption" name="waterConsumption" rows="6" cols="30"/>
                                }
                            </div>
                        </div>
                        <hr/>
        
                        <h4>4. ALERGIAS E INTOLERÂNCIAS</h4>
                        <Scope path="allergiesAndIntolerances">
                            <div>
                                <div>
                                {
                                    edit ? <Textarea label="Alergia alimentar" id="foodAllergy" name="foodAllergy" rows="6" cols="30" disabled /> : <Textarea label="Alergia alimentar" id="foodAllergy" name="foodAllergy" rows="6" cols="30" />
                                }
                                </div>
        
                                <div>
                                    {
                                        edit ? <Textarea label="Outras alergias" id="otherAllergies" name="otherAllergies" rows="6" cols="30" disabled /> : <Textarea label="Outras alergias" id="otherAllergies" name="otherAllergies" rows="6" cols="30"/>
                                    }
                                    
                                </div>
        
                                <div>
                                    {
                                        edit ? <Textarea label="Intolerâncias" id="intolerances" name="intolerances" rows="6" cols="30" disabled /> : <Textarea label="Intolerâncias" id="intolerances" name="intolerances" rows="6" cols="30" />
                                    }
                                </div>
                            </div>
                        </Scope>
                        <hr/>
    
                        <h4>5. USO DE MEDICAMENTOS/SUPLEMENTOS</h4>
                        <hr/>
    
                        <h4>6. ATIVIDADE FÍSICA</h4>
                        <Scope path="physicalActivity">
                            <div>
                                <div>
                                    {
                                        edit ? <Check label="Pratica atividade Física" id="physicalActivityYesNo" name="physicalActivityYesNo" disabled/> : <Check label="Pratica atividade Física" id="physicalActivityYesNo" name="physicalActivityYesNo"/>
                                    }
                                </div>
                                <div>
                                    {
                                        edit ? <Textarea label="Discrição da frenquência" id="frequencyActivity" name="frequencyActivity" rows="6" cols="30" disabled /> : <Textarea label="Discrição da frenquência" id="frequencyActivity" name="frequencyActivity" rows="6" cols="30" />
                                    }
                                </div>
                            </div>
                        </Scope>
                        <hr/>
    
                        <h4>7. BEBIDA ALCOÓLICA</h4>
                        <Scope path="alcoholicBeverage">
                            <div>
                                <div>
                                    {
                                        edit ? <Check label="Ingere bebida alcoolica" id="yesNoBeverage" name="yesNoBeverage" disabled/> : <Check label="Ingere bebida alcoolica" id="yesNoBeverage" name="yesNoBeverage"/>
                                    }
                                </div>
                                <div>
                                    {
                                        edit ? <Textarea label="Discrição da frenquência" id="frequencyBeverage" name="frequencyBeverage" rows="6" cols="30" disabled /> : <Textarea label="Discrição da frenquência" id="frequencyBeverage" name="frequencyBeverage" rows="6" cols="30" />
                                    }
                                </div>
                            </div>
                        </Scope>
                        <hr/>
    
                        <h4>8. TABAGISMO</h4>
                        <div>
                            <div>
                                    {
                                        edit ? <Check label="Fumante" id="smoking" name="smoking" disabled /> : <Check label="Fumante" id="smoking" name="smoking"/>
                                    }
                            </div>
                        </div>
                        <hr/>
    
                        <h4>9. HORARIOS</h4>
                        <Scope path="schedules">
                            <div>
                                <div>
                                    {
                                        edit ? <Input label="Acorda às" type="time" name="wakeUp" disabled/> : <Input label="Acorda às" type="time" name="wakeUp" />
                                    }
                                    
                                </div>
                                <div>
                                    {
                                        edit ? <Input label="Dorme às" type="time" name="sleeps" disabled/> : <Input label="Dorme às" type="time" name="sleeps" />
                                    }
                                </div>
                                <div>
                                    {
                                        edit ? <Input label="Atividade física às" type="time" name="physicalActivity" disabled /> : <Input label="Atividade física às" type="time" name="physicalActivity"  />
                                    }
                                </div> 
                            </div>
                        </Scope>
                        <hr/>
    
                        <h4>10. AVALIAÇÃO DIETÉTICA</h4>
    
                        <h5>10.1. PREFERÊNCIAS E AVERSÕES</h5>
                        <hr/>

                        {
                            edit ? <button className="Salve" disabled>Atualizar dados</button> : <button className="Salve" type="submit" onSubmit={e => { e.preventDefault()}} >Atualizar dados</button>
                        }                            
                            
                    </Form>
                </MedicalInfo>
    
            </Container>
        )
    }
}