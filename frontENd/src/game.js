import React, {useState} from 'react';
import { PlayerInventory, PlayerStats } from './GameComponents/playerUI';
import { PresentOptions, StoryRender } from './GameComponents/storyAndOptions';
import { BrowserRouter, Navigate, useNavigate } from "react-router-dom";
import logo from './GameComponents/logo.svg';
import styles from './GameComponents/GameStyles.module.css';



export function UiRender(){
    const [view, setView] = useState('')


    return(
        <div>
            <UiButton url='' handleClick={() => setView((v) => v === 'inventory' ? '' : 'inventory')}/>
            <UiButton url='' handleClick={() => setView((v) => v === 'stats' ? '' : 'stats')}/>
            {view === 'inventory' && <PlayerInventory />}
            {view === 'stats' && <PlayerStats />}
        </div>
    )
}


function UiButton({url, handleClick}) {
    return (
        <div>
            <button onClick={() => handleClick()}><img src={url}></img></button>
        </div>
    )
}

export function GameRender() {
    return (
        <div>
            <UiRender />
            <StoryRender />
            <PresentOptions options={story[0].options} />
        </div>
    )
}

function UserCreation() {
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [confirm , setConfirm] = useState('')
    let navigate = useNavigate();


    return (
        <form onSubmit={async e =>  {
            e.preventDefault();
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password: pass, passwordConfirmation: confirm })
            })
            if (res.status === 200) {
                navigate("/signup/username")
            }
             
        }}>
            <input type='text' placeholder='Insira o seu email' onChange={(e) => setEmail(e.target.value)}></input>
            <input type='password' placeholder='Insira a Password' onChange={(e) => setPass(e.target.value)}></input>
            <input type='password' placeholder='Confira a Password' onChange={(e) => setConfirm(e.target.value)}></input>
            <input type='submit' ></input>
        </form>  
    )
    
}
export function TitleScreen() {
    
    // logo / imagem
    // nome
    
    return (    
          <div className={styles.Appheader}>
            <div className={styles.logoinicial}>
            <div>
            <img src={logo} className={styles.Applogo} alt="Little Red Reading Hood"  />
            <h1>
            LITTLE RED READING HOOD
            </h1>
            </div>
             <button className={styles.bLogin}>
              LOGIN
            </button>
            <button className={styles.bSignup} onClick={UserCreation}>
              SIGN UP
            </button>
            </div>
    
            <div className={styles.PTEN}>
            <button className={styles.PT}>
              PT
            </button>
    
            <button className={styles.EN}>
              EN
            </button>
    
            </div>
    
    
    
          </div>
      );
}




const story = [
    {
        id: 1,
        text: 'parte 1',
        options: [{id: 3, text: '1'}, {id: 2, text: '2'},] 
    }
]



 


