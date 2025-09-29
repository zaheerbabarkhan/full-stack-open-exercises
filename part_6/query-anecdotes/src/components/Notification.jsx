import { useNotificationValue } from "../NotficationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notificationValue = useNotificationValue()

  if (!notificationValue) {
    return null
  }
  return (
    <div style={style}>
      {notificationValue}
    </div>
  )
}

export default Notification
