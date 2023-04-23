import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from "@mui/icons-material"
import { Link, useLocation, useParams } from "react-router-dom"
import styled from "styled-components"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect } from "react"
import { useState } from "react"
import { useUsersContext } from "../../hooks/useUsersContext" 


const Container = styled.div`
    flex: 4;
    padding: 20px;
`
const UserTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const UserTitle = styled.h1``
const UserAddButton = styled.button`
    width: 80px;
    border: none;
    border-radius: 5px;
    padding: 5px;
    background-color: teal;
    cursor:pointer;
    color: white;
    font-size: 16px;
`

const UserContainer = styled.div`
    display: flex;
    margin-top: 20px;
`
const UserShow = styled.div`
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); 
`
const UserShowTop = styled.div`
    display: flex;
    align-items: center;
`
const UserShowImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`
const UserShowTopTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`
const UserShowUsername = styled.span`
    font-weight: 600;
`
const UserShowUserTitle = styled.span`
    font-weight: 300;
`
const UserShowBottom = styled.div`
    margin-top: 20px;
`
const UserShowTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175,170,170);
`
const UserShowInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;
    color: #444;
`
const UserShowInfoTitle = styled.span`
    margin-left: 10px;
`

const UserUpdate = styled.div`
    flex: 2;
    padding: 2%;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    margin-left: 20px;
`
const UserUpdateTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`
const UserUpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`
const UserUpdateLeft = styled.div``
const UserUpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const UserUpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`
const UserUpdateLabel = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
`
const UserUpdateInput = styled.input`
    border: none;
    width: 250px;
    border-bottom: 1px solid gray;
    height: 30px;
`
const UserUpdateSelect = styled.select`
    border: none;
    width: 250px;
    border-bottom: 1px solid gray;
    height: 30px;
`
const UserUpdateOption = styled.option``
const UserUpdateUpload = styled.div`
    display: flex;
    align-items: center;
`
const UserUpdateImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius:30px;
    object-fit: cover;
    margin-right: 20px;
`
const UserUpdateImgUpload = styled.input``
const UserUpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 5px;
    cursor: pointer;
    background-color: darkblue;
    color: white;
    font-weight: 600;
`

const UserPage = () => {
    
    const { userAccessed, dispatch } = useUsersContext()
    const { user } = useAuthContext()
    const { userId } = useParams() 

    

    const [ isLoading, setIsLoading ] = useState(false)
    const [error, setError] = useState(null)
    const [created, setCreated] = useState(false)
    const [ hideCommittee, setHideCommittee ] = useState(true)

    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ role, setRole ] = useState('')
    const [ committee, setCommittee ] = useState('')
    
    const name = { firstName, lastName }
    
    const handleUpdateData = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!user || user.user.role !== 'President') {
            setIsLoading(false)
            setError('You are not authorized')
        }

        const updatedData = new FormData()

        name && updatedData.append('firstName', name)
        username && updatedData.append('username', username)
        email && updatedData.append('email', email)
        password && updatedData.append('password', password)
        phone && updatedData.append('phone', phone)
        role && updatedData.append('role', role)
        committee && updatedData.append('committee', committee)


        const response = await fetch(`/users/edit-user/${userAccessed._id}`, {
            method:'PUT',
            body: updatedData,
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


    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(`/users/user/${userId}`, {
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_USER', payload: json})
            }
        }
        user && fetchUserData()

    }, [ user, dispatch ])
    
    const controlRoles = (e) => {
        if (e.target.value === 'Vice President') {
            setRole(e.target.value)
            setCommittee(1)
        } else {
            setRole(e.target.value)
            setCommittee(null)
        }
    }
  return (
    <Container>
        {
            userAccessed && (
                <>
                    <UserTitleContainer>
                        <UserTitle>Edit User</UserTitle>
                        <Link to="newUserF">
                            <UserAddButton>Create</UserAddButton>
                        </Link>
                    </UserTitleContainer>
                    <UserContainer>
                        <UserShow>
                            <UserShowTop>
                                <UserShowImg src={userAccessed.profilePicUrl}/>
                                <UserShowTopTitle>
                                    <UserShowUsername>{userAccessed.name.firstName} {userAccessed.name.lastName}</UserShowUsername>
                                    <UserShowUserTitle>{userAccessed.title}</UserShowUserTitle>
                                </UserShowTopTitle>
                            </UserShowTop>
                            <UserShowBottom>
                                <UserShowTitle>Account Details</UserShowTitle>
                                <UserShowInfo>
                                    <PermIdentity style={{fontSize:'18px'}} />
                                    <UserShowInfoTitle>{userAccessed.username}</UserShowInfoTitle>
                                </UserShowInfo>
                                <UserShowInfo>
                                    <CalendarToday style={{fontSize:'18px'}} />
                                    <UserShowInfoTitle>{userAccessed.createdAt}</UserShowInfoTitle>
                                </UserShowInfo>
                                <UserShowTitle>Contact Details</UserShowTitle>
                                <UserShowInfo>
                                    <PhoneAndroid style={{fontSize:'18px'}} />
                                    <UserShowInfoTitle>+20 {userAccessed.phone}</UserShowInfoTitle>
                                </UserShowInfo>
                                <UserShowInfo>
                                    <MailOutline style={{fontSize:'18px'}} />
                                    <UserShowInfoTitle>{userAccessed.email}</UserShowInfoTitle>
                                </UserShowInfo>
                                <UserShowInfo>
                                    <LocationSearching style={{fontSize:'18px'}} />
                                    <UserShowInfoTitle>Cairo. Egypt</UserShowInfoTitle>
                                </UserShowInfo>
                            </UserShowBottom>
                        </UserShow>
                        <UserUpdate>
                            <UserUpdateTitle>Edit</UserUpdateTitle>
                            <UserUpdateForm onSubmit={handleUpdateData}>
                                <UserUpdateLeft>
                                    <UserUpdateItem>
                                        <UserUpdateLabel>Username</UserUpdateLabel>
                                        <UserUpdateInput value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder={userAccessed.username}/>
                                    </UserUpdateItem>
                                    <UserUpdateItem>
                                        <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                                            <div style={{display:'flex',flexDirection:'column'}}>
                                                <UserUpdateLabel>First Name</UserUpdateLabel>
                                                <UserUpdateInput value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" placeholder={userAccessed.name.firstName}/>
                                            </div>
                                            <div style={{display:'flex',flexDirection:'column'}}>
                                                <UserUpdateLabel>Last Name</UserUpdateLabel>
                                                <UserUpdateInput value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" placeholder={userAccessed.name.lastName}/>
                                            </div>
                                        </div>
                                    </UserUpdateItem>
                                    <UserUpdateItem>
                                        <UserUpdateLabel>Email</UserUpdateLabel>
                                        <UserUpdateInput value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder={userAccessed.email}/>
                                    </UserUpdateItem>
                                    <UserUpdateItem>
                                        <UserUpdateLabel>Phone</UserUpdateLabel>
                                        <UserUpdateInput value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" placeholder={userAccessed.phone}/>
                                    </UserUpdateItem>
                                    <UserUpdateItem>
                                        <div style={{display:'flex', flexDirection:'row', gap: '10px'}}>
                                            <div style={{display:'flex', flexDirection:'column'}}>
                                                <UserUpdateLabel>Role</UserUpdateLabel>
                                                <UserUpdateSelect value={role} onChange={controlRoles}>
                                                    <UserUpdateOption value="Vice President">Vice President</UserUpdateOption>
                                                    <UserUpdateOption value="Head">Head</UserUpdateOption>
                                                    <UserUpdateOption value="Vice Head">Vice Head</UserUpdateOption>
                                                    <UserUpdateOption value="Member">Member</UserUpdateOption>
                                                </UserUpdateSelect>
                                            </div>
                                            <div style={{display:role === 'Vice President' ? 'none' : 'flex', flexDirection:'column'}}>
                                                <UserUpdateLabel>Committee</UserUpdateLabel>
                                                <UserUpdateSelect value={committee} onChange={(e) => setCommittee(e.target.value)}>
                                                    <UserUpdateOption value="Media">Media</UserUpdateOption>
                                                    <UserUpdateOption value="Marketing">Marketing</UserUpdateOption>
                                                    <UserUpdateOption value="Events">Events</UserUpdateOption>
                                                    <UserUpdateOption value="Public Relations">Public Relations</UserUpdateOption>
                                                    <UserUpdateOption value="Human Resources">Human Resources</UserUpdateOption>
                                                    <UserUpdateOption value="Logistics">Logistics</UserUpdateOption>
                                                    <UserUpdateOption value="Academic">Academic</UserUpdateOption>
                                                </UserUpdateSelect>
                                            </div>
                                        </div>
                                    </UserUpdateItem>
                                </UserUpdateLeft>
                                <UserUpdateRight>
                                    <UserUpdateUpload>
                                        <UserUpdateImg src={userAccessed.profilePicUrl}/>
                                        <UserUpdateLabel htmlFor="file"> <Publish style={{cursor: 'pointer',width:'40px',height:'40px'}}/> </UserUpdateLabel>
                                        <UserUpdateImgUpload type="file" id="file" style={{display: 'none'}}/>
                                    </UserUpdateUpload>
                                    <UserUpdateButton>Update</UserUpdateButton>
                                </UserUpdateRight>
                            </UserUpdateForm>
                        </UserUpdate>
                    </UserContainer>
                </>
            )
        }
    </Container>
  )
}

export default UserPage;
