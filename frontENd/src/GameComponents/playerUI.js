import { useState } from "react";

export function PlayerInventory() {
    const [inventory, setInventory] = useState([])

    return (
        <div>
            <p>inventario</p>
        </div>
    )
}

export function PlayerStats() {
    const [stats, setStats] = useState([])

    return (
        <div>
            <p>stats</p>
        </div>
    )
}