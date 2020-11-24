function createEvent(event: any) {
  console.log("create event fired");
}

async function findEventById(eventId: string) {
  console.log("find by ID fired for id: ", eventId);
}

function findAllEvents() {
  console.log("find all events fired");
}

async function updateEvent(
  eventId: string,
  update: string
){
  console.log("Update event fired for id: ", eventId, "update(should be changed from string): ", update);
}

function deleteEvent(eventId: string) {
  console.log("Delete event fired for id: ", eventId);
}

export default {
  createEvent,
  findEventById,
  findAllEvents,
  updateEvent,
  deleteEvent,
};
