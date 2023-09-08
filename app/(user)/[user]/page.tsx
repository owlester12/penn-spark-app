'use client'
import Nav from '@/components/Nav'
import Filter from '@/components/Filter'
import { useState } from 'react'
import Cart from '@/components/Cart'
import Courses from '@/components/Courses'
import { Course } from '../../interfaces'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import app from '@/app/firebase'
import { useEffect } from 'react'
import { firedb } from '@/app/firebase'
import courses_data from '@/public/courses.json'
import {doc, getDoc } from "firebase/firestore";



interface userProps{
  params: {user:string}
}

interface User{
  uid: string
  cart: number[]
}

const Home:React.FC<userProps> = ({params}) => {
  const courses:Course[] = courses_data


  const auth = getAuth(app);
  const router = useRouter();
  const [pending, setPending] = useState(true);
  const[cart, setCart] = useState<Course[]>([]);

  useEffect(() =>   {

  onAuthStateChanged(auth, async (userInp) => {
  if (!(userInp && userInp.uid.toString() == params.user) ){
    router.push("/")
   
    
    // User is signed out
    // ...
  } else {

    const docRef = doc(firedb, "cart", userInp.uid)
    const docSnap = await  getDoc(docRef) 
    const addData:Course[] = []
    const userCart = docSnap.get("cart")

    if(userCart == undefined){
      setCart([]);
    } else {
      try{
      
      
    courses.forEach((value) => {
      if(userCart.includes(value.number)){
        addData.push(value);
      }
    })

  setCart(addData)
      } catch(error){
        setCart([]);
      }
    }
   
    setPending(false)
  }
});
  }, [])



  const [search, setSearch] = useState(" ");
  const [filt, setFilt] = useState([true, true, true, true]);
  
  function handleSearch(inp: string){
    setSearch(inp);
  };

    function addCart(inp : Course){
        setCart([inp, ...cart]);
      }
    
      function delCart(inp : number){
        setCart(cart.filter(function(entry){
          return entry.number != inp
    
    
        }));
      }

  if(pending){
        return <>Loading...</>
      }




  return (
    <div className = "app">
    <div className = "nav">
    <Nav setSearch = {handleSearch} cart = {cart} userid = {params.user}/>
    </div>
    <div className = "flex h-[90vh]">
        <div className = "flex-[0.3] sticky overflow-y-scroll p-[3px] ml-[10px] border-r-[1px] border-black border-opacity-10">
        <Filter f = {filt} s = {setFilt}   />
        <Cart acs = {cart} dcs = {delCart} />

        </div>
        <div className = "flex flex-[0.7] flex-col overflow-y-scroll">
        <Courses  theSearch = {search} filts = {filt} scs = {addCart} cart = {cart} dcs = {delCart}/>

        </div>
        </div>
    </div>
  )
}
export default Home;
