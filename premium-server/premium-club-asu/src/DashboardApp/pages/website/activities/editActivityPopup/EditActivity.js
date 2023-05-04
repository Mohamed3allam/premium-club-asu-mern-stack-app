import { Close, Delete, HighlightOff, Upload } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './editActivityPopup.css';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useActivityContext } from '../../../../hooks/useActivityContext';
import { useActivityImgContext } from '../../../../hooks/useActivityImgContext';
import config from '../../../../../config';
import ActivityCarousel from '../allActivities/activitySlider/ActivityCarousel';

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

const EditImgLabel = styled.label`
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: rgba(0,0,0,0.5);
    border-radius: 5px;

`
const EditImgInput = styled.input``
const EditDataLabel = styled.label`
    font-size: 17px;
    color: gray;
`
const EditDataInput = styled.input`
    border: none;
    border-bottom: solid gray 1px;
    width: 70%;
    height: 30px;
    margin-bottom: 30px;
    margin-top: 0;
`
const EditDataTextarea = styled.textarea`
    border: none;
    border-bottom: solid gray 1px;
    width: 70%;
    height: 30px;
    margin-bottom: 30px;
    margin-top: 0;
`
const EditDataSelect = styled.select`
    border: none;
    border-bottom: solid gray 1px;
    width: 70%;
    height: 30px;
    margin-bottom: 50px;
    background: none;
`
const EditDataOption = styled.option``
const EditButton = styled.button`
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
const CarouselImage = styled.img`
    border-radius: 10px;
    width: 100%;
`

const EditActivity = ({ activity, activityImgs }) => {

    function importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return images
    }
    const staticImages = importAll(require.context('../../../../imgs', false, /\.(png|jpe?g|svg|gif|mp4)$/));

    const { user } = useAuthContext()
    const { dispatch } = useActivityContext()
    const { dispatchActivityImage } = useActivityImgContext()

    const premiumApi = config.premiumApi

    const [ activityTitle, setActivityTitle ] = useState('')
    const [ activityDescription, setActivityDescription ] = useState('')
    const [ flexDirection, setFlexDirection ] = useState('')
    const [ activityOrdering, setActivityOrdering ] = useState('')
    const [ images, setImages ] = useState('')
    const [ edited, setEdited ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState('')
    

    const editActivity = async (e) => {
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
        const response = await fetch(`${premiumApi}/activity-api/create-activity`, {
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
            const responseImgs = await fetch(`${premiumApi}/activity-api/create-activity-imgs`, {
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
                setEdited('Activity Created Successfully')
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
        const editActivityPopup = document.getElementById('editActivityPopup')
        editActivityPopup.style.display = 'none'
    }
    window.onclick = (event) => {
        const editActivityPopup = document.getElementById('editActivityPopup')
        const backdrop = document.getElementById('backdropEditActivity')
        if (editActivityPopup.style.display === 'block') {
            if (event.target == backdrop) {
                console.log('changed again')
                editActivityPopup.style.display = 'none'
            }
        }
    }

    return (
    <>
        <Container id='backdropEditActivity'>
            <Wrapper>
                <EditContainer>
                    <CloseButton onClick={closeHandle}>
                        <Close style={{width:'50px',height:'50px'}} />
                    </CloseButton>
                    <EditTitle>Edit Activity</EditTitle>
                    <EditForm  onSubmit={editActivity}>
                        <div style={{flex:2}}>
                            <ActivityCarousel>
                                {
                                    activityImgs.map((activityImg)=>(
                                        <div key={activityImg._id}>
                                            <div>
                                                <CarouselImage  src={activityImg.imageUrl} className='img-fluid' />    
                                            </div>
                                        </div>
                                    ))
                                }
                            </ActivityCarousel>
                        </div>
                        
                        <EditData>
                            <EditDataLabel htmlFor='activityTitleEdit'>Activity title</EditDataLabel>
                            <EditDataInput value={activityTitle} onChange={(e) => setActivityTitle(e.target.value)} type='text' id='activityTitleEdit'/>

                            <EditDataLabel htmlFor='activityDescriptionEdit'>Activity description</EditDataLabel>
                            <EditDataTextarea value={activityDescription} onChange={(e) => setActivityDescription(e.target.value)} type='text' id='activityDescriptionEdit'/>

                            <EditDataLabel htmlFor='flexDirectionEdit'>View Direction</EditDataLabel>
                            <EditDataSelect value={flexDirection} onChange={(e)=> setFlexDirection(e.target.value)} type='text' id='flexDirectionEdit'>
                                <EditDataOption value='row-reverse'> Right to Left </EditDataOption>
                                <EditDataOption value='row'> Left to Right </EditDataOption>
                            </EditDataSelect>

                            <EditDataLabel htmlFor='activityOrderingEdit'>Activity ordering</EditDataLabel>
                            <EditDataInput value={activityOrdering} onChange={(e) => setActivityOrdering(e.target.value)} type='number' id='activityOrderingEdit' pattern='1-15'/>

                            {/* <EditDataLabel htmlFor='activityOrdering'>View Ordering</EditDataLabel>
                            <EditDataInput value={activityOrdering} onChange={(e)=> setActivityOrdering(e.target.value)} type='number' id='activityOrdering' pattern='1-20'/> */}

                            <EditButton  type='submit' disabled={isLoading}>Edit Activity</EditButton>

                            {edited && (<b style={{color:'green'}}>{edited}</b>)}
                            {error && (<b style={{color:'red'}}>{error}</b>)}
                        </EditData>
                    </EditForm>
                </EditContainer>
            </Wrapper>
        </Container>
    </>
  )
}

export default EditActivity
