import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../Button'
import ProfileImage from '../ProfileImage'
import FormInputField from '../FormInputField'
import FormInputTextArea from '../FormInputTextArea'
import FormDropdownField from '../FormDropdownField'
import GoogleAutoComplete from '../GoogleAutoComplete'
import { useFormFields } from '../../hooks/useFormFields'
import { genderOptions } from '../../util/constants/genderOptions'
import { updateUser } from '../../redux/actions'
import { AccountFormProps, AppState } from '../../Types'
import './AccountForm.scss'

const AccountForm = ({ userId }: AccountFormProps) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: AppState) => state)
  const initAddress = {
    street: user.street ? user.street : '',
    number: user.number ? user.number : '',
    postal_code: user.postal_code ? user.postal_code : '',
    city: user.city ? user.city : '',
    country: user.country ? user.country : '',
    lat: user.lat ? user.lat : '',
    lng: user.lng ? user.lng : ''
  }
  const [address, setAddress] = useState<any>(initAddress)
  const [fields, handleFieldChange] = useFormFields({
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    date_of_birth: user.date_of_birth,
    gender: user.gender,
    profile_text: user.profile_text,
    profile_image: user.profile_image
  })
  const [userAddress, setUserAddress] = useState(initAddress)

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const update = { ...fields, address }
    setUserAddress(address)
    dispatch(updateUser(userId, update))
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2 className='form__title'>Edit</h2>
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
        value={
          fields.date_of_birth
            ? fields.date_of_birth.slice(0, 10)
            : fields.date_of_birth
        }
        label='Birthday'
        onChange={handleFieldChange}
      />
      <FormDropdownField
        label='Gender'
        id='gender'
        options={genderOptions}
        selectedValue={fields.gender}
        onBlur={handleFieldChange}
      />
      <GoogleAutoComplete
        handleAddress={setAddress}
        label='Address'
        currentAddress={
          user.street &&
          `${userAddress.street} ${userAddress.number}, ${userAddress.postal_code} ${userAddress.city}`
        }
      />
      <FormInputTextArea
        id='profile_text'
        label='Profile text'
        value={fields.profile_text}
        onChange={handleFieldChange}
        rows={1}
      />
      <div className='form__image-upload'>
        <FormInputField
          type='url'
          id='profile_image'
          label='Image url'
          value={fields.profile_image}
          onChange={handleFieldChange}
        />
        {fields.profile_image && (
          <ProfileImage
            image={fields.profile_image}
            alt='What we currently display'
          />
        )}
      </div>
      <Button type='submit' text='Submit' modifier='primary' />
    </form>
  )
}

export default AccountForm
