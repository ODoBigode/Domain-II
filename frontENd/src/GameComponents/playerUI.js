import { useState } from "react";

export function PlayerInventory() {
    const [inventory, setInventory] = useState([])

    var player = {
            items: []
        }

    player.addItem = function(id, amount){
        for(var i = 0 ; i < player.items.length; i++){
            if(player.items[i].id === id){
                player.items[i].amount += amount
                return
            }
        }
        player.items.push({id:id, amount:amount})
    }

    player.hasItem = function(id, amount){
        for(var i = 0 ; i < player.items.length; i++){
            if(player.items[i].id === id){
                return player.items[i].amount >= amount
            }
        }
        return false;
    } 
}

export function PlayerStats() {
    const [stats, setStats] = useState([])

    return (
        <div>
            <p>stats</p>
        </div>
    )
}