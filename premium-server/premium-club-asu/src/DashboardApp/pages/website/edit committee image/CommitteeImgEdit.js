import React from 'react'
import ImageEditor from './imageEditor/ImageEditor'
import { useEffect } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useCommitteesContext } from '../../../hooks/useCommitteesContext'



const CommitteeImgEdit = () => {
  const { user } = useAuthContext()
  const { committees, dispatch } = useCommitteesContext()

  useEffect(() => {
    const fetchCommittees = async () => {
      const response = await fetch('/committee-api/committees', {
        method:'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({type:'SET_COMMITTEES', payload: json})
      }
    }
    user && fetchCommittees()
  }, [ user, dispatch ])
  return (
    <>
      {
        committees && committees.map((committee) => (
          <ImageEditor key={committee._id} committee={committee} />
        ))
      }
    </>
  )
}

export default CommitteeImgEdit
