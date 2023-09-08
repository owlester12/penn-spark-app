'use client'
import {useEffect, useState} from 'react';
import { Course } from '@/app/interfaces';

interface theCourseProps{
    cs: Course
    scs: (val:Course) => void
    inCart: boolean
    limit: boolean
    dcs: (val:number) => void
}

const TheCourse:React.FC<theCourseProps> = ({cs, scs, inCart, dcs, limit}) => {

    const [isShown, setIsShown] = useState(false);
    const[courseState, setCourseState] =useState(0);
  
  
    useEffect(() => {
     if (cs.number !== courseState ) {
      (setIsShown(false));
      (setCourseState(cs.number));
    }
  }
    );
  
    function handleClick(){
  
      if(cs.number === courseState || isShown === false){
        setIsShown(!isShown);
      } else {
        setIsShown(false);
      }
      setCourseState(cs.number);
  
    };
  
  
  
    return <div className = 'border-b-[1px] border-black border-opacity-10 p-[10px]' onClick = {handleClick}>
      <div className = 'courseHead' onClick = {handleClick} >
      <div className = 'courseID'>
        {cs.dept} {' '} {cs.number}
      </div>
      <div className = 'title'> {cs.title} </div>
      </div>
    
        
        {isShown && <div className = "text-[13px]" >  {cs.description} </div>}
  
        {isShown && (cs["prereqs"] !== undefined) && Array.isArray(cs["prereqs"]) && <div className = 'text-[13px]'> Prerequisites: {cs["prereqs"]?.join(", ")} </div>}
        {isShown && (cs["cross-listed"] !== undefined) && <div className = 'text-[13px]'> Also offered as: {cs["cross-listed"]?.join(", ")}</div>}
           
  
        {!inCart && limit && <button className = "rounded-[10px] bg-[#9c0404] text-white px-[5px] py-[10px] border-[1px] border-[#9c0404] font-bold mx-[5px]"
         onClick={() => scs(cs)}>Add to cart</button>}
        {inCart && <button className = "remBut" onClick={() => dcs(cs.number)}>Remove from cart</button>}
  
    </div>;
  }
  export default TheCourse;