import React, { useEffect, useState } from 'react'
import Background from '../background/Background'
import styled from 'styled-components'
import { useActivityContext } from '../../../hooks/useActivityContext'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Activity from './allActivities/Activity'
import { useActivityImgContext } from '../../../hooks/useActivityImgContext'

const Container = styled.div`
  padding: 10px;
`

const ActivitiesEdit = () => {
  const { activities, dispatch } = useActivityContext()
  const { activityImgs, dispatchImgs } = useActivityImgContext()
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
    user && fetchActivities()
  }, [dispatch, user])
  return (
    <>
      <Container>
        <div>
          {
            activities && activities.map((activity) => (
              <Activity key={activity._id} activity={activity} activityImgs={activityImgs} />
            ))
          }
        </div>
      </Container>
    </>
  )
}

export default ActivitiesEdit
