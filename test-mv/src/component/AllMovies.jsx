import React , {useState , useEffect} from 'react'
import Star from '../assets/star.png'

const AllMovies = () => {


      
  const [allMovies , setAll] = useState([])

  
  useEffect(()=>{
      fetch("https://api.tvmaze.com/schedule/full")
      .then((res)=> res.json())
      .then((data2=>{
        setAll(data2)
      }))
    })

   

  return (
    <>
         <div className='pt-32 '>
           <h1 className='text-white text-md  mb-8'>All Movies </h1>
            
           <div className='w-full flex-wrap flex text-white items-center justify-center  '>
              {
                allMovies.length != 0 && allMovies.map((mv , index)=>{
                  return(
                    <div key={index} className='w-[220px] m-4 '>
                        <div className='h-[300px] w-full  '>
                          {mv._embedded.show.image && mv._embedded.show.image.medium ? (
                              <img
                                src={mv._embedded.show.image.medium}
                                className='w-full h-full rounded-xl'
                                alt='movie'
                              />
                          ) : (
                              <p>No Image Available</p>
                          )}
                        </div>
                        <h1 className='m-2'>{mv._embedded.show.name}</h1>
                        <div className='flex items-center justify-between px-1'>
                            <div className='flex items-center '>
                                <img src={Star} className="w-6 " alt="" />
                                <p className='mx-1 '>8.6/10</p>
                            </div>
                            <p>126min</p>
                            <span className='border rounded-xl px-2'>PG13</span>
                        </div>
                    </div> 
                  )
                })
              }         
              </div>    
           </div>
    </>
  )
}

export default AllMovies