import React, { createContext, useState } from 'react'

export const SharedStateContext = createContext()

export const SharedStateProvider = (props) => {
    const [isDarkTheme, setDarkTheme] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState('#F8F4E1')
  return (
    <SharedStateContext.Provider value={{isDarkTheme, setDarkTheme, backgroundColor, setBackgroundColor}}>
        {props.children}
    </SharedStateContext.Provider>
  )
}