import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../../../hooks/useAuthContext';

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Delete, Edit } from '@mui/icons-material';
import { useActivityImgContext } from '../../../../hooks/useActivityImgContext';
import ActivityCarousel from './activitySlider/ActivityCarousel';
import { fetchAndSetAll } from '../../../../fetch-helpers';

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
`
const DataContainer = styled.div`
    display: flex;
    padding: 10px;
`
const ActivityEdit = styled.div`
    flex: 1;
    padding: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const ActivityTitle = styled.h2`
`
const ActivityDesc = styled.p`
`


const ImgsContainer = styled.div`
    flex : 2;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const CarouselImage = styled.img`
    border-radius: 10px;
    width: 100%;
`
 


const Activity = ({ activity }) => {
    const { activityImgs, dispatch } = useActivityImgContext()
    const { user } = useAuthContext()


    const [ isActivityImg, setIsActivityImg ] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [order, setOrder] = useState('')

    const [ activityImageArray, setActivityImageArray ] = useState([])

    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])

    // const handleDelete = async (e) => {
    //     e.preventDefault()

    //     if (!user || user.user.role !== 'President') {
    //         setError('You are not authorized')
    //     }

    //     const response = await fetch('/home-api/section/'+ section._id, {
    //         method:'DELETE',
    //         headers: {
    //             'Authorization': `Bearer ${user.token}`
    //         }
    //     })
    //     const json = response.json()
    //     if (response.ok) {
    //         dispatch({type: 'DELETE_SECTION', payload:json})
    //     }
    // }

    // const handleUpdate = async (e) => {
    //     e.preventDefault()
    //     setIsLoading(true)
    //     if (!user || user.user.role !== 'President') {
    //         setIsLoading(false)
    //         setError('Your are not authorized')
    //     }

    //     const response = await fetch('/home-api/section/' + section._id, {
    //         method:'PUT',
    //         body: JSON.stringify({title, description,fontColor,backgroundColor,order}),
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${user.token}`
    //         }
    //     })
    //     const json = await response.json()

    //     if (!response.ok) {
    //         setIsLoading(false)
    //         setError(json.error);
    //         setEmptyFields(json.emptyFields)
    //         e.preventDefault()
    //     }
    //     if (response.ok) {
    //         setIsLoading(false)
    //         setError(null)
    //         setEmptyFields([])
    //         setUpdated('Updated Successfully!')
    //         // setTitle('')
    //         // setDescription('')

    //         dispatch({type: 'UPDATE_SECTION', payload:json})
    //         // window.location.reload()
    //     }
    // }

    useEffect(() => {
        fetchAndSetAll([
          {
            url: `/activity-api/activity/${activity._id}/images`,
            setter: setActivityImageArray,
          }
        ]).catch(console.error);
      }, []);

  return (
    <Container>
        <Wrapper>
            <DataContainer style={{flexDirection: activity.flexDirection}}>
                <ActivityEdit style={{direction:activity.flexDirection=='row'? 'rtl' : 'ltr'}}>
                    <ActivityTitle>
                        {activity.activityTitle}
                    </ActivityTitle>
                    <ActivityDesc>
                        {activity.activityDescription}
                    </ActivityDesc>
                </ActivityEdit>
                <ImgsContainer>
                    {!activityImageArray && (
                            <h1>No Images</h1>
                    )}
                    {
                        activityImageArray && (
                            <div style={{maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto'}}>
                                <ActivityCarousel>
                                    {
                                        activityImageArray.map((activityImg)=>(
                                            <div key={activityImg._id}>
                                                <div style={{padding:8}}>
                                                    <CarouselImage  src={activityImg.imageUrl} className='img-fluid' />    
                                                </div>
                                            </div>
                                        ))
                                    }
                                </ActivityCarousel>
                            </div>
                        )
                    }
                </ImgsContainer>
            </DataContainer>
        </Wrapper>
    </Container>
  )
}

export default Activity;
