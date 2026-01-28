import { useSelector } from "react-redux";

const Message = () => {
  const notification = useSelector((state) => {
    return state.notification});
  if(notification.message === '') return
  const isError = notification.isError

  const cardStyle = {
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    border: `2px solid ${isError ? '#ff4d4f' : '#52c41a'}`,
    backgroundColor: isError ? '#fff1f0' : '#f6ffed',
    color: isError ? '#a80711' : '#237804',
  }
  return(

    <div style={cardStyle}>
      {notification.message}
    </div>
  )
}

export default Message