import { Course } from "@/app/interfaces";
interface inCourseProps{
    cs: Course
    dcs: (val:number) => void
}

const InCourse:React.FC<inCourseProps> = ({cs, dcs}) =>{


    return <div className = 'border-b-[1px] border-black border-opacity-10 p-[10px]'>
      <div className = 'courseHead' >
      <div className = 'courseID'>
        {cs.dept} {' '} {cs.number}
      </div>
      <div className = 'title'> {cs.title} </div>
      </div>
      <button className = 'remBut' onClick = {() => dcs(cs.number)} > Remove from cart</button>
    </div>;
  }
export default InCourse;