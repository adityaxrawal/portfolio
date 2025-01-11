import React, { createContext, useState } from 'react'
import { lightModeColorList } from '../share/utils/constant'

export const SharedStateContext = createContext()

const intialBackgroundColor = lightModeColorList[0];

export const SharedStateProvider = (props) => {
  const [isDarkTheme, setDarkTheme] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(intialBackgroundColor)
  return (
    <SharedStateContext.Provider value={{ isDarkTheme, setDarkTheme, backgroundColor, setBackgroundColor }}>
      {props.children}
    </SharedStateContext.Provider>
  )
}