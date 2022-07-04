/* This is used for the leg selection toggle-switch in the Home view */

const Toggle = ({ disabled, onChange, checked }) => {
  return (
    <label className='toggle-switch'>
      <input
        type='checkbox'
        checked={!checked}
        disabled={disabled}
        onChange={onChange}
      />
      <span className='slider' />
    </label>
  )
}

export default Toggle