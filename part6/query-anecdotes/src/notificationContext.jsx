import { createContext, useReducer } from 'react'

const notifyReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'RESET':
      return ''
    default:
      return state
  }
}

const NotifyContext = createContext()

export const NotifyContextProvider = (props) => {
  const [notification, notifyDispatch] = useReducer(notifyReducer, '')

  return (
    <NotifyContext.Provider value={{ notification, notifyDispatch }}>
      {props.children}
    </NotifyContext.Provider>
  )
}

export default NotifyContext