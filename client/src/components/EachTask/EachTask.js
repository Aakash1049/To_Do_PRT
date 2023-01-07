import React, { useEffect, useState } from 'react'
import moment from "moment"
const EachTask = ({ task, setCompletedTasks, completedTasks, isAnyStart, setIsAnyStart }) => {
  const [start, setStart] = useState(true)
  // let dt1 = 0, dt2 = 0
  const [dt1,setDt1]=useState(task.TimeTaken)
  const[dt2,setDt2]=useState()
  const startAction = () => {
    if (isAnyStart) {
      alert("finishing the ongoing task first or pause the ongoing task")
      return
    }
    setStart(false)
    setIsAnyStart(true)
    // dt1 = Date.now()%100
    setDt1(moment.utc())
    // console.log(dt1)

  }
  useEffect(() => {
    // console.log(moment())
    
    
  }, [])
  const pauseHandle = () => {
    
    // dt2 = Date.now()%100
    setDt2(moment.utc())
    // console.log(dt2)
    let duration=moment.duration(dt1.diff(dt2))
    var seconds = Math.abs(duration.asSeconds().toFixed(0));
    console.log(typeof(seconds))
    fetch("/editActivity",{
      method:"PUT",
      headers:{
        "Content-type": "application/json",
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        task,
        TimeTaken:`${parseInt(seconds/60)}:${parseInt(seconds%60)}`
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        alert(data.error)
      }
      else{
        // alert("updated")
        setStart(true)
        setIsAnyStart(false)

      }
    })
    setIsAnyStart(false)
    setStart(true)
    console.log("total time",`${parseInt(seconds/60)}:${parseInt(seconds%60)}`)

  }
  const EndHandle = () => {
    // console.log(task.Activity)
    

    // dt2 = Date.now()
    setDt2(moment.utc())
    // console.log(dt2)
    let duration=moment.duration(dt1.diff(dt2))
    var seconds = Math.abs(duration.asSeconds().toFixed(0));
    // console.log(typeof(seconds))
    fetch("/editActivity",{
      method:"PUT",
      headers:{
        "Content-type": "application/json",
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        task,
        TimeTaken:`${parseInt(seconds/60)}:${parseInt(seconds%60)}`
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        alert(data.error)
      }
      else{
        // alert("updated")
        setStart(true)
        setIsAnyStart(false)

        console.log("total time",`${parseInt(seconds/60)}:${parseInt(seconds%60)}`)
        setCompletedTasks([...completedTasks, data.task])
      }
      setIsAnyStart(false)
    setStart(true)
    })


  }
  function diff_minutes(dt2, dt1) {
    // var diff=(dt2.getTime()-dt1.getTime())/1000
    var diff = dt2 - dt1
    diff /= 60
    return Math.abs(Math.round(diff))
  }
  return (
    <>
      <tr>
        <td>{task.Activity}</td>
        <td>{task.Status}</td>
        <td>{task.TimeTaken}</td>
        <td>{start ? <button onClick={startAction}>Start</button> : <><button onClick={pauseHandle}>Pause</button><button onClick={EndHandle}>End</button></>}</td>
      </tr>
    </>
  )
}

export default EachTask