import { Close, Delete, HighlightOff, Upload } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './createPopup.css';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useActivityContext } from '../../../../hooks/useActivityContext';
import { useActivityImgContext } from '../../../../hooks/useActivityImgContext';

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
    min-width: fit-content;
    width: 60%;
    max-width: 70%;
    height: fit-content;
    min-height: fit-content;
    padding: 20px;
    
`
const CreateContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
`
const CreateTitle = styled.h1`
    text-align: center;
`
const CreateForm = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const CreateData = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    padding: 40px;
`
const CreateImage = styled.div`
    flex: 2;
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
const EachImagePreviewed = styled.img`
    border-radius: 3px;
    width: 150px;
`

const CreateImgLabel = styled.label`
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: rgba(0,0,0,0.5);
    border-radius: 5px;

`
const CreateImgInput = styled.input``
const CreateDataLabel = styled.label`
    font-size: 17px;
    color: gray;
`
const CreateDataInput = styled.input`
    border: none;
    border-bottom: solid gray 1px;
    width: 70%;
    height: 30px;
    margin-bottom: 30px;
    margin-top: 0;
`
const CreateDataTextarea = styled.textarea`
    border: none;
    border-bottom: solid gray 1px;
    width: 70%;
    height: 30px;
    margin-bottom: 30px;
    margin-top: 0;
`
const CreateDataSelect = styled.select`
    border: none;
    border-bottom: solid gray 1px;
    width: 70%;
    height: 30px;
    margin-bottom: 50px;
    background: none;
`
const CreateDataOption = styled.option``
const CreateButton = styled.button`
    width: fit-content;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: rgba(0,0,0,0.6);
    color: white;
    font-size: 20px;

    &:hover {
        background-color: rgba(0,0,0,0.8);
    }
    &:disabled {
        opacity: 0.3;
        &:hover {
            background-color: rgba(0,0,0,0.6);
        }
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
    const [file] = await document.getElementById('CreateImg').files
    console.log(file)
    if (file) {
        document.getElementById('imagePreviewed').src = URL.createObjectURL(file)
    }
}


const CreateActivity = ({}) => {

    function importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return images
    }
    const staticImages = importAll(require.context('../../../../imgs', false, /\.(png|jpe?g|svg|gif|mp4)$/));

    const { user } = useAuthContext()
    const { dispatch } = useActivityContext()
    const { dispatchActivityImage } = useActivityImgContext()

    const [ activityTitle, setActivityTitle ] = useState('')
    const [ activityDescription, setActivityDescription ] = useState('')
    const [ flexDirection, setFlexDirection ] = useState('')
    const [ activityOrdering, setActivityOrdering ] = useState('')
    const [ images, setImages ] = useState('')
    const [ created, setCreated ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState('')
    

    const createActivity = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (!user || user.user.role !== 'President') {
            setError('You are not authorized to do this action')
            setIsLoading(false)
            return 0
        }
        if (!activityTitle || !activityDescription || !flexDirection ) {
            setError('All fields must be filled')
            setIsLoading(false)
            return 0
        }
        if (!images || images.length === 0) {
            setError('You must upload at least an image')
            setIsLoading(false)
            return 0
        }
        const data = new FormData()
        activityTitle && data.append('activityTitle', activityTitle)
        activityDescription && data.append('activityDescription', activityDescription)
        flexDirection && data.append('flexDirection', flexDirection)
        // activityOrdering && data.append('activity_ordering', activityOrdering)
        

        console.log(JSON.stringify(data))
        console.log(data)
        const sentData = {
            activityTitle: activityTitle,
            activityDescription: activityDescription,
            flexDirection: flexDirection,
        }
        console.log(JSON.stringify(sentData))
        const response = await fetch('/activity-api/create-activity', {
            method:'POST',
            body: JSON.stringify(sentData),
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            return 0
        }
        if (response.ok) {
            setError('')
            Object.values(images).map((image)=>{
                data.append('create-activity', image)
            })
            const responseImgs = await fetch('/activity-api/create-activity-imgs', {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await responseImgs.json()
            if (!responseImgs.ok) {
                setIsLoading(false)
                setError(`You might need to contact the developer, you got an error: ${json.error}`)
                return 0
            }
            if (responseImgs.ok) {
                setError('')
                setIsLoading(false)
                setCreated('Activity Created Successfully')
                dispatch({type:'CREATE_ACTIVITY', payload: json})
                setTimeout(()=>{
                    window.location.reload()
                }, 2000)
            }
        }
    }


    const changeImgPreviewHandler = (e) => {
        const fileList = e.target.files
        setImages(fileList)
    }
    const reset = () => {
        setImages('')
        var fileList = document.getElementById('uploadedImages')
        fileList.value = null
    }
    const closeHandle = (e) => {
        const createPopup = document.getElementById('createPopup')
        createPopup.style.display = 'none'
    }
    window.onclick = (event) => {
        const createPopup = document.getElementById('createPopup')
        const backdrop = document.getElementById('backdropCreateActivity')
        if (createPopup.style.display === 'block') {
            if (event.target == backdrop) {
                console.log('changed again')
                createPopup.style.display = 'none'
            }
        }
    }

    return (
    <>
        <Container id='backdropCreateActivity'>
            <Wrapper>
                <CreateContainer>
                    <CloseButton onClick={closeHandle}>
                        <Close style={{width:'50px',height:'50px'}} />
                    </CloseButton>
                    <CreateTitle>Create Activity</CreateTitle>
                    <CreateForm  onSubmit={createActivity}>
                        {!images && (
                            <CreateImage>
                                <CreateImgLabel htmlFor='CreateImg'><Upload className='uploadIcon' style={{width:'70px',height:'70px',color:'white'}}/></CreateImgLabel>
                                <ImgPreview src={staticImages['crowd.png']} id='imagePreviewed' alt="" className='img-fluid'/>
                                <CreateImgInput onChange={changeImgPreviewHandler} multiple='multiple' style={{display:'none'}} id='CreateImg' type='file' accept='image/*' />
                            </CreateImage>
                        )}
                        {images && (
                            <div style={{maxWidth:'50%', margin:'1%',display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'center', gap:'10px'}}>
                                <div>
                                    {
                                        Object.values(images).map((img) => (
                                            <EachImagePreviewed key={URL.createObjectURL(img)} src={URL.createObjectURL(img)} className='img-fluid' />
                                        ))
                                    }
                                </div>
                                <CreateButton disabled={isLoading} type='reset' onClick={reset}>Reset</CreateButton>
                            </div>
                        )}
                        
                        <CreateData>
                            <CreateDataLabel htmlFor='activityTitle'>Title</CreateDataLabel>
                            <CreateDataInput value={activityTitle} onChange={(e) => setActivityTitle(e.target.value)} type='text' id='activityTitle'/>

                            <CreateDataLabel htmlFor='activityDescription'>Description</CreateDataLabel>
                            <CreateDataTextarea value={activityDescription} onChange={(e) => setActivityDescription(e.target.value)} type='text' id='activityDescription'/>

                            <CreateDataLabel htmlFor='flexDirection'>View Direction</CreateDataLabel>
                            <CreateDataSelect value={flexDirection} onChange={(e)=> setFlexDirection(e.target.value)} type='text' id='flexDirection'>
                                <CreateDataOption value='row-reverse'> Right to Left </CreateDataOption>
                                <CreateDataOption value='row'> Left to Right </CreateDataOption>
                            </CreateDataSelect>

                            {/* <CreateDataLabel htmlFor='activityOrdering'>View Ordering</CreateDataLabel>
                            <CreateDataInput value={activityOrdering} onChange={(e)=> setActivityOrdering(e.target.value)} type='number' id='activityOrdering' pattern='1-20'/> */}

                            <CreateButton  type='submit' disabled={isLoading}>Create Activity</CreateButton>

                            {created && (<b style={{color:'green'}}>{created}</b>)}
                            {error && (<b style={{color:'red'}}>{error}</b>)}
                        </CreateData>
                    </CreateForm>
                </CreateContainer>
            </Wrapper>
        </Container>
    </>
  )
}

export default CreateActivity
