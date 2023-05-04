import React from 'react'
import styled from 'styled-components'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { mobile } from '../../../../responsive'

const Container = styled.div`
    padding: 4%;
    height: fit-content;
    box-shadow: 2px 4px 10px 1px rgba(201,201,201,0.47);
    display: flex;
    flex-direction: row;
    margin: auto;
    border-radius: 10px;
    gap: 10px;

    ${mobile({
        flexDirection:'column'
    })}
`
const Description = styled.p`
    flex: 2;
    ${mobile({
        fontSize:'12px !important'
    })}
`
const DescriptionForm = styled.form`
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 15px;
`
const DescriptionLabel = styled.label`
    color: gray;
`
const DescriptionTextarea = styled.textarea`
    background: none;
    border:none;
    border-bottom: 1px solid gray;
    border-left: 1px solid gray;

    ${mobile({
        fontSize:'12px'
    })}
`
const DescriptionButton = styled.button`
    background-color: darkgray;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 7px;
    width: fit-content;

    &:hover {
        background-color: gray;
    }
    &:disabled {
        background-color: darkgray;
        opacity: 0.5;
    }
`
const DescriptionControl = ({ committee }) => {

    const { user } = useAuthContext()

    const [ description, setDescription ] = useState('')
    const [ error, setError ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ updated, setUpdated ] = useState('')

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        if (!user || user.user.role !== 'President') {
            setIsLoading(false)
            setError('You are not authorized to do this action')
            return 0
        }
        if (!description) {
            setIsLoading(false)
            setError('You must add a description for the committee')
            return 0
        }
        const response = await fetch(`http://localhost:5000/committee-api/edit-committee-description/${committee._id}`, {
            method:'PUT',
            body: JSON.stringify({description:description}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            setIsLoading(false)
            setUpdated('Description updated successfully!')
        }
    }

  return (
    <>
        <Container>
            <Description>
                {committee.committee_description}
            </Description>
            <DescriptionForm onSubmit={handleSubmit}>
                <DescriptionLabel htmlFor='committee-description'>
                    Committee Description
                </DescriptionLabel>
                <DescriptionTextarea value={description} onChange={(e) => setDescription(e.target.value)} id='committee-description'/>
                <DescriptionButton disabled={isLoading}>Submit</DescriptionButton>
                {
                    updated && (<b color='green'> {updated} </b>)
                }
                {
                    error && (<b color='red'> {error} </b>)
                }
            </DescriptionForm>
        </Container>
    </>
  )
}

export default DescriptionControl
