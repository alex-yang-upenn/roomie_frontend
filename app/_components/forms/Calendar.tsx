'use client'

import { DateRange, Range, RangeKeyDict } from "react-date-range"
import { roomieDark } from "@/app/_libs/colors"
import React from "react"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

type Props = {
    value: Range
    onChange: (value: RangeKeyDict) => void
    bookedDates?: Date[]
}

const Calendar = ({ value, onChange, bookedDates }: Props) => {
  return (
    <DateRange 
      className="w-full border border-gray-400 rounded-xl mb-4" 
      rangeColors={[roomieDark]}
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