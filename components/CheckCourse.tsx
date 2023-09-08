
import { Course } from "@/app/interfaces";
interface checkCourseProps{
    cs: Course
}
const CheckCourse:React.FC<checkCourseProps> = ({cs}) => {


    return <div className = 'courseCont'>
      <div className = 'courseHead' >
      <div className = 'courseID'>
        {cs.dept} {' '} {cs.number}
      </div>
      <div className = 'title'> {cs.title} </div>
      </div>
      <div className = "description" > {cs.description} </div>
      {(cs["prereqs"] != undefined) && <div className = 'description'> Prerequisites: {cs["prereqs"]?.join(", ")} </div>}
        {(cs["cross-listed"] != undefined) && <div className = 'description'> Also offered as: {cs["cross-listed"]?.join(", ")}</div>}
           
    </div>;
  }

export default CheckCourse;