export interface MessageProps{
    message: string, 
    isError: boolean
}

const Message = ({message, isError}: MessageProps) =>{
    if(message==='') return
    
    const cardStyle = {
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    border: `2px solid ${isError ? '#ff4d4f' : '#52c41a'}`, 
    backgroundColor: isError ? '#fff1f0' : '#f6ffed',
    color: isError ? '#a80711' : '#237804',
    };
    return(
        
        <div style={cardStyle}>
            {message}
        </div>
    )
}

export default Message