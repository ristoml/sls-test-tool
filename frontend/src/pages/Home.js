/* This component is the Home page, which can be accessed with path '/'. 
   Uses conditional rendering. Default view is Canvas and ControlPanel. The other one is DataPanel. */
import { useState, useRef } from "react"
import Canvas from "../components/home/Canvas"
import ControlPanel from "../components/home/ControlPanel"
import Datapanel from "../components/results/DataPanel"
import Popup from "../components/home/Popup"
import Countdown from "react-countdown";

const Home = () => {
  const [isLeftLeg, setIsLeftLeg] = useState(true)
  const [showCanvas, setShowCanvas] = useState(true)
  const [recording, setRecording] = useState(false)
  const [squatData, setSquatData] = useState({})
  const clientName = useRef('')
  const dataOk = useRef(true)
  const [showPopup, setShowPopup] = useState(false)
  const [useTimer, setUseTimer] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [flipped, setFlipped] = useState(true)
  const [video, setVideo] = useState([])
  

  const startRecording = () => {
    console.log("Start recording");
    if (useTimer) {
      setShowTimer(true)
    } else {
      setRecording(true)
      setShowCanvas(true)
    }
  }

  const stopRecording = () => {
    console.log("Stop recording");
    setRecording(false)
  }

  const getVideo = (video) => {
    setVideo(video)
  }

  const showResults = () => {
    setSquatData({})
    setRecording(false)
    setShowCanvas(false)
  }

  const handleSquatData = (squatData) => {
    console.log(squatData)
    if (squatData[0].data === undefined) {
      dataOk.current = false
    } else {
      setSquatData(squatData)
    }
    setShowPopup(true)
  }
  
  const handleFlip = () => {    
    setFlipped(!flipped)
  }

  const handleTimerChange = () => {
    setUseTimer(!useTimer)    
  }

  const handleLegChange = () => {
    setIsLeftLeg(!isLeftLeg)
  }

  const handlePopup = (selection, name) => {
    clientName.current = name
    if (selection) {
      setShowPopup(false)
      setShowCanvas(false)
    } else {
      setSquatData({})
      setVideo({})
      setShowPopup(false)
    }
  }

  const Completionist = () => <span>Go!</span>;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setTimeout(() => {
        setRecording(true)
        setShowCanvas(true)
        setShowTimer(false)
      }, 500)
      return <Completionist />;
    } else {
      return (
        <span>
          {seconds}
        </span>
      );
    }
  };

  return (
    <div className="container">
      {showCanvas ? (
        <>
          <Canvas
            isLeftLeg={isLeftLeg}
            isStarted={recording}
            getSquatData={handleSquatData}
            onClick={showResults}
            flipped={flipped}
            getVideo={getVideo}
          />
          <ControlPanel
            onChange={handleLegChange}
            onClick={recording ? stopRecording : startRecording}
            onClick2={showResults}
            isRecording={recording}
            isLeft={isLeftLeg}
            handleTimer={handleTimerChange}
            useTimer={useTimer}
            handleFlip={handleFlip}
            flipped={flipped}
          />
          {showPopup &&
            <Popup
              dataOk={dataOk.current}
              handlePopup={handlePopup}
            />
          }
          {showTimer &&
            <div className="countdown-popup-box">
              <div className="countdown-box">
                <Countdown date={Date.now() + 5000} renderer={renderer} />
              </div>
            </div>
          }
        </>
      ) : (
        <Datapanel
          onClick={() => setShowCanvas(!showCanvas)}
          squatData={squatData}
          video={video}
          clientName={clientName.current}
        />
      )}
    </div>
  )
}

export default Home
