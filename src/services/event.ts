// FIX: Add correct type to event
const createEvent = (event: unknown) => {
  console.log('create event fired')
}

const findEventById = async (eventId: string) => {
  console.log('find by ID fired for id: ', eventId)
}

const findAllEvents = () => {
  console.log('find all events fired')
}

const updateEvent = async (eventId: string, update: string) => {
  console.log(
    'Update event fired for id: ',
    eventId,
    'update(should be changed from string): ',
    update
  )
}

const deleteEvent = (eventId: string) => {
  console.log('Delete event fired for id: ', eventId)
}

export default {
  createEvent,
  findEventById,
  findAllEvents,
  updateEvent,
  deleteEvent
}
