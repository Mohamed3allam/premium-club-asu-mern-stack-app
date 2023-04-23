import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 3%;
    background-color: #fff;
    margin-top: 10%;
    border-radius: 10px;
`
const LoginTitle = styled.h2``


const FormLabel = styled.label`

`
const FormInput = styled.input`
    border-radius: 10px;
    width: 100%;
`
const SubmitLogin = styled.input``
const FormLastParagraph = styled.p``
const ErrorDiv = styled.p`
    color: red;
`

const Login = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        await login(username, password)
    }

    return (
        <>
            <div className="wrapper">
                <Helmet>
                    <meta property="og:title" content="Login" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://www.premium-club-asu.org" />
                    
                    <title> Login </title>

                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta name="description" content="Premium Club is a Nonprofit Organization and one of the leading student activities in faculty of Commerce Ain shams University."/>
                    <meta name="keywords" content="premium club,premium, premium club asu, club, asu, بريميم, premium student activity, student activity, كلية تجارة"/>
                </Helmet>
            </div>
            <Container>
                <LoginForm onSubmit={handleLoginSubmit}>

                    <LoginTitle>
                        Are you a Premium Member
                    </LoginTitle>

                    <FormLabel htmlFor="">
                        Username
                    </FormLabel>
                    <FormInput type="text" onChange={(e) => setUsername(e.target.value)} value={username} />

                    <FormLabel htmlFor="">
                        Password
                    </FormLabel>
                    <FormInput type="password" onChange={(e) => setPassword(e.target.value)} value={password} />

                    <SubmitLogin type="submit" disabled={isLoading} value= "Login" />
                    {error && <ErrorDiv>{error}</ErrorDiv>}

                </LoginForm>
            </Container>
        </>
    )
}

export default Login;