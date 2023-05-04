import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useHomeContext } from '../../../../hooks/useHomeContext'
import config from '../../../../../config'
import { mobile } from '../../../../responsive'

const Container = styled.div`
    flex: 2;
    width: 100%;
`
const Wrapper = styled.div`
    background-color: white;
    border-radius: 10px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); 
    /* height: 200px; */
    padding: 30px;
    margin: 20px;
    display: flex;
    flex-direction: column;

    ${mobile({
        margin:'10px 0'
    })}
`

const NewSectionTitle = styled.h2`

`
const NewSectionForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 7px;
`
const NewSectionLabel = styled.label`
  font-weight:bold;
`
const NewSectionInput = styled.input`
    border:none;
    padding: 5px;
    border-bottom: 1px solid gray; 
`
const NewSectionTextarea = styled.textarea`
    border:none;
    padding: 5px;
    border-bottom: 1px solid gray;  
`
const NewSectionButton = styled.button`
    background-color: gray;
    border: none;
    width: fit-content;
    padding: 10px;
    font-size: 15px;
    font-weight: bold;
    color: white;
    border-radius: 5px;
`
const NewSectionError = styled.div`
    color: red;
    font-weight: bold;
`
const NewSectionAdded = styled.div`
    color: green;
    font-weight: bold;
`
const NewSection = ({ committee }) => {

  const { user } = useAuthContext()

  const premiumApi = config.premiumApi

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fontColor, setFontColor] = useState(null)
  const [backgroundColor, setBackgroundColor] = useState(null)

  const [error, setError] = useState(null)
  const [created, setCreated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSectionCreation = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!user || user.user.role !== 'President') {
      setIsLoading(false)
      setError('You are not authorized')
    }

    if (!title || !description || !fontColor || !backgroundColor) {
        setIsLoading(false)
        setError("All fields must be filled")
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

    const response = await fetch(`http://localhost:5000/committee-api/${committee._id}/create-committee-section`, {
      method:'POST',
      body: JSON.stringify(updatedData),
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
      setIsLoading(false)
      setError(null)
      setEmptyFields([])
      setCreated('Section Added Successfully!')
      setTitle('')
      setDescription('')
    }
  }

  const handleTextColor = async (alpha) => {
    try {
        var textOpacity = document.getElementById('newCommitteeSectionFontColorRange')
        textOpacity.style.backgroundImage = "linear-gradient(to right, rgba(0,0,0,0)," + alpha + ')';
        let rgb = hexToRgb(alpha)
        setFontColor("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+textOpacity.value+")")
    } catch (error) {
        console.log(error)
    }
  }
  const handleTextOpacity = (beta) => {
      try {
          var textColor = document.getElementById('newCommitteeSectionFontColor')
          textColor.style.opacity = beta;
          let rgb = hexToRgb(textColor.value)
          setFontColor("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+beta+")")
      } catch (error) {
          console.log(error)
      }
  }
  const handleBgColor = async (alpha) => {
      try {
          var backgroundOpacity = document.getElementById('newCommitteeSectionBackgroundColorRange')
          backgroundOpacity.style.backgroundImage = "linear-gradient(to right, rgba(0,0,0,0)," + alpha + ')';
          let rgb = hexToRgb(alpha)
          setBackgroundColor("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+backgroundOpacity.value+")")
      } catch (error) {
          console.log(error)
      }
  }
  const handleBgOpacity = (beta) => {
      try {
          var backgroundColor = document.getElementById('newCommitteeSectionBackgroundColor')
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

  return (
    <Container>
        <Wrapper>
            <NewSectionTitle>
              Add Section
            </NewSectionTitle>
            <NewSectionForm onSubmit={handleSectionCreation}>
                <NewSectionLabel htmlFor='title'>Title: </NewSectionLabel>
                <NewSectionInput 
                    required
                    id='title'
                    type="text" 
                    onChange={(e)=>{setTitle(e.target.value)}}
                    value={title}
                    className={emptyFields.includes('title') ? 'error' : ''}
                    placeholder='Add title'
                />
                <NewSectionLabel htmlFor='description'>Description: </NewSectionLabel>
                <NewSectionTextarea 
                    required
                    rows='5'
                    id='description'
                    type="text" 
                    onChange={(e)=>{setDescription(e.target.value)}}
                    value={description}
                    className={emptyFields.includes('description') ? 'error' : ''}
                    placeholder='Add description'
                />
                <NewSectionLabel>Text Color:</NewSectionLabel>
                <NewSectionInput 
                    style={{
                      border: 'none',
                      padding: 0
                    }}
                    required
                    id='newCommitteeSectionFontColor'
                    type="color" 
                    onChange={e => handleTextColor(e.target.value)}
                    onInput={e => handleTextColor(e.target.value)}
                    defaultValue={fontColor}
                />
                <input onChange={e => handleTextOpacity(e.target.value)} type="range" id='newCommitteeSectionFontColorRange' min='0' max='1' step='0.05' className='sliderEdit'/>
                <NewSectionLabel>Background Color:</NewSectionLabel>
                <NewSectionInput 
                    style={{
                      border: 'none',
                      padding: 0
                    }}
                    required
                    id='newCommitteeSectionBackgroundColor'
                    type="color" 
                    onChange={e => handleBgColor(e.target.value)}
                    onInput={e => handleBgColor(e.target.value)}
                    defaultValue={backgroundColor}
                />
                <input onChange={e => handleBgOpacity(e.target.value)} type="range" id='newCommitteeSectionBackgroundColorRange' min='0' max='1' step='0.05' className='sliderEdit'/>
                <NewSectionButton disabled={isLoading}>Create Section</NewSectionButton>
                {error && <NewSectionError className="error">{error}</NewSectionError>}
                {created && <NewSectionAdded>{created}</NewSectionAdded>}
            </NewSectionForm> 
        </Wrapper>
    </Container>
  )
}

export default NewSection
