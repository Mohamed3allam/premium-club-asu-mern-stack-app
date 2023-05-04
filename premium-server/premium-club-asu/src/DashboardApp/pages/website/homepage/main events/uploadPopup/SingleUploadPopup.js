import { Close, Delete, Upload } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAuthContext } from '../../../../../hooks/useAuthContext'
import { useHomeImgsContext } from '../../../../../hooks/useHomeImgsContext'
import './uploadPopup.css'
import config from '../../../../../../config'

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
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
    padding: 10px 20px;
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

const DeleteButton = styled.button`
    position: absolute;
    top: 3%;
    left: 3%;
    width: 50px;
    height: 50px;
    background-color: red;
    border-radius: 50%;
    color: white;

    &:hover {
        background-color: darkred;
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




const changeImgPreviewHandler = async () => {
    const [file] = await document.getElementById('imageUploaded').files
    console.log(file)
    if (file) {
        document.getElementById('imagePreviewed').src = URL.createObjectURL(file)
    }
}
const SingleUploadPopup = () => {

    function importAll(r) {
        let images = {};
         r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return images
    }
    const images = importAll(require.context('../../../../../imgs', false, /\.(png|jpe?g|svg|gif|mp4)$/));
    
    const [eventName, setEventname] = useState('')
    const [added, setAdded] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    
    const { user } = useAuthContext()
    const { dispatch } = useHomeImgsContext()

    const premiumApi = config.premiumApi

    const handleUpload = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!user || user.user.role !== 'President') {
            setIsLoading(false)
            setError('Your are not authorized')
        }
        const uploadedImage = document.getElementById('imageUploaded').files[0]
        if (!uploadedImage) {
            setIsLoading(false)
            setError('You Must Upload an Image')
        }
        var data = new FormData()
        data.append('eventName', eventName)
        data.append('add-single-home-main-event-image', uploadedImage)
        const response = await fetch(`${premiumApi}/home-api/add-single-home-main-event-image`, {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        console.log(response.ok)

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error);
            e.preventDefault()
        }

        if (response.ok) {
            setIsLoading(false)
            setError(null)
            dispatch({type: 'CREATE_HOME_IMGS', payload:json})
            setAdded('Image Added Successfully!')
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    }

    const closeHandle = (e) => {
        const singleUpload = document.getElementById('single-upload-popup')
        singleUpload.style.display = 'none'
    }
    window.onclick = (event) => {
        const singleUpload = document.getElementById('single-upload-popup')
        const backdrop = document.getElementById('backdrop-single')
        if (event.target == backdrop) {
            console.log('changed again')
            singleUpload.style.display = 'none'
        }
    }

    return (
    <>
        <Container id='backdrop-single'>
            <Wrapper>
                <EditContainer>
                    <CloseButton onClick={closeHandle}>
                        <Close style={{width:'50px',height:'50px'}} />
                    </CloseButton>
                    <EditTitle>Upload Image</EditTitle>
                    <EditForm onSubmit={handleUpload}>
                        <EditImage>
                            <EditImgLabel htmlFor='imageUploaded'><Upload className='uploadIcon' style={{width:'70px',height:'70px',color:'white'}}/></EditImgLabel>
                            <ImgPreview id='imagePreviewed' src={images['crowd.png']} alt="" className='img-fluid'/>
                            <EditImgInput multiple={false} onChange={changeImgPreviewHandler} style={{display:'none'}} id='imageUploaded' type='file' accept='image/*' name='add-single-home-main-event-image' />
                        </EditImage>
                        <EditData>
                            <EditDataLabel htmlFor='eventEdit'><h3>Event Name</h3></EditDataLabel>
                            <EditDataInput onChange={(e) => {setEventname(e.target.value)}} type='text' id='eventEdit' placeholder='Event Title' value={eventName} />

                            <EditButton disabled={isLoading} type='submit'>Upload</EditButton>
                            {added && (<p style={{color:'green'}}>{added}</p>)}
                            {error && (<div>{error}</div>)}
                        </EditData>
                    </EditForm>
                </EditContainer>
            </Wrapper>
        </Container>
    </>
  )
}

export default SingleUploadPopup
