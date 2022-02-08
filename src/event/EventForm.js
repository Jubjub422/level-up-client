import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getGames } from '../components/game/GameManager'
import { createEvent } from "./EventManager"


export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        game: 0,
        description: "",
        date: "",
        time: ""
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGames().then(data => setGames(data))
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const newEvent = Object.assign({}, currentEvent)
        newEvent[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(newEvent)
        
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of Event: </label>
                    <input type="date" id="date" name="date" min="2021-04-22" max="2095-01-01"
                    value={currentEvent.date} 
                    onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="time">Time of Event: </label>
                    <input type="time" id="time" name="time" min="12:00" max="01:00"
                    value={currentEvent.skillLevel}
                    onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game" className="form-control"
                        value={currentEvent.game}
                        onChange={changeEventState}>

                        <option value="0">Select a game</option>
                        {
                            games.map(g => (
                                <option key={g.id} value={g.id}>
                                    {g.title}
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

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.game)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}