import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { updateGame, getSingleGame, getGameTypes } from './GameManager.js'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"


export const UpdateGameForm = () => {
    const history = useHistory()
    
    const {gameId} = useParams()
    const parsedId = parseInt(gameId)
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [updatedGame, update] = useState({
        
    })

    useEffect(() => {
        getSingleGame(parsedId).then(update)
        getGameTypes().then(data => setGameTypes(data))
        
    }, [])

    const changeGameState = (domEvent) => {
       
        const newGame = Object.assign({}, updatedGame)
        newGame[domEvent.target.name] = domEvent.target.value
        update(newGame)
        
    }

    return (<>
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        defaultValue={updatedGame.title}
                        onChange={changeGameState}
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numOfPlayers">Number Of Players: </label>
                    <input type="number" id="numOfPlayers" name="number_of_players" min="1" max="15" 
                    defaultValue={updatedGame.number_of_players} 
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" id="skillLevel" name="skill_level" min="1" max="15"
                    defaultValue={updatedGame.skill_level}
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        defaultValue={updatedGame.maker}
                        onChange={changeGameState}
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="game-type" className="form-control"
                        value={updatedGame.game_type}
                        onChange={changeGameState}>

                        <option value="0">Select a game Type:</option>
                        {
                            gameTypes.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    
                    const game = {
                        id:updatedGame.id,
                        maker: updatedGame.maker,
                        title: updatedGame.title,
                        number_of_players: parseInt(updatedGame.number_of_players),
                        skill_level: parseInt(updatedGame.skill_level),
                        game_type: parseInt(updatedGame.game_type)
                    }
                    
                    // Send PUT request to your API
                    updateGame(game)
                    .then(() => history.push("/"))
                }}
                className="btn btn-primary">Update Game</button>
        </form>
                </>
    )
}