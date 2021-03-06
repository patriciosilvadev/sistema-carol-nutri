import styled, {keyframes} from 'styled-components'

const DaDireitaParaEsquerda = keyframes`
    from{
        opacity: 0;
        transform: translateX(-20%)

    }
    to {
        opacity: 1;
        transform: translateX(0)
    }
`

export const Container = styled.div`
animation: ${DaDireitaParaEsquerda} 1s;
    margin: auto;
    max-width: 65%;
    padding:25px;

`

export const Return = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;

a {
    margin-bottom:10px;
    padding: 5px;
    display: flex;
    align-items: center;
    text-decoretion: none;
    color: #fff;
    transition: .3s;
    border-radius: 6px;


    &:hover{
        color: #a8a8b3;
        background: rgba(320, 320, 320, 0.1)
    }
}
`

export const UsuarioInfo = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    margin: auto;
    background: #fff;
    padding: 25px;
    border-radius: 8px;

    div {
        display: flex;
        margin:auto;
        img {
            width: 50px;
            height: 50px;
        }

        h1{
            color: #831e62;
            font-weight: bold;
            margin-bottom: 50px;
        }
    }

    header {
        display: flex;

        img {
            width: 100px;
            height:100px;
            border-radius: 50%;
            margin: 0;
            padding: 0;
        }

        div {
            display: flex;
            justify-content: center;
            align-self: center;
            flex-direction: column;
            margin-left: 24px;

            strong {
                font-size: 28px;
                color: #831e62;
            }

            p{
                text-align: justify;
                font-size: 20px;
                color: #831e62;
                margin-top: 4px;
                margin-bottom: 4px;
            }

            span {
                color: #831e62;
            }
        }
    }

    .botoes {
        display: flex;
        justify-content: space-between;
        margin: 20px 15px;

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            background: #ff6464;

            width: 100px;
            height: 40px;
            border: none;
            border-radius: 6px;
            transition: 0.5s;
    
            &:hover {
                background: #ff3c3c;
            }
        }

        a {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            background: #17A2b8;

            width: 100px;
            height: 40px;
            border: none;
            border-radius: 6px;
            transition: 0.5s;
    
            &:hover {
                background: #5FC2FF;
            }

            svg {
                margin: 0;
            }
        }

        .excluir {
            background: red;
            width: 100%;
            margin: auto;
        }
    }

`

export const Editor = styled.div`
    margin: auto;    
    div {
        display: flex;
        align-items: center;
        
        .Edit{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            background: #fff;
            color #3b9eff;
            margin: 10px;
            font-weight: bold;
            border: 0;
            box-shadow: 2px 2px #363636;
            border-radius: 50%;
            transition: background 0.5s;

            svg{
                color: #be317f;  
            }
    
            &:hover{
                background: #e8e1e1;
    
                div{
                    visibility: visible;
                }
            }
        }

        h2 {
            color: #fff;
            margin: 0;
        }

    }

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        h2 {
            color: #fff;
        }

        label {
            margin: 0;
            color: #fff;
        }

        textarea {
            background: rgba(0, 0, 0, 0.1);
            border: 0;
            border-radius: 4px;
            padding: 10px;
            color #fff;
            width: 100%;
    
            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
        }
        
        input {
            background: rgba(0, 0, 0, 0.1);
            border: 0;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color #fff;
            margin: 0 0 10px;
    
            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
        }
    
        span {
            color: #fff;
            align-self: self-start;
            margin: 0 0 10px;
            font-weight: bold;
        }
    
        hr {
            border: 0;
            height: 1px;
            background: #fff;
            margin: 10px 0 20px;
        }
    
        button {
            margin: 5px 0 0;
            height: 44px;
            background: #3b9eff;
            font-weight: bold;
            color #fff;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.3s;
    

        }
    }
`

export const Loading = styled.div`
    display: flex;
    flex-direction column;
    align-items: center;

    h1 {
        margin-top: 200px;
        max-width: 450px;
        color: #fff;
    }
`