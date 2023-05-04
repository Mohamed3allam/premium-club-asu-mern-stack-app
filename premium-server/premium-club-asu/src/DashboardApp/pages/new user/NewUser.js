import styled from "styled-components"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState } from "react"
import { useUsersContext } from "../../hooks/useUsersContext"
import config from "../../../config"
import { mobile } from "../../responsive"

const Container = styled.div`
    flex: 5;
    padding: 2%;
    height: 100%;
    width: 100%;
    max-width: 1400px !important;

    ${mobile({
        paddingTop:'60px'
    })}
`

const NewUserTitle = styled.h1`
    margin-bottom: 3%;
    ${mobile({
        fontSize:'17px !important',
        marginBottom:'20px'
    })}
`
const NewUserForm = styled.form`
    display: flex;
    flex-direction: column;
`
const FormDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`
const NewUserItem = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
`
const NewUserLabel = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: gray;
    margin-right: 15px;

    ${mobile({
        fontSize:'10px'
    })}
`
const NewUserInput = styled.input`
    height: 20px;
    padding: 20px;
    border: none;
    border-bottom: 1px solid gray;
    ${mobile({
        fontSize:'10px',
        padding:'15px'
    })}
`
const NewUserSelect = styled.select`
    width: 50%;
    height: 40px;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    ${mobile({
        fontSize:'10px',
        height:'25px'
    })}
`
const NewUserOption = styled.option``
const NewUserButton = styled.button`
    width: 200px;
    border: none;
    cursor: pointer;
    background-color: darkblue;
    color: white;
    padding: 7px 10px;
    font-weight: 600;
    border-radius: 10px;
    margin: 30px;

    &:hover {
        background-color: rgb(0, 16, 85);
    }
    &:disabled {
        background: gray;
        cursor: nones;
    }
`

const NewUser = () => {
    const { user } = useAuthContext()
    const { users, dispatch } = useUsersContext()

    const premiumApi = config.premiumApi

    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const name = { firstName, lastName }
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ role, setRole ] = useState('')
    const [ committee, setCommittee ] = useState('')

    const [error, setError] = useState(null)
    const [created, setCreated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])

    const handleUserCreation = async (e) => {
        e.preventDefault()
        setIsLoading(true)


        const response = await fetch(`${premiumApi}/authuser/signup`, {
          method:'POST',
          body: JSON.stringify({name, username, email, password, phone, role, committee}),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          e.preventDefault()
          setError(json.error)
          setIsLoading(false)
        }
    
        if (response.ok) {
            e.preventDefault()
            setIsLoading(false)
            setError(null)
            setEmptyFields([])
            setFirstName('')
            setLastName('')
            setUsername('')
            setEmail('')
            setPassword('')
            setPhone('')
            setRole('')
            setCommittee('')
            setCreated('User Added Successfully!')
            // window.location.reload()
        }
      }

  return (
    <Container>
        <NewUserTitle>Create New User</NewUserTitle>
        <NewUserForm>
            <FormDiv>
                <NewUserItem>
                    <NewUserLabel htmlFor="firstName">First Name</NewUserLabel>
                    <NewUserInput type='text'  id="firstName" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                </NewUserItem>
                <NewUserItem>
                    <NewUserLabel htmlFor="lastName">Last Name</NewUserLabel>
                    <NewUserInput type='text'  id="lastName" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                </NewUserItem>
                <NewUserItem>
                    <NewUserLabel htmlFor="username">Username</NewUserLabel>
                    <NewUserInput type='text'  id="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                </NewUserItem>
                <NewUserItem>
                    <NewUserLabel htmlFor="email">Email</NewUserLabel>
                    <NewUserInput type='email'  id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </NewUserItem>
                <NewUserItem>
                    <NewUserLabel htmlFor="password">Password</NewUserLabel>
                    <NewUserInput type='password' placeholder="type password.." id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </NewUserItem>
                <NewUserItem>
                    <NewUserLabel htmlFor="phone">Phone</NewUserLabel>
                    <NewUserInput type='tel'  id="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                </NewUserItem>
                <NewUserItem style={{display:'block'}}>
                    <NewUserLabel>Role: </NewUserLabel>
                    <NewUserSelect value={role} onChange={(e)=> setRole(e.target.value)} name="role" id="role">
                        <NewUserOption value="Head">Head</NewUserOption>
                        <NewUserOption value="Vice Head">Vice Head</NewUserOption>
                        <NewUserOption value="Member">Member</NewUserOption>
                    </NewUserSelect>
                </NewUserItem>
                <NewUserItem style={{display:'block'}}>
                    <NewUserLabel>Committee: </NewUserLabel>
                    <NewUserSelect value={committee} onChange={(e)=>{setCommittee(e.target.value)}} name="committee" id="committee">
                        <NewUserOption value="Media">Media</NewUserOption>
                        <NewUserOption value="Marketing">Marketing</NewUserOption>
                        <NewUserOption value="Events">Events</NewUserOption>
                        <NewUserOption value="Human Resources">Human Resources</NewUserOption>
                        <NewUserOption value="Public Relations">Public Relations</NewUserOption>
                        <NewUserOption value="Logistics">Logistics</NewUserOption>
                        <NewUserOption value="Academic">Academic</NewUserOption>
                    </NewUserSelect>
                </NewUserItem>
            </FormDiv>
            <NewUserButton disabled={isLoading} onClick={handleUserCreation}>Create</NewUserButton>
            {
                created && (
                    <>
                        <b color="green">User Created Successfully</b>
                    </>
                )
            }
            {
                error && (
                    <>
                        <b style={{color:'red'}}>{error}</b>
                    </>
                )
            }
        </NewUserForm>
    </Container>
  )
}

export default NewUser
