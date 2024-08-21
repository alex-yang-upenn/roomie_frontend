'use client'

import useCountries from "@/app/_libs/useCountries"
import Select from "react-select"
import React from "react"

export type SelectCountryValue = {
  label: string
  value: string
}

type Props = {
  value?: SelectCountryValue
  onChange: (value: SelectCountryValue) => void
}

const SelectCountry = ({ value, onChange }: Props) => {
  const { getAll } = useCountries()
  
  return (
    <Select 
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as SelectCountryValue)}
    />
  )
}

export default SelectCountry