import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import './allsections.css'
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useHomeContext } from '../../../../hooks/useHomeContext';

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Delete, Edit } from '@mui/icons-material';
import config from '../../../../../config';
import { mobile } from '../../../../responsive';

const Container = styled.div`
    flex: 3;
`
const Wrapper = styled.div`
    position: relative;
    background-color: white;
    border-radius: 10px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); 
    height: fit-content;
    padding: 30px;
    margin: 20px;

    ${mobile({
        padding:'20px'
    })}
`
const SectionData = styled.div`
    position: relative;
`
const SectionTitle = styled.h2`
    ${mobile({
        fontSize:'15px !important'
    })}
`
const SectionInfo = styled.p`
    ${mobile({
        fontSize:'12px !important'
    })}
`

const EditDeleteBtns = styled.div`
    position: absolute;
    top: 5%;
    right: 5%;
    display: flex;
    gap: 10px;

    ${mobile({
        top:'2%',
        right:'2%'
    })}
`
const EditDiv = styled.div``
const DeleteDiv = styled.div`
    background: darkred;
    width: fit-content;
    padding: 5px;
    border-radius: 5px;
    color: white;
`

const ErrorDiv = styled.div`
    color: red;
    font-weight: bold;
`
const UpdatedDiv = styled.div`
    color: green;
    font-weight: bold;
`

const SectionEditForm = styled.div`
    position: relative;
    padding: 20px;
    transition: all ease 0.5s;
    display: none;
`
const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 7px;
`
const EditFormTitle = styled.h4`
    ${mobile({
        fontSize:'15px'
    })}
`
const EditFormLabel = styled.label`
    font-weight:bold;
    position: relative;
    ${mobile({
        fontSize:'12px'
    })}
`
const EditFormInput = styled.input`
    border:none;
    padding: 5px;
    border-bottom: 1px solid gray;  
    position: relative;
    ${mobile({
        padding: '3px',
        fontSize:'10px'
    })}
`
const EditFormTextarea = styled.textarea`
    border:none;
    padding: 5px;
    border-bottom: 1px solid gray;  
    ${mobile({
        padding: '3px',
        fontSize:'10px'
    })}
`
const EditFormButton = styled.button`
    background-color: gray;
    border: none;
    width: fit-content;
    padding: 10px;
    font-size: 15px;
    font-weight: bold;
    color: white;
    border-radius: 5px;
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


const AllSections = ({ section }) => {
    const { dispatch } = useHomeContext()
    const { user } = useAuthContext()

    const premiumApi = config.premiumApi
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [order, setOrder] = useState('')
    const [fontColor, setFontColor] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState(null)

    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])

    console.log(user.token)
    const handleDelete = async (e) => {
        e.preventDefault()

        if (!user || user.user.role !== 'President') {
            setError('You are not authorized')
        }

        const response = await fetch(`${premiumApi}/home-api/section/${section._id}`, {
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = response.json()
        if (response.ok) {
            dispatch({type: 'DELETE_SECTION', payload:json})
        }
    }

    const showEditForm = (e) => {
        if (e.target.parentNode.parentNode.parentNode.children[1].style.display === "none") {
            e.target.parentNode.parentNode.parentNode.children[1].style.display = "unset"
        } else {
            e.target.parentNode.parentNode.parentNode.children[1].style.display = "none"
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (!user || user.user.role !== 'President') {
            setIsLoading(false)
            setError('Your are not authorized')
        }

        const response = await fetch(`${premiumApi}/home-api/section/${section._id}`, {
            method:'PUT',
            body: JSON.stringify({title, description,fontColor,backgroundColor,order}),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error);
            setEmptyFields(json.emptyFields)
            e.preventDefault()
        }
        if (response.ok) {
            setIsLoading(false)
            setError(null)
            setEmptyFields([])
            setUpdated('Updated Successfully!')
            // setTitle('')
            // setDescription('')

            dispatch({type: 'UPDATE_SECTION', payload:json})
            // window.location.reload()
        }
    }


    
    const handleTextColor = async (alpha) => {
        try {
            var textOpacity = document.getElementById('fontColorRange')
            textOpacity.style.backgroundImage = "linear-gradient(to right, rgba(0,0,0,0)," + alpha + ')';
            let rgb = hexToRgb(alpha)
            setFontColor("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+textOpacity.value+")")
        } catch (error) {
            console.log(error)
        }
    }
    const handleTextOpacity = (beta) => {
        try {
            var textColor = document.getElementById('fontColor')
            textColor.style.opacity = beta;
            let rgb = hexToRgb(textColor.value)
            setFontColor("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+beta+")")
        } catch (error) {
            console.log(error)
        }
    }
    const handleBgColor = async (alpha) => {
        try {
            var backgroundOpacity = document.getElementById('backgroundColorRange')
            backgroundOpacity.style.backgroundImage = "linear-gradient(to right, rgba(0,0,0,0)," + alpha + ')';
            let rgb = hexToRgb(alpha)
            setBackgroundColor("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+backgroundOpacity.value+")")
        } catch (error) {
            console.log(error)
        }
    }
    const handleBgOpacity = (beta) => {
        try {
            var backgroundColor = document.getElementById('backgroundColor')
            backgroundColor.style.opacity = beta;
            let rgb = hexToRgb(backgroundColor.value)
            setBackgroundColor("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+beta+")")
        } catch (error) {
            console.log(error)
        }
    }
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null
    }
    const showDeletePopup = () => {
        const deleteSectionPopup = document.getElementById('deleteSectionPopup')
        console.log(deleteSectionPopup.style.display)
        deleteSectionPopup.style.display = 'block'
        console.log('popup changed')
    }
    const closeDeletePopupHandle = (e) => {
        const deleteSectionPopup = document.getElementById('deleteSectionPopup')
        deleteSectionPopup.style.display = 'none'
    }

  return (
    <Container>
        <Wrapper>
            <SectionData>
                <SectionTitle>
                    {section.title}
                </SectionTitle>
                <SectionInfo><strong>Title: </strong>{ section.title }</SectionInfo>
                <SectionInfo><strong>Ordering: </strong>{ section.order }</SectionInfo>

                
                {/* <SectionInfo>Edited {formatDistanceToNow(Date(section.updatedAt), { addSuffix: true })}</SectionInfo> */}
                {
                    user.user.role === 'President' && (
                        <EditDeleteBtns>
                            <EditDiv className='edit-btn' onClick={showEditForm}>
                                <Edit className='edit-delete-btns' style={{pointerEvents:'none'}}/>
                            </EditDiv>
                        </EditDeleteBtns>
                    )
                }
            </SectionData>

            <SectionEditForm>
                <EditForm onSubmit={handleUpdate}>
                    <EditFormTitle>Edit section</EditFormTitle>
                    <EditFormLabel htmlFor={`${section.title} title`}>Title: </EditFormLabel>
                    <EditFormInput 
                        required
                        id={`${section.title} title`}
                        type="text" 
                        onChange={(e)=>{setTitle(e.target.value)}}
                        value={title}
                        className={emptyFields.includes('title') ? 'error' : ''}
                        placeholder={section.title}
                    />
                    <EditFormLabel htmlFor={`${section.title} description`}>Description: </EditFormLabel>
                    <EditFormTextarea 
                        required
                        rows='5'
                        id={`${section.title} description`}
                        type="text" 
                        onChange={(e)=>{setDescription(e.target.value)}}
                        value={description}
                        className={emptyFields.includes('description') ? 'error' : ''}
                        placeholder={section.description}
                    />
                    <EditFormLabel htmlFor={`${section.title} order`}>Ordering: </EditFormLabel>
                    <EditFormInput
                        required
                        id={`${section.title} order`}
                        type="number" 
                        onChange={(e)=>{setOrder(e.target.value)}}
                        value={order}
                        min='1'
                        max='4'
                        className={emptyFields.includes('order') ? 'error' : ''}
                        placeholder='Ordering Section Number'
                    />
                    <EditFormLabel htmlFor='fontColor'>Text Color:</EditFormLabel>
                    <EditFormInput 
                        style={{
                            border: 'none',
                            padding: 0
                        }}
                        required
                        id='fontColor'
                        type="color" 
                        onChange={e => handleTextColor(e.target.value)}
                        onInput={e => handleTextColor(e.target.value)}
                        defaultValue={fontColor}
                    />
                    <input onChange={e => handleTextOpacity(e.target.value)} type="range" id='fontColorRange' min='0' max='1' step='0.05' className='sliderEdit'/>
                    <EditFormLabel>Background Color:</EditFormLabel>
                    <EditFormInput 
                        style={{
                            border: 'none',
                            padding: 0
                        }}
                        required
                        id='backgroundColor'
                        type="color" 
                        onChange={e => handleBgColor(e.target.value)}
                        onInput={e => handleBgColor(e.target.value)}
                        defaultValue={backgroundColor}
                    />
                    <input onChange={e => handleBgOpacity(e.target.value)} type="range" id='backgroundColorRange' min='0' max='1' step='0.05' className='sliderEdit'/>
                    <EditFormButton disabled={isLoading}>Edit section</EditFormButton>
                    {error && <ErrorDiv className="error">{error}</ErrorDiv>}
                    {updated && <UpdatedDiv>{updated}</UpdatedDiv>}


                    <DeleteDiv className='delete-btn' onClick={showDeletePopup}>
                        <Delete className='edit-delete-btns' style={{pointerEvents:'none'}}/>
                        Delete Section
                    </DeleteDiv>
                    
                </EditForm> 
            </SectionEditForm>
            <div id="deleteSectionPopup">
                <div id='deleteSectionDiv'>
                    <h5 style={{width:'60%',margin:'5px auto 20px auto',textAlign:'center'}}>Are you sure you want to delete this section ?</h5>
                    
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
  )
}

export default AllSections;
