import { useCallback, useEffect, useState, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const[numberAllowed, setnumberAllowed] =useState(false)
  const[charAllowed, setcharAllowed] =useState(false)
  const[password, setpassword] =useState("")

  const passwordRef =useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed)str+="0123456789"
    if(charAllowed) str+="!@#$%^&*-_+=[]{}~`"
    for(let i=0; i<length; i++)
      {
        let char = Math.floor(Math.random()*str.length +1)
        pass += str.charAt(char)
      }

    setpassword(pass)
  },
  [length, numberAllowed, charAllowed,setpassword])

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    //passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()    
  },[length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-xl px-4 py-8 my-20 text-orange-500 bg-gray-500'>
      <h1 className='text-white text-center pb-5 text-xl'>Password Generator</h1>

      <div className='flex shadow rounded-xl overflow-hidden mb-4'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder= "Password" readOnly
        ref ={passwordRef}
        ></input>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' 
        onClick={copyPassword}
        >copy</button>
      </div>

      <div className=' flex text-sm gap-x-2'>
        <div className='flex items-center gzp-x-1'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          ></input>
          <label>
            Length:{length}
          </label>
        </div>


        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox' defaultChecked={numberAllowed} id='numberInput'
          onChange={()=>{setnumberAllowed((prev)=>!prev);
          }}
          ></input>
          <label htmlFor='numberInput'>Number</label>
        </div>


        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox' defaultChecked={charAllowed} id='charInput'
          onChange={()=>{setcharAllowed((prev)=>!prev);
          }}
          ></input>
          <label htmlFor='charInput'>Character</label>
        </div>

      </div>
    </div>
    </>
  )
}

export default App
