import styled from "styled-components"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useUsersContext } from "../../../hooks/useUsersContext"


const UserListUser = styled.div`
  display: flex;
  align-items: center;
  word-wrap: break-word !important;
`
const UserListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`
const UserListEdit = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`




const Container = styled.div`
    height: 100%;
`
const Logistics = () => {
  const { user } = useAuthContext()
  const [ data, setData ] = useState('')
  const { users, dispatch } = useUsersContext()

  const handleDelete = (id) => {
    setData(users.filter((user)=>user.id !== id))
  }

  
  useEffect(() => {
    
    const fetchLogistics = async () => {
      const response = await fetch('/users/Logistics', {
        method:'GET',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({type:'SET_USERS', payload: json})
      }
    }
    user && fetchLogistics();
    
  }, [ user, dispatch ])

  

  const columns = [
    { field: 'id', headerName: 'ID', width: 130, renderCell: (params) => {
      return (
        <UserListUser style={{fontWeight:'bold',fontSize:12.5}}>
          {params.row.premium_id}
        </UserListUser>
      )
    } },
    { field: 'username', headerName: 'Username', width: 250, renderCell: (params)=>{
      return (
        <UserListUser style={{fontWeight:'bold'}}>
          <UserListImg src={params.row.profilePicUrl} alt="" />
          {
            user.user._id === params.row._id ?
            'You' :
            `${params.row.name.firstName} ${params.row.name.lastName}`
          }
        </UserListUser>
      )
    } },
    { field: 'email', headerName: 'Email', width: 220, renderCell: (params) => {
      return (
        <UserListUser>
          {params.row.email}
        </UserListUser>
      )
    } },
    {field: 'role', headerName: 'Role', width: 200, renderCell: (params) => {
      return (
        <UserListUser>
          {params.row.role}
        </UserListUser>
      )
    }
    },
    {field: 'committee', headerName: 'Committee', width: 200, renderCell: (params) => {
      return (
        <UserListUser>
          {(params.row.committee === '0' || params.row.committee === '1') ? '' : params.row.committee}
        </UserListUser>
      )
    }
    },

    { field: 'action', headerName: 'Action', width: 150, renderCell: (params) => {
        return (
          <>
            {
              (user.user._id === params.row._id) ? null : (
                <div>
                  <Link to={'/dashboard/user/'+ params.row._id}>
                    <UserListEdit>
                      Edit
                    </UserListEdit>
                  </Link>
                  <DeleteOutline style={{color: 'red', cursor: 'pointer'}} onClick={()=> handleDelete(params.row.id)} />
                </div>
              )
            }
          </>
        )
      }
    }
  ];

  return (
    <>
      <Container>
        {
          users && (
            <DataGrid
              autoHeight
              rows={users}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20]}
              checkboxSelection
              disableSelectionOnClick
              getRowId={(row)=>row._id}
            />
          )
        }
      </Container>
    </>
  )
}

export default Logistics;
