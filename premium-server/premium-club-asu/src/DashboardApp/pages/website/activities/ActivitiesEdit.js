import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useActivityContext } from '../../../hooks/useActivityContext'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Activity from './allActivities/Activity'
import { useActivityImgContext } from '../../../hooks/useActivityImgContext'
import CreateActivity from './createPopup/CreateActivity'

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`
const CreateButtonDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 30px 30px 0 30px;
`
const CreateButton = styled.button`
  background: rgb(131, 131, 131);
  border: none;
  padding: 1%;
  border-radius: 5px;
  color: white;

  &:hover {
    background: rgb(80, 80, 80);
  }
`
const ActivitiesEdit = ({ images }) => {
  const { activities, dispatch } = useActivityContext()
  const { user } = useAuthContext()

  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true)
      const response = await fetch('/activity-api/activities', {
        method:'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        setIsLoading(true)
        dispatch({type:'SET_ACTIVITIES', payload: json})
      }
    }
    fetchActivities()
  }, [ user, dispatch ])


  const showCreatePopup = () => {
    const createPopup = document.getElementById('createPopup')
    console.log(createPopup.style.display)
    createPopup.style.display = 'block'
    console.log('popup changed')
  }

  return (
    <>
      <Container>
        <CreateButtonDiv>
          <CreateButton onClick={showCreatePopup}>Add new activity</CreateButton>
          <h5>
            <b>Activities Count: </b>{activities && activities.length}
          </h5>
        </CreateButtonDiv>
        <div>
          {
            activities && activities.map((activity) => (
              <Activity key={activity._id} activity={activity} />
            ))
          }
        </div>
        <div id="createPopup">
            <CreateActivity />
        </div>
      </Container>
    </>
  )
}

export default ActivitiesEdit
