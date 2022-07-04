/* This component contains the controls logic and is used for rendering the control elements in the Home-view */
import Button from './Button'
import { Link } from 'react-router-dom'
import Toggle from './Toggle'

const ControlPanel = ({ onChange, onClick, onClick2, isRecording, isLeft, handleTimer, useTimer, handleFlip, flipped }) => {
  return (
    <div className='control-panel'>
      <div>Leg L
        <Toggle
          disabled={isRecording ? true : false}
          onChange={onChange}
          checked={isLeft}
        />
        R<br>
        </br>
        Flip Y
        <Toggle          
          disabled={isRecording ? true : false}
          onChange={handleFlip}          
          checked={flipped}
        />N
      </div><div>
        <Button
          className={'btn'}
          color={isRecording ? '#bdffff' : '#8300d4'}
          onClick={onClick}
          text={isRecording ? 'Stop' : 'Start'}
        />

        <input type='checkbox'
          id='usetimer'
          name='usetimer'
          checked={useTimer}
          onChange={handleTimer} /><label> Timer</label></div>
      <div className='control-panel2'>
        <Button
          className={'btn2'}
          color={'grey'}
          onClick={onClick2}
          text={'Load'}
        />
        <br></br>
        <Link to='/info' target={'_blank'}>
          <Button
            className={'btn2'}
            color={'grey'}
            text={'Help'}
          />
        </Link>
      </div>
    </div>
  )
}

export default ControlPanel
