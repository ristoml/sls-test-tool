/* This component contains the controls logic and is used for rendering the control elements in the Home-view */
import Button from './Button'
import { Link } from 'react-router-dom'
import Toggle from './Toggle'

const ControlPanel = ({ onChange, onClick, onClick2, isRecording, isLeft, handleTimer, useTimer, useFile, handleFile, reps, repsPlus, repsMinus, handleFlip, flipped }) => {
  return (
    <div className='control-panel'>
      <div>Side L
        <Toggle
          disabled={isRecording ? true : false}
          onChange={onChange}
          checked={isLeft}
        />
        R<br>
        </br>
        Cam R
        <Toggle
          disabled={isRecording ? true : false}
          onChange={handleFlip}
          checked={!flipped}
        />F
      </div>
      <div className='start-button'>
        <div className='checkBoxes'>
          <label>Timer</label>
          <input type='checkbox'
            id='usetimer'
            name='usetimer'
            checked={useTimer && !useFile}
            disabled={useFile}
            onChange={handleTimer} /><br />
          <label>Use file</label>
          <input type='checkbox'
            id='usefile'
            name='usefile'
            checked={useFile}
            onChange={handleFile} /></div>
        {useFile ? (<>
          <label className="videoLabel" htmlFor="video">
            Open
          </label>
          <input
            style={{ display: "none" }}
            className="videoLabel"
            type="file"
            id="video"
            accept=".mp4, .ogg, .webm"
            onChange={useFile}
          />
        </>) : (<>  <Button
          className={'btn'}
          color={isRecording ? '#bdffff' : '#8300d4'}
          onClick={onClick}
          text={isRecording ? 'Stop' : 'Start'}
        /></>

        )}

        <label>Reps</label>
        <div className='reps'><Button
          className={'btn4'}
          color={'lightgreen'}
          onClick={repsPlus}
          text={'+'}
        />
          <label><strong>{reps}</strong></label>
          <Button
            className={'btn4'}
            color={'pink'}
            onClick={repsMinus}
            text={'-'}
          /></div>
      </div>
      <div className='control-panel2'>
        <Button
          className={'btn2'}
          color={'mediumseagreen'}
          onClick={onClick2}
          text={'Load'}
        />
        <br></br>
        <Link to='/info' target={'_blank'}>
          <Button
            className={'btn2'}
            color={'slategrey'}
            text={'Help'}
          />
        </Link>
      </div>
    </div>

  )
}

export default ControlPanel
