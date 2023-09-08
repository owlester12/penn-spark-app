'use client'
import {ChangeEvent, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import app from '@/app/firebase';
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { Course } from '@/app/interfaces';
import { firedb } from '@/app/firebase';
import { doc, setDoc } from "firebase/firestore"; 



interface navProps{
    setSearch: (val:string) => void
    cart: Course[]
    userid: string
}

const Nav:React.FC<navProps> = ({setSearch, cart, userid}) =>{

  const auth = getAuth(app);
  const router = useRouter();

  const [theInput, setTheInput] = useState<string>('');

  function handleChange(e: ChangeEvent<HTMLInputElement>){
   setTheInput(e.target.value);
  };

  function onSubmitSearch(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setSearch(theInput);

  }

  const signout = () => {
    signOut(auth).then(() => {
        router.push("/");
    }).catch((error) => {
        console.log(error);
  })
  }



  const submitCart = async () => {
    await setDoc(doc(firedb, "cart", userid),{
        cart: cart.map(x => x.number)
    })


  }




  
  
return  (<div className = "w-full p-[0.1rem] pl-[50px] border-b-[1px] bg-[#041d5b] border-gray-100 text-white h-[10vh] flex items-center justify-around m-0">
    <h2>Penn Course Cart</h2>
    <form className = "flex items-center" onSubmit={e => onSubmitSearch(e)}>
    <input className = "min-w-[250px] py-[8px] px-[16px] rounded-l-[8px] border-[1px] border-white text-black"
     type = "text" id = "navInput" onChange={e => handleChange(e)}  />
    <button type = "submit"
     className = "py-[8px] px-[2px] w-[50px] rounded-r-[8px] border-[1px] border-[#9c0404] bg-[#9c0404] text-white"> 
     <SearchIcon/></button>
    </form>
    <Link href = {"/" + userid + "/checkout"}>
    <button className = "border-[1px] border-[#9c0404] bg-[#9c0404] p-[10px] rounded-[8px] text-white items-center text-[15px] font-bold"
    onClick = {submitCart}> Checkout </button>
     </Link>
     <div className = "border-[1px] border-[#9c0404] bg-[#9c0404] p-[10px] rounded-[8px] text-white items-center text-[15px] font-bold cursor-pointer"
      onClick={() => signout() }>
        Sign Out
     </div>
  </div>
  );
}

export default Nav;