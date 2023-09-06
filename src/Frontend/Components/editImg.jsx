const editImg = ({value, isEditing, onValueChange}) => {

  return isEditing ? (
    <td>
      <input type='text' value={value} onChange={(e) => onValueChange(e.target.value)}/>
      {value && <img src={value} alt="Preview" style={{width: '50px', height: '50px'}}/>}
    </td>
  ) : (
    <td>
      {value ? <img src={value} alt="Preview" style={{width: '50px', height: '50px'}}/> : null}
    </td>
    )

}

export default editImg