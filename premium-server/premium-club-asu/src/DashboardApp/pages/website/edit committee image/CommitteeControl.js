import React from 'react'
import ImageEditor from './imageEditor/ImageEditor'
import { useEffect } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useCommitteesContext } from '../../../hooks/useCommitteesContext'
import config from '../../../../config'
import CommitteeNav from './committeeNav/CommitteeNav'
import { Route, Routes } from 'react-router-dom'
import Committee from './committee/Committee'



const CommitteeControl = ({ committees }) => {
  const { user } = useAuthContext()

  const premiumApi = config.premiumApi

  return (
    <>
      <CommitteeNav committees={committees} />
      <Routes>
        <Route index element={<Committee committee={ committees && committees[0]} />}/>
        {
          committees && committees.map((committee) => (
            <Route key={committee._id} path={`${committee.committee_name.replace(/\s+/g, '-').toLowerCase()}`} element={<Committee committee={committee && committee} />} />
          ))
        }
      </Routes>
    </>
  )
}

export default CommitteeControl
