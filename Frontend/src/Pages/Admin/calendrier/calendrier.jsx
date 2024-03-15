import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Adminsidbar from '../Sidbar/Adminsidbar';
import moment from 'moment'; // Importez la locale française pour moment
import './calendrier.css'; // Assurez-vous d'avoir les styles CSS nécessaires

function Calendrier() {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [selectEvent, setSelectEvent] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };

  const handleSelectedEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
  };

  const saveEvent = () => {
    if (eventTitle && selectedDate) {
      if (selectEvent) {
        const updatedEvent = { ...selectEvent, title: eventTitle };
        const updatedEvents = events.map((event) =>
          event === selectEvent ? updatedEvent : event
        );
        setEvents(updatedEvents);
      } else {
        const newEvent = {
          title: eventTitle,
          start: selectedDate,
          end: moment(selectedDate).add(1, 'hours').toDate(),
        };
        setEvents([...events, newEvent]);
      }
      setShowModal(false);
      setEventTitle('');
      setSelectEvent(null);
    }
  };
  const deleteEvents=()=>{
    if(selectEvent){
      const updatedEvents=events.filter((event)=>event !== selectEvent);
      setEvents(updatedEvents);
      setShowModal(false);
      setEventTitle('');
      setSelectEvent(null);
    }
  }
  const closeModal = () => {
    setShowModal(false);
    setEventTitle('');
    setSelectEvent(null);
  };

  return (
    <>
      <Adminsidbar />
      <div className="main-container">
        <div className="row">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{
              height: 800,
              width: 950,
            }}
            selectable={true}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectedEvent}
          />
          {showModal && (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {selectEvent ? 'Modifier l\'événement' : 'Ajouter un événement'}
                    </h5>
                    <button className="btnCloture" onClick={closeModal}>Fermer</button>
                  </div>
                  <div className="modal-body">
                    <label>Titre</label>
                    <input className='form-control' id="eventTitle" type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                  </div>
                  <div className="modal-footer">
                    {selectEvent && (
                      <button
                      type="button"
                      className="btnSupp"
                      onClick={deleteEvents}>Supprimer</button>
                    )}
                    <button className="btnEnr" onClick={saveEvent}>Enregistrer</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Calendrier;
