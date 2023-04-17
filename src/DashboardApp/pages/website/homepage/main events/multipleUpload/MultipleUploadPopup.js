import { Close, Delete, Upload } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { useAuthContext } from '../../../../../hooks/useAuthContext'
import { useHomeImgsContext } from '../../../../../hooks/useHomeImgsContext'
import './uploadPopup.css'

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
const EditTitle = styled.h1`
    text-align: center;
`
const EditForm = styled.form`
    display: flex;
    align-items: center;
`
const EditData = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content:space-evenly ;
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
    background-color: rgba(0,0,0,0.6);
    color: white;
    font-size: 20px;

    &:hover {
        background-color: rgba(0,0,0,0.9);
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
const EachImagePreviewed = styled.img`
    flex: 1;
    border-radius: 10px;
    width: 100px;
`






const MultipleUploadPopup = () => {
    
    function importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return images
    }
    const images = importAll(require.context('../../../../../imgs', false, /\.(png|jpe?g|svg|gif|mp4)$/));
    
    const [eventName, setEventname] = useState('')
    const [added, setAdded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [uploadedOrientation, setUploadedOrientation] = useState('row')
    const [uploadedImages, setUploadedImages] = useState()
    
    const { user } = useAuthContext()
    const { dispatch } = useHomeImgsContext()
    
    const changeImgPreviewHandler = (e) => {
        const fileList = e.target.files
        setUploadedImages(fileList)
        setUploadedOrientation('column')
    }
    const reset = () => {
        setUploadedImages(null)
        setUploadedOrientation('row')
        var fileList = document.getElementById('uploadedImages')
        fileList.value = null
    }
    const closeHandle = (e) => {
        const multipleUpload = document.getElementById('multiple-upload-popup')
        multipleUpload.style.display = 'none'
    }
    window.onclick = (event) => {
        const multipleUpload = document.getElementById('multiple-upload-popup')
        const backdrop = document.getElementById('backdrop-multiple')
        if (event.target == backdrop) {
            console.log('changed again')
            multipleUpload.style.display = 'none'
        }
    }


    const handleUpload = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!user || user.user.role !== 'President') {
            setIsLoading(false)
            setError('Your are not authorized')
            return 0
        }
        if (!uploadedImages || uploadedImages.length === 0) {
            setIsLoading(false)
            setError('You Must Upload an Image')
            return 0
        }
        if (uploadedImages.length > 10) {
            setIsLoading(false)
            setError("You Can't add more than 10 images")
            return 0
        }
        var data = new FormData()
        Object.values(uploadedImages).map((image)=>{
            data.append('home-main-event-images', image)
        })
        const response = await fetch('/home-api/upload-home-main-event-images', {
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
            setAdded('Images Uploaded Successfully!')
            // setTimeout(() => {
            //     window.location.reload()
            // }, 2000)
        }
        setIsLoading(false)
    }


    return (
        <>
        <Container id='backdrop-multiple'>
            <Wrapper>
                <EditContainer>
                    <CloseButton onClick={closeHandle}>
                        <Close style={{width:'50px',height:'50px'}} />
                    </CloseButton>
                    <EditTitle>Upload Multiple Images</EditTitle>
                    <EditForm style={{flexDirection: uploadedOrientation}}>
                        {!uploadedImages && (
                            <EditImage>
                                <EditImgLabel htmlFor='uploadedImages'><Upload className='uploadIcon' style={{width:'70px',height:'70px',color:'white'}}/></EditImgLabel>
                                <ImgPreview id='imagePreviewed' src={images['crowd.png']} alt="" className='img-fluid'/>
                                <EditImgInput multiple='multiple'onChange={changeImgPreviewHandler} style={{display:'none'}} id='uploadedImages' type='file' accept='image/*' name='home-main-event-images' />
                            </EditImage>
                        )}
                        {uploadedImages && (
                            <div style={{maxWidth:'100%', margin:'1%',display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'center', gap:'10px'}}>
                                {
                                    Object.values(uploadedImages).map((img) => (
                                        <EachImagePreviewed src={URL.createObjectURL(img)} className='img-fluid' />
                                    ))
                                }
                            </div>
                        )}
                        <EditData>
                            <EditButton type='submit' onClick={handleUpload}>Upload</EditButton>
                            <EditButton disabled={isLoading} type='reset' onClick={reset}>Reset</EditButton>
                        </EditData>
                    </EditForm>
                    {added && (<div><b>{added}</b></div>)}
                    {error && (<div>{error}</div>)}
                    <p className='text-danger m-0' style={{fontSize:'15px'}}><b>Danger: </b> uploading will overwrite the exisiting images</p>
                    <p className='text-warning m-0' style={{fontSize:'15px'}}><b>Warning: </b> you will need to edit each image's Event Name and it's ordering after uploading</p>
                </EditContainer>
            </Wrapper>
        </Container>
    </>
  )
}

export default MultipleUploadPopup
