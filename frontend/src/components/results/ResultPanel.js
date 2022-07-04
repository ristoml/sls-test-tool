/* Component used for displaying the drop-down menu showing the entries from the DB. 
   It also calls the API to get all of the data from the DB. */

import { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Button from '../home/Button'
import PlayBack from '../results/PlayBack'

//let APIURL = 'https://sls-backend-sls-test-tool.rahtiapp.fi/' // url which is used in api calls
let APIURL = 'http://localhost:3001/'


const makeOptions = (data) => { // form the initial array of labels and Ids which is passed on to the react-select drop-down menu component
    const rdata = data.map(x => ({
        value: x.id,
        label: new Date(x.date).toLocaleString('en-GB') + ': ' + x.client
    }))
    return rdata.reverse()
}

const updateOptions = (data, value, newName) => { // after deleting an entry we need to form the array again.    
    for (let i = 0; i < data.length; i++) {
        if (data[i].value === value) {
            data[i].label = data[i].label.slice(0, 22) + newName // label includes both the date and the client name, so we slice it a little
        }
    }
    return data
}
let options

const ResultPanel = ({ getId, delId, sdata, updateClient }) => {
    const [resultId, setResultId] = useState(null)
    const [allData, setAllData] = useState(sdata)
    const [label, setLabel] = useState()
    const [showEdit, setShowEdit] = useState(false)
    const [showPlayback, setShowPlayback] = useState(false)
    const isLoaded = useRef(false)
    const [tempName, setTempName] = useState('')
    const [listOptions, setListOptions] = useState('')
    const canvasRef = useRef(null) // for playback


    useEffect(() => {
        setAllData(sdata)
        switch (isLoaded.current) {
            case false: // when we render this component for the first time
                getAllData().then(response => {
                    options = makeOptions(response.data)
                    setLabel(options[0].label)
                    setResultId(options[0].value)
                    setTempName(options[0].label.slice(22))
                    setListOptions(options)
                    isLoaded.current = true
                })
                break
            default:

        }
    }, [sdata])

    const getAllData = () => {
        return axios.get(APIURL + 'api/results')
    }

    return (<>
        {options && // dont try to render before we have the array ready
            <div className='result-panel'>
                <Select className='select-single'
                    onChange={e => {
                        console.log(e)
                        setResultId(e.value)
                        setLabel(e.label)
                        getId(e.value)
                        setTempName(e.label.slice(22))
                    }}
                    options={listOptions}
                    value={{ label: label }}

                />
                <Button
                    className={'btn2'}
                    text='Edit'
                    color='#9a9a9a'
                    onClick={() => {
                        setShowEdit(true)
                    }
                    }
                />
                <Button
                    className={'btn2'}
                    text='Play'
                    color='#06e190'
                    onClick={() => {
                        setShowPlayback(true)
                    }
                    }
                />


                <Button
                    className={'btn2'}
                    text='Delete'
                    color='#e60000'
                    onClick={() => {
                        if (window.confirm(`Do you want to delete the test result \n '${label}' ?`)) {
                            isLoaded.current = false
                            delId(resultId)
                        }
                    }
                    }
                />
            </div>
        } {showEdit && // show a pop-up box for editing the name
            <div className='popup-box'>
                <div className='editBox'>
                    <p><strong>Edit client name</strong><br /></p>
                    <label>New name: </label>
                    <input type="text" value={tempName} onChange={(e) => { setTempName(e.target.value) }} /><br /><br />
                    <Button
                        className={'btn2'}
                        color='grey'
                        text='Ok'
                        onClick={() => {
                            console.log("update: ", tempName)
                            setLabel(label.slice(0, 22) + tempName)
                            updateClient(resultId, tempName)
                            setListOptions(updateOptions(options, resultId, tempName))
                            console.log(listOptions)
                            setShowEdit(false)
                        }} />
                    <Button
                        className={'btn2'}
                        color='grey'
                        text='Cancel'
                        onClick={() => {
                            setShowEdit(false)
                        }} />
                </div>
            </div>
        } {showPlayback && // show a pop-up box for playbacking of the selected recording
            <div className='popup-box'>
                <div className='editBox' id='playback'>
                    <p><strong>Playback box</strong><br /></p>
                    <PlayBack data={() => getId(resultId)}></PlayBack>
                    <Button
                        className={'btn2'}
                        color='grey'
                        text='Play'
                        onClick={() => {
                            console.log("playback")

                        }} />
                    <Button
                        className={'btn2'}
                        color='grey'
                        text='Close'
                        onClick={() => {
                            setShowPlayback(false)
                        }} />
                </div>
            </div>
        }
    </>)
}

export default ResultPanel
