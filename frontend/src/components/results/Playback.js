import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'

let APIURL = process.env.REACT_APP_BASE_URL //url which is used in api calls 

const Canvas = props => {
    const [currentData, setCurrentData] = useState('')
    const [initialized, setInitialized] = useState(false)
    
    const getResult = (resultId) => { // get specific result by ID
        const promise = axios.get(APIURL + `api/searchResult/${resultId}`)
        promise.then(response => {
            setCurrentData(response.data)
        })
    }

    if (!initialized) {

        getResult(props.id)        
        setInitialized(true)
    }
    console.log(currentData)

    const cvsreF = useRef(null)

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
        ctx.fill()
    }




    useEffect(() => {

        const canvas = cvsreF.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId

        //Our draw came here
        const render = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])


    return <canvas ref={cvsreF} {...props} />
}

export default Canvas