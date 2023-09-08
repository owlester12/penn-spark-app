import InCourse from "./InCourse";
import { Course } from "@/app/interfaces";

interface cartProps{
    acs: Course[]
    dcs: (val:number) => void
}

const Cart:React.FC<cartProps> = ({acs, dcs}) =>{


    return( <div className = 'border-b-[1px] border-black border-opacity-10' >
       <h4 className = "cartText">Course Cart</h4>
   
       {acs.length == 0 && <div className = "empty"> Your cart is empty </div> }
   
     
   
   
       {acs?.filter(function(entry){return entry.number !== 0}).map((value) => (
   
   
   <InCourse  key = {value.number} cs = {value} dcs = {dcs} />
   
   ))}
     </div>);
   }
   
   export default Cart;
   