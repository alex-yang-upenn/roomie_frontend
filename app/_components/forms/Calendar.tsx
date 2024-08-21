'use client'

import { DateRange, Range, RangeKeyDict } from "react-date-range"
import config from "../../../tailwind.config"
import resolveConfig from "tailwindcss/resolveConfig"
import React from "react"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

type Props = {
    value: Range
    onChange: (value: RangeKeyDict) => void
    bookedDates?: Date[]
}

const Calendar = ({ value, onChange, bookedDates }: Props) => {
  const fullConfig = resolveConfig(config)
  const airbnbDark = fullConfig.theme.colors["airbnbDark"]

  return (
    <DateRange 
      className="w-full border border-gray-400 rounded-xl mb-4" 
      rangeColors={[airbnbDark]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={bookedDates} 
    />
  )
}

export default Calendar