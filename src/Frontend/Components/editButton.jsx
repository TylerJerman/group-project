const editButton = ({isEditing, onEditClick, onSaveClick, deleteClick}) => {
  return isEditing ? (
    <td>
      <button onClick={onSaveClick}>Save</button>
    </td>
  ) : (
    <td>
      <button onClick={deleteClick}>Delete</button>
      <button onClick={onEditClick}>Edit</button>
    </td>
  )
}

export default editButton