const AddNew = (props) =>{
    return(
        <form onSubmit={props.handleAddPerson}>
        <div>
          name: <input value = {props.newName} onChange = {props.handleNameChange} />
        </div>
        <div>
          phone: <input value = {props.newPhone} onChange = {props.handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default AddNew