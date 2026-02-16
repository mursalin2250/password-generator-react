import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster, toast } from 'sonner';


function App() {
    
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(8);
    const [number, setNumber] = useState(false);
    const [char, setChar] = useState(false);
    
    const generatePassword = useCallback(() => {
        let passwd = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let num = "1234567890";
        let spChar = "(){}[]<>!@#$%^&*_-?";
        
        if(number){
            str += num;
        }
        if(char){
            str += spChar;
        }

        for(let i = 1; i < length; i++) {
            const ch = Math.round(Math.random() * str.length + 1);
            passwd += str.charAt(ch);
        }

        setPassword(passwd);
    }, [length, number, char]);

    useEffect(()=>{
        generatePassword();
    }, [length, number, char]);

    const passwdRef = useRef(null);

    const copyPassword = () => {
        window.navigator.clipboard.writeText(password);
        passwdRef.current.select();
        toast('copied');
    }
    
    return (
        <div className='h-screen px-2 bg-[#121212] flex items-center justify-center'>
            <div className='bg-stone-700 p-6 rounded-xl flex justify-stretch flex-col gap-4'>
                <h1 className='text-2xl font-bold text-white'>Password Generator</h1>
                <div className='flex gap-2'>
                    <input type="text" className='bg-white text-black outline-0 w-full rounded-sm px-3' value={password} readOnly ref={passwdRef} placeholder='Password'/>
                    <Toaster position="bottom-center" duration={1000}/>
                    <button className='px-4 py-2 bg-stone-500 text-white font-bold rounded-sm cursor-pointer' onClick={copyPassword}>Copy</button>
                </div>
                <div className='flex flex-wrap max-w-full gap-3'>
                    <div className='flex items-center gap-1.5'>
                        <input type="range" min={8} max={40} className='cursor-pointer' value={length} onChange={(e) => setLength(e.target.value)}/>
                        <label htmlFor="length" className='text-white'>{length}</label>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <input type="checkbox" className='cursor-pointer' defaultChecked={number} onClick={() => setNumber((value) => !value)}/>
                        <label htmlFor="Number" className='text-white'>Include Numbers</label>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <input type="checkbox" className='cursor-pointer' defaultChecked={char} onClick={() => setChar((value) => !value)}/>
                        <label htmlFor="Character" className='text-white'>Include Special Characters</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
