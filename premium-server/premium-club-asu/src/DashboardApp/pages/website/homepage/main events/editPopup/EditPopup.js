import { Close, Delete, HighlightOff, Upload } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../../../../hooks/useAuthContext';
import { useHomeImgsContext } from '../../../../../hooks/useHomeImgsContext';
import './editPopup.css';
import config from '../../../../../../config';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-image: blue;
    transition: 0.5s all ease !important;
    backdrop-filter: brightness(0.2);
    
`
const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background-color: white;
    min-width: 50%;
    width: fit-content;
    height: fit-content;
    min-height: fit-content;
    padding: 20px;
    
`
const EditContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
`

const Button = styled.button`

`
const EditTitle = styled.h1`
    text-align: center;
`
const EditForm = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const EditData = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    padding: 40px;
`
const EditImage = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
`
const ImgPreview = styled.img`

    border-radius: 5px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: none;
    object-fit: cover;
`
const EditImgLabel = styled.label`
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: rgba(0,0,0,0.5);
    border-radius: 5px;

`
const EditImgInput = styled.input``
const EditDataLabel = styled.label``
const EditDataInput = styled.input`
    border: none;
    border-bottom: solid gray 1px;
    width: 70%;
    height: 30px;
    margin-bottom: 50px;
`
const EditButton = styled.button`
    width: fit-content;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: rgba(0,0,0,0.8);
    color: white;
    font-size: 20px;

    &:hover {
        background-color: white;
        color: rgba(0,0,0,0.8);
    }
`

const DeletePopup = styled.button`
    position: absolute;
    top: 3%;
    left: 3%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: black;
    border: none;

    &:hover {
        background-color: gray;
    }
`
const CloseButton = styled.button`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 3%;
    right: 3%;
    border-radius: 50%;
    background: none;
    padding: 0;
    margin: 0;
    border: none;
`
const DeleteButton = styled.button`
    background-color: darkred;
    border: none;
    border-radius: 5px;
    padding: 2%;
    color:white;
    font-weight:bold;
    
    &:hover {
        background-color: rgb(66, 0, 0);
    }
`
const CancelButton = styled.button`
    background-color: gray;
    border: none;
    border-radius: 5px;
    padding: 2%;
    color:white;
    font-weight:bold;
    
    &:hover {
        background-color: rgb(25, 25, 25);
    }
`


const changeImgPreviewHandler = async () => {
    const [file] = await document.getElementById('editImg').files
    console.log(file)
    if (file) {
        document.getElementById('imagePreviewed').src = URL.createObjectURL(file)
    }
}
const EditPopup = ({homeImg}) => {

    const [eventName, setEventname] = useState('')
    const [ordering, setOrdering] = useState('')
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    

    const { user } = useAuthContext()
    const { dispatch } = useHomeImgsContext()

    const premiumApi = config.premiumApi

    const handleUpdate = async (e) => {

        e.preventDefault()
        setIsLoading(true)
        if (!user || user.user.role !== 'President') {
            setIsLoading(false)
            setError('Your are not authorized')
        }
        const uploadedImg = document.getElementById('editImg').files[0]

        var data = new FormData()
        eventName && data.append('eventName', eventName)
        ordering && data.append('ordering', ordering)
        uploadedImg && data.append('update-single-home-main-event-image', uploadedImg)
        console.log(data)
        const response = await fetch(`${premiumApi}/home-api/update-home-main-events-image/json/${homeImg._id}` , {
            method: 'PUT',
            body: data,
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        console.log(response.body)
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error);
            e.preventDefault()
        }
        if (response.ok) {
            setIsLoading(false)
            setError(null)
            // dispatch({type: 'UPDATE_HOME_IMGS', payload:json})
            setUpdated('Updated Successfully!')
            window.location.reload()
        }
    }

    const showDeletePopup = () => {
        const deletePopup = document.getElementById('deletePopup')
        console.log(deletePopup.style.display)
        deletePopup.style.display = 'block'
        console.log('popup changed')
    }
    const closeHandle = (e) => {
        const editPopup = document.getElementById('editPopup')
        editPopup.style.display = 'none'
    }
    const closeDeletePopupHandle = (e) => {
        const deletePopup = document.getElementById('deletePopup')
        deletePopup.style.display = 'none'
    }
    window.onclick = (event) => {
        const editPopup = document.getElementById('editPopup')
        const backdrop = document.getElementById('backdrop')
        if (editPopup.style.display === 'block') {
            if (event.target == backdrop) {
                console.log('changed again')
                editPopup.style.display = 'none'
            }
        }
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (!user || user.user.role !== 'President') {
            setIsLoading(false)
            setError('Your are not authorized')
        }
        const response = await fetch(`${premiumApi}/home-api/delete-single-home-main-events-image/json/${homeImg._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error);
            e.preventDefault()
        }
        if (response.ok) {
            setIsLoading(false)
            setError(null)
            setDeleted('Image Deleted')
            dispatch({type: 'DELETE_HOME_IMG', payload:json})
            setTimeout(()=> {
                window.location.reload()
            }, 2000)
        }
    }

    return (
    <>
        <Container id='backdrop'>
            <Wrapper id='formSpace'>
                <EditContainer>
                    <DeletePopup onClick={showDeletePopup}>
                        <Delete/>
                        {deleted && (<div style={{color:'red',fontSize:'10px'}}><b>{deleted}</b></div>)}
                    </DeletePopup>
                    <CloseButton onClick={closeHandle}>
                        <Close style={{width:'50px',height:'50px'}} />
                    </CloseButton>
                    <EditTitle>Edit Image</EditTitle>
                    <EditForm  onSubmit={handleUpdate} >
                        <EditImage>
                            <EditImgLabel htmlFor='editImg'><Upload className='uploadIcon' style={{width:'70px',height:'70px',color:'white'}}/></EditImgLabel>
                            <ImgPreview id='imagePreviewed' src={homeImg.imageUrl} alt="" className='img-fluid'/>
                            <EditImgInput onChange={changeImgPreviewHandler} style={{display:'none'}} id='editImg' type='file' accept='image/*' name='update-single-home-main-event-image' />
                        </EditImage>
                        <EditData>
                            <EditDataLabel htmlFor='eventEdit'><h3>Event Name</h3></EditDataLabel>
                            <EditDataInput onChange={(e) => {setEventname(e.target.value)}} type='text' id='eventEdit' placeholder={`${homeImg.eventName}`} value={eventName} />

                            <EditDataLabel htmlFor='orderingEdit'><h3>View Ordering</h3></EditDataLabel>
                            <EditDataInput onChange={(e) => {setOrdering(e.target.value)}} type='number' id='orderingEdit' pattern='1-10' placeholder={`${homeImg.ordering}`} value={ordering}/>
                            <EditButton disabled={isLoading} type='submit'>Edit Image</EditButton>
                            {updated && (<div>{updated}</div>)}
                            {error && (<div>{error}</div>)}
                        </EditData>
                    </EditForm>
                </EditContainer>
                <div id="deletePopup">
                    <div id='deleteDiv'>
                        <h5 style={{width:'60%',margin:'5px auto 20px auto',textAlign:'center'}}>Are you sure you want to delete {homeImg.eventName} image?</h5>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
                            <img src={homeImg.imageUrl} alt="" style={{flex:1,width:'100%', objectFit:'cover',borderRadius:'5px',marginRight:'1%'}} className='img-fluid'/>
                            <div style={{display:'flex',flexDirection:'column' ,flex:3}}>
                                <p style={{margin:0}}><b>{homeImg.filename}</b></p>
                                <p>{homeImg.updatedAt}</p>
                            </div>
                        </div>
                        <div style={{display:'flex',justifyContent:'space-evenly',margin:'4% auto',width:'70%'}}>
                            <DeleteButton onClick={handleDelete}>
                                Delete
                            </DeleteButton>
                            <CancelButton onClick={closeDeletePopupHandle}>
                                Cancel
                            </CancelButton>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </Container>
    </>
  )
}

export default EditPopup
