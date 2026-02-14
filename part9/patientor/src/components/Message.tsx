export interface MessageProps{
    message: string
}

const Message = ({message}: MessageProps) =>{
    if(message==='') return
    
    const cardStyle = {
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    border: `2px solid #ff4d4f`, 
    backgroundColor: '#ffe5e5',
    color: '#a80711',
    };
    return(
        <div style={cardStyle}>
            {message}
        </div>
    )
}

export default Message