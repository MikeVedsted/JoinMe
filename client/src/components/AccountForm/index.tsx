import React, { useState } from 'react'
import axios from 'axios'

import Button from '../Button'
import FormInputField from '../FormInputField'
import FormInputTextArea from '../FormInputTextArea'
import FormDropdownField from '../FormDropdownField'
import GoogleAutoComplete from '../GoogleAutoComplete'
import { useFormFields } from '../../hooks/useFormFields'
import { convertDate } from '../../util/helperFunctions'
import { genderOptions } from '../../util/constants/genderOptions'
import { AccountFormProps } from '../../types'
import './AccountForm.scss'

const AccountForm = ({ user }: AccountFormProps) => {
  const DOB = convertDate(user?.date_of_birth)
  const [address, setAddress] = useState({})
  const [fields, handleFieldChange] = useFormFields({
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    date_of_birth: DOB,
    gender: user?.gender,
    base_address: user?.base_address,
    profile_text: user?.profile_text,
    profile_image: user.profile_image
  })
  const { user_id } = user

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      const update = { ...fields, address }
      const res = await axios({
        method: 'PUT',
        url: `http://localhost:5000/api/v1/users/${user_id}`,
        data: update
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <h2 className='form__title'>Profile set-up</h2>
        <FormInputField
          type='email'
          id='email'
          label='Email'
          value={fields.email}
          readOnly
        />
        <FormInputField
          type='text'
          id='first_name'
          label='First name'
          value={fields.first_name}
          onChange={handleFieldChange}
        />
        <FormInputField
          type='text'
          id='last_name'
          label='Last name'
          value={fields.last_name}
          onChange={handleFieldChange}
        />
        <FormInputField
          type='date'
          id='date_of_birth'
          value={fields.date_of_birth}
          label='Birthday'
          onChange={handleFieldChange}
        />
        <FormDropdownField
          label='Gender'
          id='gender'
          options={genderOptions}
          onBlur={handleFieldChange}
        />
        <FormInputField
          type='text'
          id='base_address'
          label='Default start address'
          value={'Saved address: ' + fields.base_address}
          readOnly
        />
        <GoogleAutoComplete handleAddress={setAddress} />
        <FormInputTextArea
          id='profile_text'
          label='Profile text'
          value={fields.profile_text}
          onChange={handleFieldChange}
          rows={1}
        />
        <div className='image-upload'>
          <FormInputField
            className='image-upload__field'
            type='url'
            id='profile_image'
            label='Image url'
            value={fields.profile_image}
            onChange={handleFieldChange}
          />
          <img
            className='image-upload__image'
            src={fields.profile_image}
            alt='What we currently have'
          />
        </div>
        <Button type='submit' text='Submit' />
      </form>
    </>
  )
}

export default AccountForm
