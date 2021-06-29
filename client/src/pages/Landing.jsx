import React from 'react'
import MoodSubmit from '../components/MoodSubmit';
import Stats from '../components/Stats';


export default function Landing(props) {
  return (
    <div>
    {!props.user ? (<>
      <div><p>welcome to MOOD, where you can keep track of your mood throughout the day</p></div>
    </>) : 
    (<>
    <MoodSubmit/>
    <Stats/>
    </>)}
    </div>
  )
}