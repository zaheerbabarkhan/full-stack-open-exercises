import { useReducer, useContext, createContext } from "react";

const notificationRecuer = (state = "", action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload
    case "HIDE":
      return ""
    default:
      break;
  }
}



const NotificationContext = createContext()

export const useNotificationValue = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[0]
}

export const useNotifactionDispatch = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[1]
}

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(notificationRecuer)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}



export default NotificationContext