import React, { useState } from "react";
import styles from "../Game/Game.module.css"; // Import du fichier CSS module

const Game = () => {
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState(null);

    const segments = ["Lot 1", "Lot 2", "Lot 3", "Lot 4", "Lot 5"];

    const spinWheel = () => {
        const randomIndex = Math.floor(Math.random() * segments.length);
        const newRotation = 360 * 5 + randomIndex * (360 / segments.length);
        setRotation(newRotation);
        setTimeout(() => setResult(segments[randomIndex]), 3000);
    };

    return (
        <div className={styles.gameContainer}>
          <center>
          <div className={styles.wheelContainer}>
                <h2>🎡 Jeu-concours Thé Tip Top</h2>
                <div className={styles.wheel} style={{ transform: `rotate(${rotation}deg)` }}>
                    {segments.map((segment, index) => (
                        <div
                            key={index}
                            className={styles.segment}
                            style={{ transform: `rotate(${index * (360 / segments.length)}deg)` }}
                        >
                            {segment}
                        </div>
                    ))}
                </div>
                <button onClick={spinWheel} className={styles.spinButton}>Tourner la Roue</button>
                {result && <p className={styles.result}>Félicitations ! Vous avez gagné : {result}</p>}
            </div>
          </center>
            

          
        </div>
    );
};

export default Game;
