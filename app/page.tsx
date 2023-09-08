'use client'
import {useState} from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';
import app from './firebase';
import Link from 'next/link';

const page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(app);
    const router = useRouter();
    const [error, setError] = useState("")


    const onClick = (event:any) => {
        event.preventDefault();
        handleSignUp();

    }

    const handleSignUp = async () =>
    await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    setError("")

    // Signed in 
    const user = userCredential.user;
    router.push("/"+user.uid.toString())
    
    // ...
  })
  .catch((error) => {
    setError(error.code + " " + error.message);

    // ..
  });
  return (
    <div className = "bg-[#041d5b] h-[100vh]">
    <h1 className = "text-center pt-[10vh] text-white text-6xl font-bold pb-[10vh]">Penn Course Cart</h1>

      <form onSubmit={onClick} className = "flex flex-col items-center relative gap-y-[3vh]">
      <h1 className = "text-center text-white text-3xl font-bold ">Sign up</h1>

        <label className = "text-white mb-[10px] text-[30px]">
          Email
          <input className = "text-black block min-w-[250px] px-[16px] py-[8px] rounded-full text-[20px] "
          name="email" type="email" placeholder="Email" onChange = {(e) => setEmail(e.target.value)} />
        </label>
        <label className = "text-white mb-[10px] text-[30px]">
          Password
          <input  className = "text-black block min-w-[250px] px-[16px] py-[8px] rounded-full text-[20px] "
           name="password" type="password" placeholder="Password" onChange = {(e) => setPassword(e.target.value)}  />
        </label>
        <button className = "border-[1px] border-[#9c0404] bg-[#9c0404] p-[10px] rounded-[8px] text-white items-center text-[15px] font-bold cursor-pointer"
         type="submit">Sign Up</button>
      </form>
      {error &&
      <div className = "text-center font-[15px] underline text-red-300 pt-[2vh]">
        {error}
        </div>

      }
      <Link href = "/login">
      <div className = "underline text-white text-center pt-[2vh]">Go to Log In </div>
      </Link>
    </div>
  );
}

export default page