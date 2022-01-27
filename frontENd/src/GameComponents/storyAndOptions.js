import { React } from "react";

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
    return (
        <div>
            <h1>Project Reading Hood</h1>
            <p>Story stuff</p>
        </div>
    )
}