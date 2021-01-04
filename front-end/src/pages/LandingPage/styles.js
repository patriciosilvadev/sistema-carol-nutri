import styled from 'styled-components'

export const Container = styled.div`
    background: #fff;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .imgs {
        display: flex;
        flex-direction: column;
        width:30%;

        .foto {
            width: 150px;
            height:150px;
            border-radius: 50%;
        }

        .logo{
            width: 300px;
            height:300px;

        }
    }

    .conteudo {
        width:60%;
        display: flex;
        flex-direction: column;
        p{
            font-size: 20px;
            align: center;
        }
        h1 {
            font-weight: 900;
            color: #831e62;
        }
        strong {
            color: #831e62;
        }
    }

`