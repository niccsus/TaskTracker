"use client"
import React from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg} from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useState, useEffect, Fragment } from "react"
import {Dialog, Transition} from '@headlessui/react'
import {CheckIcon, ExclamationTriangleIcon} from '@heroicons/react/20/solid'
import { EventSourceInput } from "@fullcalendar/core"



interface Event{
    title: string;
    start: Date | string;
    allDay: boolean;
    id: number;
}

export default function Home(){
    const[events, setEvents] = useState([
        {title: 'event 1' ,id: '1'},
        {title: 'event 2' ,id: '2'},
        {title: 'event 3' ,id: '3'},
        {title: 'event 4' ,id: '4'},
    ])
    const [allEvents, setAllEvents] = useState<Event[]>([])
    const[showModal, setShowModal] = useState(false)
    const[showDeleteModal, setShowDelteModal] = useState(false)
    const[idToDelete, setIdToDelete] = useState<number | null>(null)
    const[newEvent, setNewEvent] = useState<Event>({
        title: '',
        start: '',
        allDay: false,
        id: 0
    })

    useEffect(() => {
        let draggableEl = document.getElementById('draggable-el')
        if (draggableEl) {
          new Draggable(draggableEl, {
            itemSelector: ".fc-event",
            eventData: function (eventEl) {
              let title = eventEl.getAttribute("title")
              let id = eventEl.getAttribute("data")
              let start = eventEl.getAttribute("start")
              return { title, id, start }
            }
          })
        }
      }, [])

    function handleDateClick(arg: {date: Date, allDay: boolean}){
        setNewEvent({...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime()})
        setShowModal(true)
    }

    function addEvent(data: DropArg){
        const event = {...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay, id: new Date().getTime()}
        setAllEvents([...allEvents, event])
    }

    function handleDeleteModal(data: {event: {id: string} }){
        setShowDelteModal(true)
        setIdToDelete(Number(data.event.id))
    }

    function handleDelete(){
        setAllEvents(allEvents.filter(event => Number(event.id) !== Number(idToDelete)))
        setShowDelteModal(false)
        setIdToDelete(null)
    }

    function handleCloseModal(){
        setShowModal(false)
        setNewEvent({
            title: '',
            start: '',
            allDay: false,
            id:0
        })
        setShowDelteModal(false)
        setIdToDelete(null)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>{
        setNewEvent({
            ...newEvent,
            title:e.target.value
        })
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setAllEvents([...allEvents, newEvent])
        setShowModal(false)
        setNewEvent({
            title:'',
            start:'',
            allDay:false,
            id: 0
,        })
    }


    return(
        <>
        <main className= "calendar_container">
            <div className = "grid-template-columns: repeat(10, minmax(0, 1fr));">
                <div className = "grid-column: span 8 / span 8;">
                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            interactionPlugin,
                            timeGridPlugin
                        ]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        events={allEvents as EventSourceInput}
                        nowIndicator ={true}
                        editable ={true}
                        droppable ={true}
                        selectable={true}
                        selectMirror={true}
                         dateClick ={handleDateClick}
                         drop= {(data) => addEventListener(data) }
                         eventClick={(data) => handleDeleteModal(data)}
                    />
                    


                </div>

            </div>

                        <Transition.Root show ={showDeleteModal} as={Fragment}>
                        <Dialog as="div" className="delmodal" onClose={setShowDelteModal}>
                            <Transition.Child
                                as = {Fragment}
                                enter = "enter"
                                enterFrom = "enterFrom"
                                enterTo="enterTo"
                                leave="leave"
                                leaveFrom="leaveFrom"
                                leaveTo="leaveTo"
                            >
                               <div className="fade"/>

                            </Transition.Child>

                            <div className="not2">
                                <div className="not1">
                                    <Transition.Child
                                        as = {Fragment}
                                        enter= "enter2"
                                        enterFrom = "enterFrom2"
                                        enterTo="eneterTo2"
                                        leave="leave2"
                                        leaveFrom="leaveFrom2"
                                        leaveTo="leaveTo2"
                                    >
                                        <Dialog.Panel className = "dialogPan">
                                            <div className="dialog1">
                                                <div className="dialog3">
                                                    <div className="dialog2">
                                                        <ExclamationTriangleIcon className="exclamation" aria-hidden="true"/>
                                                    </div>
                                                    <div className="dialog4">
                                                        <Dialog.Title as="h3" className="dialogTitle">
                                                            DeleteEvent
                                                        </Dialog.Title>
                                                        <div className="dialog5">
                                                            <p className="dialog6">
                                                                Are you sure you want to delete this event?
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                            <div className="delbutton">
                                                <button type="button" className="delbutton2" onClick={handleDelete}>
                                                    Delete
                                                </button>
                                                <button type = "button" className="canbutton" onClick={handleCloseModal}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                         </div>
                        </Dialog>
                    </Transition.Root>    
                        

                                    <Transition.Root show ={showModal} as ={Fragment}>
                                        <Dialog as="div" className="d2" onClose={setShowModal}>
                                            <Transition.Child 
                                                as={Fragment}
                                                enter="enter"
                                                enterFrom="enterFrom"
                                                enterTo="enterTo"
                                                leave="leave"
                                                leaveFrom="oleaveFrom"
                                                leaveTo="leaveTo"
                                            >
                                                <div className = "d3"/>
                                            </Transition.Child>

                                            <div className="d4">
                                                <div className="d5">
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter="enter2"
                                                        enterFrom="enterFrom2"
                                                        enterTo="enterTo2"
                                                        leave="leave2"
                                                        leaveFrom="leaveFrom2"
                                                        leaveTo="leaveTo2"
                                                    >
                                                        <Dialog.Panel className="dialogPan2">
                                                            <div>
                                                                <div className="">
                                                                    <CheckIcon className="checkIcon" aria-hidden="true" />
                                                                </div>
                                                                <div className="d7">
                                                                    <Dialog.Title as = "h3" className="dialog7">
                                                                        Add Event
                                                                    </Dialog.Title>
                                                                    <form action="submit" onSubmit={handleSubmit}>
                                                                        <div className="d8">
                                                                            <input type="text" name="title" className="titleinput" value={newEvent.title} onChange={(e) => handleChange(e)} placeholder="Title" />
                                                                        </div>
                                                                        <div className="d9">
                                                                            <button type="submit" className="subbutton" disabled={newEvent.title ===''}>
                                                                                Create
                                                                            </button>
                                                                            <button type="button" className="canclebutton" onClick={handleCloseModal}>
                                                                                Cancle
                                                                            </button>
                                                                        </div>
                                                                    </form>

                                                                </div>
                                                            </div>
                                                        </Dialog.Panel>

                                                    </Transition.Child>
                                                </div>
                                            </div>
                                        </Dialog>
                        </Transition.Root>
        </main>
        </>
    )
}