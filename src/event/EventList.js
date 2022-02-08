import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Link } from "react-router-dom"


export const EventList = () => {
    const [events, setEvents] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (<>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push({ pathname: "/events/new" })
            }}
        >Register New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">Organized by {event.organizer?.bio}</div>
                        <div className="event__players">{event.description}</div>
                        <div className="event__skillLevel">On {event.date} at {event.time}</div>
                        <div>
                        <Link className="nav-link" to={`/events/${event.id}`}>Update event?</Link>
                        </div>
                    </section>
                })
            }
        </article>
    </>
    )
}