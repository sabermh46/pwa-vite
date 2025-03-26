import React, { useEffect, useState } from 'react'
import moods from "../../utils/moods"

// eslint-disable-next-line no-unused-vars
const makeListOfActivity = () => {

}


const MoodCard = ({setCurrentMood}) => {
  const [selected, setSelected]=useState("");

  useEffect(()=>{
    moods.map(m=>m["name"]).includes(selected) ? console.log('hurr') : null;

    
  }, [selected])
  
  const setCurrent_ood = (mood) => {
    setSelected(mood)
    setCurrentMood(mood)
  }
  
  return (
    <div className='boxShadow20 bg-background w-[calc(100%-20px)] mx-auto rounded-[clamp(16px,4vw,56px)] overflow-hidden text-black p-[1vw]'>
      <p className='text-center my-1 text-text font-semibold'>How Are You?</p>
        <div className='flex justify-between gap-[1px]'>
          {
            moods.map((mood,i) => <MoodIcon data={mood} onClicked={()=>setCurrent_ood(mood.name)} selected={selected} key={i} />)
          }
        </div>
    </div>
  )
}

export default MoodCard



export const MoodIcon = ({ data, onClicked, selected }) => {
  const { name, Icon, color } = data;



  return (
    <div  className={`flex flex-col items-center justify-center flex-1`} onClick={onClicked} style={{
      color: selected === name ? 'white' : color
    }}>
      <p
        className={`w-full h-full aspect-square rounded-full transition-all duration-300 !bg-opacity-0 hover:!bg-opacity-100 p-1`}
        style={{
          background: selected === name ? color : 'var(--bg-background)'
        }}
      >
        <Icon className="w-full h-full" />
      </p>
      <p className={`text-center py-2 uppercase not-italic font-bold text-[clamp(10px,2vw,35px)]`} style={{
      color: color
    }}>
        {name}
      </p>
    </div>
  );
};

