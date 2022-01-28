import React, {useState} from 'react';

export function PresentOptions({options}){
    return <div>
        {
            options.map((e) => (
            <button>{e.text}</button>
            ))
        }   
        
    </div>
}

export function StoryRender() {
    const [histo, setHisto] = useState('')

    
    return (
        <div>
            <h1>Project Reading Hood</h1>
            <p>{histo}</p>
        </div>
    )
}