import React, {useState} from 'react';
import { PlayerInventory, PlayerStats } from './GameComponents/playerUI';
import { PresentOptions, StoryRender } from './GameComponents/storyAndOptions';


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

export function TitleScreen() {
    
    // logo / imagem
    // nome
    // userCreation

    return (
        <div>
            <UserCreation />
        </div>
    )
}

export function UserCreation() {
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [confirm , setConfirm] = useState('')
    
    return (
        <div>
            <input type='text' placeholder='Insira o seu email' onChange={(e) => setEmail(e.target.value)}></input>
            <input type='password' placeholder='Insira a Password' onChange={(e) => setPass(e.target.value)}></input>
            <input type='password' placeholder='Confira a Password' onChange={(e) => setConfirm(e.target.value)}></input>
        </div>  
    )
    
}


const story = [
    {
        id: 1,
        text: 'parte 1',
        options: [{id: 3, text: '1'}, {id: 2, text: '2'},] 
    }
]



 


