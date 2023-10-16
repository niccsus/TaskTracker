"use client"
import React from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg} from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
export default function Home(){
    return(
        <>
        <nav className= "flex justify-between mb-12 border-b border-violet-100 p-4">
            <h1 className= "font-bold text-2x1 text-gray-700">Calendar</h1>

        </nav>
        <main className= "flex min-h-screen flex-col items-center justify-between p-24">
            <div className = "grid grid-cols-10">
                <div className = "col-span-8">
                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            interactionPlugin,
                            timeGridPlugin
                        ]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'resourceTimelineWeek, dayGridMonth, timeGridWeek, timeGridDay'
                        }}
                        events={{}}
                        nowIndicator ={true}
                        editable ={true}
                        droppable ={true}
                        selectable={true}
                        selectMirror={true}
                        // dataClick ={{}}
                        // drop={}
                        // eventClick{}
                    />

                </div>
            </div>
        </main>
        </>
    )
}