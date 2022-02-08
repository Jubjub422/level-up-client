import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getGames } from "../components/game/GameManager"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getSingleEvent, updateEvent } from "./EventManager"


export const UpdateEventForm = () => {
    const history = useHistory()
    
    const {eventId} = useParams()
    const parsedId = parseInt(eventId)
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [updatedEvent, update] = useState({
        
    })

    useEffect(() => {
        getSingleEvent(parsedId).then(update)
        getGames().then(setGames)
        
    }, [])

    const changeEventState = (domEvent) => {
       
        const newEvent = Object.assign({}, updatedEvent)
        newEvent[domEvent.target.name] = domEvent.target.value
        update(newEvent)
        
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        defaultValue={updatedEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of Event: </label>
                    <input type="date" id="date" name="date" min="2021-04-22" max="2095-01-01"
                    defaultValue={updatedEvent.date} 
                    onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="time">Time of Event: </label>
                    <input type="time" id="time" name="time" min="12:00" max="01:00"
                    defaultValue={updatedEvent.time}
                    onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game" className="form-control"
                        value={updatedEvent.game}
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
            

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        id: updatedEvent.id,
                        description: updatedEvent.description,
                        date: updatedEvent.date,
                        time: updatedEvent.time,
                        game: parseInt(updatedEvent.game)
                    }

                    // Send POST request to your API
                    updateEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}