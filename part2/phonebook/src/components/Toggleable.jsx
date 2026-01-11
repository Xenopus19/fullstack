import { useImperativeHandle, useState } from "react"

const Toggleable = (props) => {
    const [isVisible, setVisible] = useState(false)
    
    const hideWhenVisible = {display: isVisible ? 'none' : ''}
    const showWhenVisible = {display: isVisible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!isVisible)
    }

    useImperativeHandle(props.ref, () => {
        return { toggleVisibility }
    })

    return(
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Toggleable