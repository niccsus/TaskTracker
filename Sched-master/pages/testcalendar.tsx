"use client"
import React from "react"
import Select from "react-select"
import {CSSProperties } from 'react';
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg} from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useForm } from 'react-hook-form';
import { useState, useEffect, Fragment } from "react"
import {Dialog, Transition} from '@headlessui/react'
import {CheckIcon, ExclamationTriangleIcon} from '@heroicons/react/20/solid'
import { EventSourceInput } from "@fullcalendar/core"
import { RankOption, rankOptions, FlightOption, flightOptions, TeamOption, teamOptions, WCOption, wcOptions, GroupedOption, groupedOptions} from "../data/participants"
import { formatGroupLabel } from "../components/participants"



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

    const[Participants, setParticipants] = useState([
        ''
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
            start: null,
            allDay: false,
            id:0
        })
        setShowDelteModal(false)
        setIdToDelete(null)
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>{
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
                         drop= {(data:any) => addEventListener(data) }
                         eventClick={(data) => handleDeleteModal(data)}
                    />
                    


                </div>

            </div>

                        <Transition.Root show ={showDeleteModal} as={Fragment}>
                        <Dialog as="div" className="tw-relative tw-z-10" onClose={setShowDelteModal}>
                            <Transition.Child
                                as = {Fragment}
                                enter = "tw-ease-out tw-duration-300"
                                enterFrom = "tw-opacity-0"
                                enterTo="tw-opacity-100"
                                leave="tw-ease-in tw-duration-200"
                                leaveFrom="tw-opacity-100"
                                leaveTo="tw-opacity-0"
                            >
                               <div className="tw-fixed tw-inset-0 tw-bg-gray-500 tw-bg-opacity-75 tw-transition-opacity"/>

                            </Transition.Child>

                            <div className="tw-fixed tw-inset-0 tw-z-10 tw-overflow-y-auto">
                                <div className="tw-flex min-h-full tw-items-end tw-justify-center tw-p-4 tw-text-center sm:tw-items-center sm: tw-p-0">
                                    <Transition.Child
                                        as = {Fragment}
                                        enter= "tw-ease-out tw-duration-300"
                                        enterFrom = "tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
                                        enterTo="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
                                        leave="tw-ease-in tw-duration-200"
                                        leaveFrom="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
                                        leaveTo="tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
                                    >
                                        <Dialog.Panel className = "tw-drelative tw-transform tw-overflow-hidden tw-rounded-lg tw-bg-white tw-text-left tw-shadow-xl tw-transition-all sm:tw-my-8 sm:tw-w-full sm:tw-max-w-lg">
                                            <div className="tw-bg-white tw-px-4 tw-pb-4 tw-pt-5 sm:tw-p-6 sm:tw-pb-4">
                                                <div className="sm:tw-flex sm:tw-items-start">
                                                    <div className="tw-mx-auto tw-flex tw-h-12 tw-w-12 tw-flex-shrink-0 tw-items-center tw-justify-center tw-rounded-full tw-bg-red-100 sm:tw-mx-0 sm:tw-h-10 sm:tw-w-10">
                                                        <ExclamationTriangleIcon className="tw-h-6 tw-w-6 tw-text-red-600" aria-hidden="true"/>
                                                    </div>
                                                    <div className="tw-mt-3 tw-text-center sm:tw-ml-4 sm:tw-mt-0 sm:tw-text-left">
                                                        <Dialog.Title as="h3" className="tw-text-base tw-font-semibold tw-leading-6 tw-text-gray-900">
                                                            DeleteEvent
                                                        </Dialog.Title>
                                                        <div className="tw-mt-2">
                                                            <p className="tw-text-sm tw-text-gray-500">
                                                                Are you sure you want to delete this event?
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                            <div className="tw-bg-gray-50 tw-px-4 tw-py-3 sm:tw-flex sm:tw-flex-row-reverse sm:tw-px-6">
                                                <button type="button" className="tw-inline-flex tw-w-full tw-justify-center tw-rounded-md tw-bg-red-600 tw-px-3 tw-py-2 tw-text-sm 
                                                tw-font-semibold tw-text-white tw-shadow-sm hover:tw-bg-red-500 sm:tw-ml-3 sm:tw-w-auto" onClick={handleDelete}>
                                                    Delete
                                                </button>
                                                <button type = "button" className="tw-mt-3 tw-inline-flex tw-w-full tw-justify-center tw-rounded-md tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-font-semibold tw-text-gray-900 
                                                tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 hover:tw-bg-gray-50 sm:tw-mt-0 sm:tw-w-auto" onClick={handleCloseModal}>
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
                                        <Dialog as="div" className="tw-relative z-10" onClose={setShowModal}>
                                            <Transition.Child 
                                                as={Fragment}
                                                enter="tw-ease-out tw-duration-300"
                                                enterFrom="tw-opacity-0"
                                                enterTo="tw-opacity-100"
                                                leave="tw-ease-in tw-duration-200"
                                                leaveFrom="tw-opacity-100"
                                                leaveTo="tw-opacity-0"
                                            >
                                                <div className = "tw-fixed tw-inset-0 tw-bg-gray-500 tw-bg-opacity-75 tw-transition-opacity"/>
                                            </Transition.Child>

                                            <div className="tw-fixed tw-inset-0 tw-z-10 tw-overflow-y-auto">
                                                <div className="tw-flex tw-min-h-full tw-items-end tw-justify-center tw-p-4 tw-text-center sm:tw-items-center sm:tw-p-0">
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter="tw-ease-out tw-duration-300"
                                                        enterFrom="tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
                                                        enterTo="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
                                                        leave="tw-ease-in tw-duration-200"
                                                        leaveFrom="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
                                                        leaveTo="tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
                                                    >
                                                        <Dialog.Panel className="tw-relative tw-transform tw-overflow-hidden tw-rounded-lg tw-bg-white tw-px-4 tw-pb-4 tw-pt-5 tw-text-left tw-shadow-xl tw-transition-all sm:tw-my-8 sm:tw-w-full sm:tw-max-w-lg sm:tw-p-6">
                                                            <div>
                                                                <div className="tw-mx-auto tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-full tw-bg-green-100">
                                                                    <CheckIcon className="tw-h-6 tw-w-6 tw-text-green-600" aria-hidden="true" />
                                                                </div>
                                                                <div className="tw-mt-3 tw-text-center sm:tw-mt-5">
                                                                    <Dialog.Title as = "h3" className="tw-dtext-base tw-font-semibold tw-leading-6 tw-text-gray-900">
                                                                        Add Event
                                                                    </Dialog.Title>
                                                                    <form action="submit" onSubmit={handleSubmit}>
                                                                        <div className="tw-mt-2 ">
                                                                            <input type="text" name="title" className="tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 
                                                                            tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 
                                                                            focus:tw-ring-2 
                                                                            focus:tw-ring-inset focus:tw-ring-violet-600 
                                                                            sm:tw-text-sm sm:tw-leading-6" value={newEvent.title} onChange={(e) => handleTitleChange(e)} placeholder="Title" />

                                                                            <div className="tw-grid tw-gap-6 tw-mb-4 md: tw-grid-cols-2">
                                                                                <div>
                                                                                <label htmlFor="start" className="tw-block  tw-text-left tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">From</label>
                                                                                <input type="date" id="start" name="start" className="tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 
                                                                                 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 
                                                                                 focus:tw-ring-2 
                                                                                 focus:tw-ring-inset focus:tw-ring-violet-600 
                                                                                 sm:tw-text-sm sm:tw-leading-6" />
                                                                                </div>
                                                                                <div>
                                                                                    <input type="time" id="start_time" name="start_time" className="tw-block tw-w-full tw-rounded-md tw-border-0  tw-mt-5 tw-py-1.5 tw-text-gray-900 
                                                                                    tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 
                                                                                    focus:tw-ring-2 
                                                                                    focus:tw-ring-inset focus:tw-ring-violet-600 
                                                                                    sm:tw-text-sm sm:tw-leading-6" />
                                                                                </div>

                                                                                <div>

                                                                                <label htmlFor="End" className="tw-block  tw-text-left tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">To</label>
                                                                                <input type="date" id="End" name="End" className="tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 
                                                                                 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 
                                                                                 focus:tw-ring-2 
                                                                                 focus:tw-ring-inset focus:tw-ring-violet-600 
                                                                                 sm:tw-text-sm sm:tw-leading-6" />
                                                                                </div>

                                                                                <div>
                                                                                    <input type="time" id="end_time" name="end_time" className="tw-block tw-w-full tw-rounded-md tw-border-0  tw-mt-5 tw-py-1.5 tw-text-gray-900 
                                                                                    tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 
                                                                                    focus:tw-ring-2 
                                                                                    focus:tw-ring-inset focus:tw-ring-violet-600 
                                                                                    sm:tw-text-sm sm:tw-leading-6" />
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div>
                                                                            <label htmlFor="location" className="tw-block  tw-text-left tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Location</label>
                                                                            <select name="Location" id="location" className="tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900
                                                                            tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400
                                                                            focus:tw-ring-2
                                                                            focus:tw-ring-inset focus:tw-ring-violet-600
                                                                            sm:tw-text-sm sm:tw-leading-6"  placeholder="Location">
                                                                                <option value = "cafeteria">Cafeteria</option>
                                                                                <option value = "main office">Main Office</option>
                                                                                <option value = "the oasis">The Oasis</option>
                                                                            </select>
                                                                            </div>

                                                                            <div>
                                                                            <label htmlFor="report to" className="tw-block  tw-text-left tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Report To</label>
                                                                            <select name="report to" id="report to" className="tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900
                                                                            tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400
                                                                            focus:tw-ring-2
                                                                            focus:tw-ring-inset focus:tw-ring-violet-600
                                                                            sm:tw-text-sm sm:tw-leading-6"  placeholder="Location">
                                                                                <option value = "Person1">Person1</option>
                                                                                <option value = "Person2">Person2</option>
                                                                                <option value = "Person3">Person3</option>
                                                                            </select>
                                                                            </div>
                                                                            <label htmlFor="participants" className="tw-block  tw-text-left tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Participants</label>
                                                                            <Select <RankOption | FlightOption | TeamOption | WCOption, true, GroupedOption>
                                                                                isMulti
                                                                                defaultValue={rankOptions[0]} 
                                                                                options={groupedOptions}
                                                                                formatGroupLabel={formatGroupLabel}
                                                                            />
                                                                            <div>
                                                                            <label htmlFor="description" className="tw-block  tw-text-left tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Description</label> 
                                                                            <textarea name="postContent" rows={4} cols={40} className="tw-block tw-p-2.5 tw-w-full tw-text-sm tw-text-gray-900 tw-bg-gray-50 tw-rounded-lg tw-border tw-border-gray-300 focus:tw-ring-blue-500 focus:tw-border-blue-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:tw-focus:ring-blue-500 dark:tw-focus:tw-border-blue-500" />  
                                                                                
                                                                            </div>




                                                                        </div>
                                                                        <div className="tw-mt-5 sm:tw-mt-6 sm:tw-grid sm:tw-grid-flow-row-dense sm:tw-grid-cols-2 sm:tw-gap-3">
                                                                            <button type="submit" className="tw-inline-flex tw-w-full tw-justify-center tw-rounded-md tw-bg-violet-600 tw-px-3 tw-py-2 tw-text-sm tw-font-semibold tw-text-white tw-shadow-sm hover:tw-bg-violet-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-violet-600 sm:tw-col-start-2 disabled:tw-opacity-25" 
                                                                            disabled={newEvent.title ===''}>
                                                                                Create
                                                                            </button>
                                                                            <button type="button" className="tw-mt-3 tw-inline-flex tw-w-full tw-justify-center tw-rounded-md tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-font-semibold tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 hover:tw-bg-gray-50 sm:tw-col-start-1 sm:tw-mt-0" onClick={handleCloseModal}>
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