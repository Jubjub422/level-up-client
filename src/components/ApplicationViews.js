import React from "react"
import { Route } from "react-router-dom"
import { EventList } from "../event/EventList"
import { EventForm } from "../event/EventForm"
import { GameForm } from "./game/GameForm"
import {GameList} from "./game/GameList"
import { UpdateGameForm } from "./game/GameUpdate"
import { UpdateEventForm } from "../event/EventUpdate"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/games/:gameId(\d+)">
                <UpdateGameForm />
            </Route>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path="/events/:eventId(\d+)">
                <UpdateEventForm />
            </Route>
        </main>
    </>
}
