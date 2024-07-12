import React, { useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa";
import './Todo.css'
import { MdDeleteForever } from "react-icons/md";
export default function Todo() {
    const keystorage="react-todo";
    const [Inputvalue,setInputvalue]=useState("");
    const [Prev, setPrev]=useState(()=>{


        // return []
        const rawdata=localStorage.getItem(keystorage);
        if(rawdata) return JSON.parse(rawdata);
         return [];
        
        //string to jason************by json.parse()
     
    }

    );

    const[dateTime,setdateTime]=useState("");
    const heandleEvent=(event)=>{
          event.preventDefault();

          //check if input value is null then it returns
          if(!Inputvalue)return;

          //checks the input value a;ready presenet in the array or not
         if(Prev.includes(Inputvalue)){
            //now null the inbox for the new input
            setInputvalue("");
            return;
         }
         //otherwise i stores the value in the array,  (prevTask) show any attributes which directly represent the prv of the array
          setPrev((prevTask)=>[...prevTask,Inputvalue])
         

          // AFter thst on clicking enter the value is saved now, now we delete the inbox for the new input
          setInputvalue("");
    }
///useeffect save your data leakage and all time reloading, prevemd datab ore time rendering
   useEffect(()=>{
   const Interval= setInterval(()=>{
        const now=new Date();
        const formatedate=now.toLocaleDateString();
        const formatetime=now.toLocaleTimeString();
    
        setdateTime(`${formatedate} - ${formatetime}`)
    },1000);

return ()=>clearInterval(Interval);

   },[])



   //to delete--------------------------------------
   const handledelete=(currItem)=>{
    //jo currIem k barabar ni hai array ma usko hatadega
    const newdata=Prev.filter((curr)=>curr!=currItem);
    setPrev(newdata);

   }

   //delete all***************************
   const deleteall=()=>{
    setPrev([]);
    setInputvalue("");
   }

   ///To store data********************************imp***stringify makes json to string
   localStorage.setItem(keystorage,JSON.stringify(Prev));
  return (
  <section className='todo-container' >
    <header>
        <h1>Todo Container</h1>
        <h2 className='date-time'>{dateTime}</h2>
    </header>
    <section className='form' >
        <form onSubmit={heandleEvent} >
            <div>
                 {/* on chamge always use when any key press then the value of the final is always updating and adding on it */}
                <input type='text' className='todo-input' autoComplete='off' value={Inputvalue} onChange={(e)=>setInputvalue(e.target.value)}/>
            </div>
            <div>
                <button  type='submit' className='todo-btn'>Add Task</button>
            </div>
        </form>
    </section >

    <section className='myUnOderList' >
      <ul className='todo-list ' style={{listStyle:'-moz-initial'}}>
        {
            Prev.map((currItem,index)=>{
                return(
                    <li key={index} className='todo-item'>
                        <span>
                            {currItem}

                        </span>
                        <button  ><FaCheck className='check-btn' /></button>
                        <button  onClick={()=>handledelete(currItem)}><MdDeleteForever className='delete-btn'  /></button>
                    </li>
                );
            })
        }
      </ul>

    </section>
    <div>
    <button className='clear-btn' onClick={deleteall}>Clear All</button></div>
  </section>
  );
}
