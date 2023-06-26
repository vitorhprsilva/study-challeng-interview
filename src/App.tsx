import React, {useEffect, useState} from 'react';
import './App.css';

interface Position {
    positionX: number,
    positionY: number
}

function App() {

    const [positions, setPosition] = useState<Position[]>([]);
    const [positionsUndo, setPositionUndo] = useState<Position[]>([]);

    const handleShowPoint = (event: React.MouseEvent<HTMLDivElement>): void => {
        let positionAtual: Position = {positionX: event.clientX, positionY: event.clientY}
        setPosition([...positions, positionAtual])
    }

    const Dot = ({positionY, positionX}: Position) => {
        return <div className='dot' style={{position: "absolute",top: `${positionY}px`, left: `${positionX}px`}} />
    }

    const undoClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation()
        const positionToUndo = positions?.at(positions.length-1)
        if(positionToUndo) {
            const {positionX, positionY} = positionToUndo
            setPositionUndo([...positionsUndo, {positionX, positionY}]);
            positions.pop()
        }
    }

    const redoClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation()
        const positionToRedo = positionsUndo?.at(positionsUndo.length-1)
        if(positionToRedo) {
            const {positionX, positionY} = positionToRedo
            setPosition([...positions, {positionX, positionY}]);
            positionsUndo.pop()
        }
    }

    const Footer = () => {
        return(
            <div className="footer">
                <button className="btn undo" onClick={(e) => undoClick(e)}>
                    <img src="./assets/arrow-rotate-left.svg" alt="undo svg"/>
                    undo
                </button>
                <button className="btn redo" onClick={(e) => redoClick(e)}>redo</button>
            </div>
        )
    }

      return (
        <div className="page" onClick={(e) => handleShowPoint(e)} >
                {
                    positions.map((position, index) => {
                        return(
                            <Dot key={index} positionX={position.positionX} positionY={position.positionY} />
                        )
                    })
                }
            <Footer />
        </div>
      );
}

export default App;
