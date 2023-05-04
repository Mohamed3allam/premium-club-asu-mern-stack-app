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

const Container = styled.div``
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
        padding:'20px',
        margin:0
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

    &:disabled {
        background-color: rgba(66, 0, 0,0.5);
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


const AllSections = ({ committee_section }) => {
    const { user } = useAuthContext()

    const premiumApi = config.premiumApi


    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ order, setOrder ] = useState('')
    const [ fontColor, setFontColor ] = useState(null)
    const [ backgroundColor, setBackgroundColor ] = useState(null)

    const [ error, setError ] = useState(null)
    const [ updated, setUpdated ] = useState(false)
    const [ deleted, setDeleted ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ emptyFields, setEmptyFields ] = useState([])

    console.log(user.token)
    const handleDelete = async (e) => {
        setIsLoading(true)
        e.preventDefault()

        if (!user || user.user.role !== 'President') {
            setError('You are not authorized')
        }

        const response = await fetch(`http://localhost:5000/committee-api/committee-section/${committee_section._id}`, {
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = response.json()
        if (response.ok) {
            setIsLoading(false)
            setDeleted(json.message)
        }
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
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

        

        if (!title && !description && !fontColor && !backgroundColor && !order) {
            setIsLoading(false)
            setError("You haven't edited anything")
            return 0
        }
        const updatedData = {}

        const addData = (key, name) => {
            return updatedData[key] = name
        }
        title && addData('committee_section_title', title)
        description && addData('committee_section_description', description)
        fontColor && addData('committee_section_font_color', fontColor)
        backgroundColor && addData('committee_section_bg_color', backgroundColor)
        order && addData('committee_section_ordering', order)
        
        console.log(JSON.stringify(updatedData))
        const response = await fetch(`http://localhost:5000/committee-api/committee-section/${committee_section._id}`, {
            method:'PUT',
            body: JSON.stringify(updatedData),
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
            setTitle('')
            setDescription('')
            // window.location.reload()
        }
    }


    
    const handleTextColor = async (alpha) => {
        try {
            var textOpacity = document.getElementById('committeeSectionfontColorRange')
            textOpacity.style.backgroundImage = "linear-gradient(to right, rgba(0,0,0,0)," + alpha + ')';
            let rgb = hexToRgb(alpha)
            setFontColor("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+textOpacity.value+")")
        } catch (error) {
            console.log(error)
        }
    }
    const handleTextOpacity = (beta) => {
        try {
            var textColor = document.getElementById('committeeSectionfontColor')
            textColor.style.opacity = beta;
            let rgb = hexToRgb(textColor.value)
            setFontColor("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+beta+")")
        } catch (error) {
            console.log(error)
        }
    }
    const handleBgColor = async (alpha) => {
        try {
            var backgroundOpacity = document.getElementById('committeeSectionBackgroundColorRange')
            backgroundOpacity.style.backgroundImage = "linear-gradient(to right, rgba(0,0,0,0)," + alpha + ')';
            let rgb = hexToRgb(alpha)
            setBackgroundColor("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+backgroundOpacity.value+")")
        } catch (error) {
            console.log(error)
        }
    }
    const handleBgOpacity = (beta) => {
        try {
            var backgroundColor = document.getElementById('committeeSectionBackgroundColor')
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
        const deleteCommitteeSectionPopup = document.getElementById('deleteCommitteeSectionPopup')
        console.log(deleteCommitteeSectionPopup.style.display)
        deleteCommitteeSectionPopup.style.display = 'block'
        console.log('popup changed')
    }
    const closeDeletePopupHandle = (e) => {
        const deleteCommitteeSectionPopup = document.getElementById('deleteCommitteeSectionPopup')
        deleteCommitteeSectionPopup.style.display = 'none'
    }


  return (
    <Container>
        <Wrapper>
            <SectionData>
                <SectionTitle>
                    {committee_section.committee_section_title}
                </SectionTitle>
                <SectionInfo><strong>Title: </strong>{ committee_section.committee_section_title }</SectionInfo>
                <SectionInfo><strong>Ordering: </strong>{ committee_section.committee_section_ordering }</SectionInfo>
                {/* <SectionInfo>Edited {formatDistanceToNow(Date(section.updatedAt), { addSuffix: true })}</SectionInfo> */}
                {
                    user.user.role === 'President' && (
                        <EditDeleteBtns>
                            <EditDiv className='edit-btn' onClick={showEditForm}>
                                <Edit style={{pointerEvents:'none'}}/>
                            </EditDiv>
                        </EditDeleteBtns>
                    )
                }
            </SectionData>

            <SectionEditForm>
                <EditForm onSubmit={handleUpdate}>
                    <EditFormTitle>Edit section</EditFormTitle>
                    <EditFormLabel htmlFor={`${committee_section.committee_section_title} title`}>Title: </EditFormLabel>
                    <EditFormInput 
                        id={`${committee_section.committee_section_title} title`}
                        type="text" 
                        onChange={(e)=>{setTitle(e.target.value)}}
                        value={title}
                        placeholder={committee_section.committee_section_title}
                    />
                    <EditFormLabel htmlFor={`${committee_section.committee_section_title} description`}>Description: </EditFormLabel>
                    <EditFormTextarea 
                        rows='5'
                        id={`${committee_section.committee_section_title} description`}
                        type="text" 
                        onChange={(e)=>{setDescription(e.target.value)}}
                        value={description}
                        placeholder={committee_section.committee_section_description}
                    />
                    <EditFormLabel htmlFor={`${committee_section.committee_section_title} order`}>Ordering: </EditFormLabel>
                    <EditFormInput
                        id={`${committee_section.committee_section_title} order`}
                        type="number" 
                        onChange={(e)=>{setOrder(e.target.value)}}
                        value={order}
                        min='1'
                        max='4'
                        placeholder='Ordering Section Number'
                    />
                    <EditFormLabel htmlFor='committeeSectionfontColor'>Text Color:</EditFormLabel>
                    <EditFormInput 
                        style={{
                            border: 'none',
                            padding: 0
                        }}
                        id='committeeSectionfontColor'
                        type="color" 
                        onChange={e => handleTextColor(e.target.value)}
                        onInput={e => handleTextColor(e.target.value)}
                        defaultValue={fontColor}
                    />
                    <input onChange={e => handleTextOpacity(e.target.value)} type="range" id='committeeSectionfontColorRange' min='0' max='1' step='0.05' className='sliderEdit'/>
                    <EditFormLabel htmlFor='committeeSectionBackgroundColor'>Background Color:</EditFormLabel>
                    <EditFormInput 
                        style={{
                            border: 'none',
                            padding: 0
                        }}
                        id='committeeSectionBackgroundColor'
                        type="color" 
                        onChange={e => handleBgColor(e.target.value)}
                        onInput={e => handleBgColor(e.target.value)}
                        defaultValue={backgroundColor}
                    />
                    <input onChange={e => handleBgOpacity(e.target.value)} type="range" id='committeeSectionBackgroundColorRange' min='0' max='1' step='0.05' className='sliderEdit'/>
                    
                    <EditFormButton disabled={isLoading}>Edit section</EditFormButton>
                    {error && <ErrorDiv className="error">{error}</ErrorDiv>}
                    {updated && <UpdatedDiv>{updated}</UpdatedDiv>}

                    <DeleteDiv className='delete-btn' onClick={showDeletePopup}>
                        <Delete style={{pointerEvents:'none'}}/>
                        Delete Section
                    </DeleteDiv>
                </EditForm> 
            </SectionEditForm>
            <div id="deleteCommitteeSectionPopup">
                <div id='deleteCommitteeSectionDiv'>
                    <h5 style={{width:'60%',margin:'5px auto 20px auto',textAlign:'center'}}>Are you sure you want to delete this section ?</h5>
                    
                    <div style={{display:'flex',justifyContent:'space-evenly',margin:'4% auto',width:'70%'}}>
                        <DeleteButton disabled={isLoading} onClick={handleDelete}>
                            Delete
                        </DeleteButton>
                        <CancelButton onClick={closeDeletePopupHandle}>
                            Cancel
                        </CancelButton>
                    </div>
                    {deleted && (<b>{deleted}</b>)}
                    {error && <ErrorDiv className="error">{error}</ErrorDiv>}

                </div>
            </div>
        </Wrapper>
    </Container>
  )
}

export default AllSections;
