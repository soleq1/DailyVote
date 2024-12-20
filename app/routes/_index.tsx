import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";


export const meta: MetaFunction = () => {
  return [
    { title: "Daily Voting!" },
    { name: "RandomVoting", content: "Welcome to Daily Voting" },
  ];
};

export default function Index() {
  const [DailyVote,setDailyVote] = useState([])
  const [totalVote,setTotalVote] = useState([])
  const [voted,setVoted] = useState(false)
  const likeratio = useRef(0)
  const dislikeratio = useRef(0)
  const [fullvote,setfullvote] = useState(0)
  const fallbackVotes = [
    { id: 1, name: "Fallback Vote 1", likes: 5, dislikes: 2 },
    { id: 2, name: "Fallback Vote 2", likes: 3, dislikes: 1 },
    { id: 3, name: "Fallback Vote 3", likes: 10, dislikes: 4 }
  ];
  const GetVotes = async () =>{
    try{
      // https://votingjava-production.up.railway.app/
      // const data = await fetch('http://localhost:8080/')
      const data = await fetch('https://votingjava-production-a0af.up.railway.app/',{
        method:'GET'
      })

      
     
      
      
      const response = await data.json()
      setDailyVote(response['vote_summary'])
      setTotalVote(response['vote_aggregate'])
      console.log('vote',totalVote)
      
    }catch(e){
      console.log("Failed Fetching Vote",e)
      // setDailyVote(fallbackVotes[1])
    }

  }
  

  useEffect(() =>{
    
   setTimeout(() =>{
     GetVotes()

   },1000)
   
    
  },[])
  useEffect(() =>{
    const eventsource = new EventSource("https://votingjava-production-a0af.up.railway.app/realtime");

    eventsource.onmessage = (event) =>{
      const data = JSON.parse(event.data)
      setTotalVote(data)
    }

    eventsource.onerror =  (error) =>{
      console.log(error, "EVENTSOURCE ERROR")
      eventsource.close();
    }
    return () =>{
      eventsource.close();
    }
  },[])

  useEffect(() =>{
    // console.log("VOTE TOTAL",totalVote)
    if (totalVote && totalVote.total_dislikes >1 ){
      let fullCount =  totalVote?.total_dislikes + totalVote?.total_likes
      if (fullCount > 0){

        likeratio.current = (totalVote?.total_likes / fullCount) * 100
        dislikeratio.current = 100 - likeratio.current

      }
      console.log(`Like Ratio: ${Math.ceil(likeratio.current)} Dislike ratio: ${Math.floor(dislikeratio.current)}`)
      console.log("totalvote loaded", fullvote)
      if (!Number.isNaN(fullvote)){
        setfullvote(fullCount)
      }
    }

  },[totalVote])
  // useEffect(() =>{
  //   if (voted == true){

  //     setfullvote(fullvote + 1)
  //   }
  // },[voted])
  useEffect(() =>{

  },[])
  const handleLikes = async (vote:String) =>{
    console.log(vote)
    setVoted(true)
    const response = await fetch("https://votingjava-production-a0af.up.railway.app/handlevote", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({
        id: DailyVote[0].id,
        vote: vote // assuming vote has an 'action' field for 'like' or 'dislike'
      })
    });


    // const response = await data.json();
    


  }
  
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <div
        className="relative text-center bg-white/10 backdrop-blur-md border border-transparent rounded-md px-24 py-4 z-10 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(255, 255, 255, 0.1)',
        }}
      >
        <p
          style={{
            color: 'white',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          Daily Voting!
        </p>
        <div className="justify-evenly flex gap-4">
        {voted === false ? (
    <>
      <button 
        onClick={() => handleLikes('like')} 
        className="font-kanit bg-black/80 px-5 text-blue-300 outline-1 outline-white"
      >
        Yes
      </button>

      <p>{DailyVote ? DailyVote[0]?.vote || 'Gathering' : 'Gathering'}</p>

      <button 
        onClick={() => handleLikes('dislike')} 
        className="font-kanit bg-black/80 px-5 text-red-300 outline-1 outline-white"
      >
        No
      </button>
    </>
  ) : (
    <>
      <p>{DailyVote ? DailyVote[0]?.vote || 'Gathering' : 'Gathering'}</p>
    </>
  )}

        </div>
        
      <div className="flex w-auto mt-4">
        <div>{totalVote?.total_dislikes || '...'}</div>
          <input
  type="range"
  max={100}
  min={0}
  value={likeratio.current || 0} // Fallback to 0 if likeratio.current is undefined
  disabled
  className="
  appearance-none w-full h-3 rounded-full 
  bg-gray-200 cursor-not-allowed 
  relative overflow-hidden
  [&::-webkit-slider-runnable-track]:rounded-full
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:h-0 [&::-webkit-slider-thumb]:w-0 [&::-webkit-slider-thumb]:cursor-not-allowed
  [&::-moz-range-thumb]:appearance-none
  [&::-moz-range-thumb]:h-0 [&::-moz-range-thumb]:w-0
  "
  style={{
    background: `linear-gradient(
      to right, 
      ${likeratio.current >= dislikeratio.current ? "#4caf50" : "#f44336"} ${likeratio.current || 0}%, 
      #e5e7eb ${likeratio.current || 0}%
      )`,
    }}
/>
<div>{totalVote?.total_likes || "..."}</div>
    </div>
  
      </div>
  
      {/* Total Votes Section */}
      <div className="mt-4 text-center z-50">
        <p className="text-white text-lg font-semibold">Total Votes Casted:</p>
        <p className="text-white text-2xl">{fullvote}</p>
  {voted === true ? <p className="text-gray-100 mt-2">Thanks for voting, come back tomorrow!</p>:<p></p>}
      </div>
    </div>
  );

  
}