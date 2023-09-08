import courses_data from '@/public/courses.json'
import TheCourse from './TheCourse';
import { Course } from '@/app/interfaces';

interface coursesProps{
    theSearch: string
    filts: boolean[]
    scs: (val:Course) => void
    cart: Course[]
    dcs: (val:number) => void
}

const Courses:React.FC<coursesProps> = ({theSearch, filts, scs, cart, dcs}) => {

  const courses:Course[] = courses_data

  const filtCourse = courses.filter(function(entry){



    return (theSearch === ""|| theSearch === " " 
    || (/*typeof theSearch === 'string' && */(entry.dept.toLowerCase().includes(theSearch.toLowerCase()) ||
    entry.description.toLowerCase().includes(theSearch.toLowerCase()) ||
    entry.title.toLowerCase().includes(theSearch.toLowerCase()) ||
    (entry.dept.toLowerCase() + " " + entry.number.toString()).includes(theSearch.toString().toLowerCase())) ))&&
   ((filts[0]&& entry.number >= 100 && entry.number < 200 )
    || (filts[1] && entry.number >= 200 && entry.number <300)
    || (filts[2] && entry.number >= 300 && entry.number < 400) 
    || (filts[3] && entry.number >= 400 && entry.number < 500)
    );

  })

  return (<div className = "ml-[10px] mt-[10px] cursor-pointer">
    {filtCourse.map((value) => (

      <TheCourse cs = {value} scs = {scs} dcs = {dcs} inCart = {(cart.map((a) => a.number)).includes(value.number)} limit = {cart.length <= 7} />
      
    ))}
  </div>);
}

export default Courses;