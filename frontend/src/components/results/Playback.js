import React, { useRef, useEffect } from 'react'

const Canvas = props => {

    const cvsreF = useRef(null)

    const draw = (ctx, frameCount) => {
        if (props.video.length > 1) {
            var tmpImg = new Image()
            tmpImg.src = props.video[frameCount]
            ctx.drawImage(tmpImg, 0, 0, tmpImg.width, tmpImg.height, 0, 0, 600, 440)
        } else {
            ctx.font = "40px Verdana"
            ctx.fillStyle = "#77bdff"
            ctx.fillText("No video available", 120, 220)
        }

    }

    useEffect(() => {

        const canvas = cvsreF.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId
        canvas.width = 600
        canvas.height = 440

        //Our draw came here
        const render = () => {
            setTimeout(() => {
                if (frameCount === props.video.length - 1) frameCount = 0
                frameCount++
                draw(context, frameCount)
                animationFrameId = window.requestAnimationFrame(render)
            }, 120)           

        }

        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])


    return <canvas ref={cvsreF} {...props} />
}

export default Canvas