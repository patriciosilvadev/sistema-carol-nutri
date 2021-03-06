import styled from 'styled-components'

export const Container = styled.div`
    background: #fff;
`

export const ContentPrimario = styled.div`
    background: #fff;
    height: 64px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(max-width: 800px) {
        height: 32px;
    }

    nav {
        background: #fff;
        display: flex;
        align-items: center;

        img {
            background: #fff;
            height: 50px;
            margin-left: 10px;

            @media(max-width: 800px) {
                height: 25px;
            }
        }

        a {
            background: #fff;
            font-weight: bold;
            font-size: 20px;
            color: #fff;
            border-bottom: 0;
        }
    }

    aside {
        background: #fff;
        display: flex;
        align-items: center;
    }
`

export const ContentSegundario = styled.nav`
    padding: 10px;
    background: #831e62;


    nav {
        display: flex;
        justify-content: center;
        align-items: center;

        a {
            padding: 0;
            color: #fff;
            margin 0px 5%;
            border-bottom: 0;
            text-decoration: none;

            @media(max-width: 800px) {
                font-size: 10px;
            }
        }

        .Link {
            transition: 0.3s;
            &:hover{
                letter-spacing: 1px;
                text-shadow: 3px 3px 4px #121112;
            }
        }
    }
`

export const Profile = styled.div`
    background: #fff;
    display: flex;
    margin-left: 20px;
    padding-left: 20px;

    div {
        background: #fff;
        text-align: right;
        margin-right: 10px;

        strong {
            background: #fff;
            display: block;
            color: #831e62;
        }


        .link-1 {
            transition: 0.5s ease;
            background: #fff;
            color: #831e62;
            font-size: 20px;
            text-decoration: none;
            border-top: 4px solid#fff;
            border-bottom: 4px solid#fff;
            padding: 15px 0;
            margin: 0 20px;

            @media(max-width: 800px) {
                font-size: 14px;
                padding: 10px 0;
                margin: 0 10px;
            }
            
          }
          .link-1:hover {
            border-top: 4px solid #831e62;
            border-bottom: 4px solid #831e62;
            padding: 6px 0;

          }
    }

    img {
        height: 40px;
        border-radius: 100%;

        
        @media(max-width: 800px) {
            height: 20px;
        }
    }
`