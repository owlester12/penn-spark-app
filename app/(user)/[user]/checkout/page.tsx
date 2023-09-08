'use client'
import Nav from '@/components/Nav'
import Filter from '@/components/Filter'
import { useState } from 'react'
import Cart from '@/components/Cart'
import Courses from '@/components/Courses'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import app from '@/app/firebase'
import { useEffect } from 'react'
import { firedb } from '@/app/firebase'
import courses_data from '@/public/courses.json'
import {getDatabase, ref, onValue } from "firebase/database";
import {doc, getDoc } from "firebase/firestore";
import CheckCourse from '@/components/CheckCourse'
import { Course } from '@/app/interfaces'
import Link from 'next/link'
interface cartProps{
    params: {user:string}
  }


const CheckCart:React.FC<cartProps> = ({params}) => {

    const auth = getAuth(app);
    const router = useRouter();
    const [pending, setPending] = useState(true);
    const[cart, setCart] = useState<Course[]>([]);
    const courses:Course[] = courses_data



    useEffect(() =>   {

        onAuthStateChanged(auth, async (userInp) => {
        if (!(userInp && userInp.uid.toString() == params.user) ){
          router.push("/")
         
        }
    else{
        const docRef = doc(firedb, "cart", userInp.uid)
        const docSnap = await  getDoc(docRef) 
        const addData:Course[] = []
        courses.forEach((value) => {
          if(docSnap.get("cart").includes(value.number)){
            addData.push(value);
          }
        })
        console.log(addData);
    
      setCart(addData)
        setPending(false)


    } })
    },[])

    if(pending){
        return <>Loading...</>
      }


    return( 

        <div className = "app">
         <div className = "w-full p-[0.1rem] pl-[50px] border-b-[1px] bg-[#041d5b] border-gray-100 text-white h-[10vh] flex items-center justify-around m-0">
         <h2>Penn Course Cart</h2>
         <Link href= {"/" + params.user}>
             <button className = 'border-[1px] border-[#9c0404] bg-[#9c0404] p-[10px] rounded-[8px] text-white items-center text-[15px] font-bold '> Home </button>
             </Link>
        </div>
         <div className = "flex h-[90vh]">
    
    
    <div className = 'checkout' >
       <h4 className = "checkoutText">Course Cart</h4>
   
       {cart.length <= 1 && <div className = "empty"> Your cart is empty </div> }
   
     
   
       {cart.map((value) => (
   
   <CheckCourse  key = {value.number} cs = {value} />
   
   ))}
     </div>
     </div>
     </div>);
   }
   
   export default CheckCart;