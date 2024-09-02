import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length, setLength] = useState(8);
  const [isNumAllowed, setIsNumAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // adding reference to password field
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklnopqrstuvwxyz";

    if(isNumAllowed) str += "0123456789";

    if(isCharAllowed) str += "!@#$%^&*()_+-=[]{}|;:,.<>/?~";

    for(let i = 1; i <= length; i++) {
      let idx = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(idx);
    }

    setPassword(pass);

  }, [length, isNumAllowed, isCharAllowed, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumAllowed, isCharAllowed, generatePassword])


  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();  
    passwordRef.current?.setSelectionRange(0, 101);

    window.navigator.clipboard.writeText(password);
  }, [password])

  return (  
    <>
    <div className="flex justify-center w-full h-screen bg-zinc-900 text-white">
      <div className="w-[900px] h-36 bg-zinc-700 rounded-3xl relative top-20 px-20 shadow-slate-700 shadow-sm flex justify-center items-center flex-col">
        <h2 className="text-center my-4">Password Generator</h2>
        <div>
          <input type="text" ref={passwordRef} value={password} placeholder="password" readOnly className="w-[650px] h-7 outline-none rounded-md shadow-md py-5 text-black px-5"/>
          <button className="bg-blue-700 px-3 py-2 rounded-md mx-2 hover:bg-blue-600" onClick={copyToClipBoard}>Copy</button>
        </div>
        <div className="flex items-center my-2 justify-center">
          <input type="range" min={8} max={100} value={length} className="cursor-pointer" onChange={(e) => setLength(e.target.value)}/>
          <label className="mx-1">Length: {length}</label>

          <input type="checkbox" defaultChecked={isNumAllowed} id="numberInput" className="mx-5" onChange={() => {
            setIsNumAllowed((prev) => !prev)
          }}/>
          <label htmlFor="numberInput" className="mx-[-15px]">Numbers</label>

          <input type="checkbox" defaultChecked={isCharAllowed} id="charInput" className="mx-7" onChange={() => {
            setIsCharAllowed((prev) => !prev)
          }}/>
          <label htmlFor="charInput" className="mx-[-24px]">Characters</label>
        </div>
      </div>
    </div>  
    </>
  )
}

export default App
