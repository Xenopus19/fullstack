import { useContext } from "react"
import NotifyContext from "../notificationContext"

const Notification = () => {
  const {notification} = useContext(NotifyContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if(notification==='') return <></>

  return (
    <div style={style}>
      <p>{notification}</p>
    </div>
  )
}

export default Notification
