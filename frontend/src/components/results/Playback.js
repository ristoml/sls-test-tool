import React, { useRef, useEffect } from 'react'
import Button from "../home/Button"

const Canvas = props => {
    let speed = 100;
    let frameCount = 0;
    let paused = false

    const cvsreF = useRef(null)

    const reset = () => {
        speed = 100
    }
    const slow = () => {
        speed += 20
    }
    const fast = () => {
        if (speed - 20 >= 0) speed -= 20
    }
    const rewind = () => {
        if (frameCount >= 5) frameCount -= 5
    }
    const forward = () => {
        if (frameCount + 5 < props.video.length) frameCount += 5
    }
    const pause = () => {
        paused = !paused
    }

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
        let animationFrameId
        canvas.width = 600
        canvas.height = 440

        const render = () => {
            setTimeout(() => {
                if (frameCount === props.video.length - 1) frameCount = 0
                if (!paused) frameCount++
                draw(context, frameCount)
                animationFrameId = window.requestAnimationFrame(render)
            }, speed)

        }

        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])


    return <div><canvas ref={cvsreF} {...props} />
        <Button
            className={'btn5'}
            color='lightblue'
            text='<<'
            onClick={rewind} />
        <Button
            className={'btn5'}
            color='lightgreen'
            text='||/>'
            onClick={pause} />
        <Button
            className={'btn5'}
            color='lightblue'
            text='>>'
            onClick={forward} />
            <label> speed: </label>
        <Button
            className={'btn5'}
            color='lightblue'
            text='-'
            onClick={slow} />
        <Button
            className={'btn5'}
            color='lightgrey'
            text='rst'
            onClick={reset} />
        <Button
            className={'btn5'}
            color='lightblue'
            text='+'
            onClick={fast} />
    </div>
}

export default Canvas