import React, { createContext, useState } from 'react'

export const SharedStateContext = createContext()

export const SharedStateProvider = (props) => {
    const [isDarkTheme, setDarkTheme] = useState(false)
  return (
    <SharedStateContext.Provider value={{isDarkTheme, setDarkTheme}}>
        {props.children}
    </SharedStateContext.Provider>
  )
}