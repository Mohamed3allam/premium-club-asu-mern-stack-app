import React, { useEffect, useState } from 'react'
import { DownloadingOutlined } from "@mui/icons-material"
import styled from "styled-components"
import './imageEditor.css'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useCommitteesContext } from '../../../../hooks/useCommitteesContext'


const ImageEditPanel = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 20px;
  padding: 30px;
  border-radius: 10px;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); 
`
const ImageEditTitle = styled.h1`
    font-size: 25px;
    font-weight: bold;
`
const ImageLeftPanel = styled.div`
    flex: 3;
    padding: 3%;
    width: min-content;
`
const ImagePreview = styled.div`
    border: solid gray 3px;
    border-radius: 5px;
    width: 480px;
    height: 270px;
    position: relative;
    overflow: hidden;
    transition: none;
`
const ImageRightPanel = styled.div`
    flex: 4;
    padding: 3%;
`
const ImageEditImg = styled.div``
const ChangeImageTitle = styled.h4``
const ChangeImageForm = styled.form`
    padding: 1%;
    display: flex;
    flex-direction: column;
`
const ImagePreviewContainer = styled.div`
    position: relative;
    width: 50%;

    &:hover {
        filter: opacity(0.70);
    }
`
const ChangeImageInputLabel = styled.label`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    cursor: pointer;
    opacity: 0;

    &:hover {
        background-color: rgba(0,0,0,0.5);
        opacity: 1;
    }
`
const ChangeImageInput = styled.input`
    display: none;
`
const PreviewedImage = styled.img`
    border-radius: 10px;
    cursor: pointer;
`
const ChangeImageButton = styled.button`
    width: fit-content;
    padding: 1.5% 2.5%;
    margin: 3%;
    background-color: rgba(87, 0, 133, 1);
    color: white;
    font-weight: bold;
    border-radius: 4px;
    border: solid 2px rgba(87, 0, 133, 1);

    &:hover {
        color: rgba(87, 0, 133, 1);
        background-color: white;
    }

    &:disabled {
        opacity: 0.3;
        &:hover {
            color: white;
            background-color: rgba(87, 0, 133, 1);
        }
    }
`


const EditImage = ({ committee }) => {
    const { user } = useAuthContext()
    const { dispatch } = useCommitteesContext()

    const [ image, setImage ] = useState('')
    const [ updated, setUpdated ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user || user.user.role !== 'President') {
            setIsLoading(false)
            setError('Your are not authorized')
            return 0
        }
        setIsLoading(true)
        const data = new FormData()
        image && data.append('edit-committee-img', image)
        if (!image) {
            setError('You must choose an image')
            return 0
        }
        const response = await fetch(`/committee-api/edit-committee-img/${committee._id}`, {
            method: 'PUT',
            body: data,
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            e.preventDefault()
        }
        if (response.ok) {
            setIsLoading(false)
            setError('')
            dispatch({type: 'UPDATE_COMMITTEES', payload:json})
            setUpdated('Updated Successfully!')
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    }

    const imageHandle = () => {
        const [file] = document.getElementById(`${committee.committee_name}-image`).files
        if (file) {
            document.getElementById(`${committee.committee_name}-preview-image`).src = URL.createObjectURL(file)
            setImage(file)
        }
    }
  return (
    <>
        <ImageEditPanel>
            <ImageEditTitle>
                {committee.committee_name} Image Edit
            </ImageEditTitle>
            <div style={{display:'flex', flexDirection:'row'}}>
                <ImageLeftPanel>
                    <ImagePreview>
                        <ChangeImageInputLabel htmlFor={`${committee.committee_name}-image`}>
                            <DownloadingOutlined style={{transform:'rotate(180deg)',color:'white',width:'50px',height:'50px'}}/> 
                        </ChangeImageInputLabel>
                        <img src={committee.committee_image_url} className='img-fluid' />
                    </ImagePreview>
                </ImageLeftPanel>
                <ImageRightPanel>
                    <ImageEditImg>
                        <ChangeImageTitle>
                            Change {committee.committee_name} Image
                        </ChangeImageTitle>
                        <ChangeImageForm onSubmit={handleSubmit} id='img-form' >
                            <ImagePreviewContainer>
                                <PreviewedImage src='' width='100%' id={`${committee.committee_name}-preview-image`} />
                            </ImagePreviewContainer>
                            <ChangeImageInput onChange={imageHandle} accept='image/*' type="file" id={`${committee.committee_name}-image`}/>
                            <ChangeImageButton type='submit' disabled={isLoading}>Upload Image</ChangeImageButton>
                            { updated && (
                                <b style={{color:'green'}}>{updated}</b>
                            )}
                            { error && (
                                <b style={{color:'red'}}>{error}</b>
                            )}
                        </ChangeImageForm>
                    </ImageEditImg>
                </ImageRightPanel>
            </div>
        </ImageEditPanel>
    </>
  )
}

export default EditImage
