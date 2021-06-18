import React,{useState,useEffect} from 'react'
import logo1 from './netflix1.png'
import logo2 from './netflix2.png'
import './nav.css'

const Navbar = () =>{
    const [show,setShow] = useState(false)

const handleShow = ()=>{
    console.log("set")
    if(window.scrollY > 100){
            setShow(true)
        }
        else{
            setShow(false)
        }
    }

    useEffect(()=>{
       console.log("inside useEffect")
       window.addEventListener("scroll", handleShow)

    //    return () => {
    //        console.log("clear")
    //        window.removeEventListener("scroll", handleShow); 
    //     }
    },[])  // before calling the next effect it will kill the previous effect


    console.log("render");


    return(
        <div className={`navbar ${show && "navbar_black"}`}>
            <img className="logo1" src={logo1} alt="netflix logo"/>
            <img className="logo2" src={logo2} alt="netflix logo"/>
        </div>
    )
}

export default Navbar