import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const newGame = Object.assign({}, currentGame)
        newGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGame)
        
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numOfPlayers">Number Of Players: </label>
                    <input type="number" id="numOfPlayers" name="numberOfPlayers" min="1" max="15" 
                    value={currentGame.numberOfPlayers} 
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" id="skillLevel" name="skillLevel" min="1" max="15"
                    value={currentGame.skillLevel}
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" className="form-control"
                        value={currentGame.gameTypeId}
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
            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}