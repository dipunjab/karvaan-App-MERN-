import React from 'react'
import { useDispatch } from 'react-redux'
import {closeModal} from "../store/modalSlice"

const Profile = () => {

const dispatch = useDispatch()
dispatch(closeModal())

  return (
    <div>
      Profile
    </div>
  )
}

export default Profile
