import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Adminsidbar from '../Sidbar/Adminsidbar';
import moment from 'moment';
import 'moment/locale/fr'; // Importez la locale française pour moment
import './calendrier.css';

function Calendrier() {
  moment.locale('fr'); // Définir la locale française pour moment
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

  const formats = {
    dayFormat: 'D', // Jour du mois
    monthHeaderFormat: 'MMMM YYYY', // Mois et année
    dayHeaderFormat: 'ddd', // Jour de la semaine
    agendaDateFormat: 'ddd D MMM YYYY', // Agenda: jour, mois, année
    agendaTimeFormat: 'HH:mm', // Heure de l'agenda
    agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
      `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
  };
  
  const messages = {
    allDay: 'Toute la journée',
    previous: 'Précédent',
    next: 'Suivant',
    today: 'Aujourd\'hui',
    month: 'Mois',
    week: 'Semaine',
    day: 'Jour',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Heure',
    event: 'Événement',
    showMore: total => `+ ${total} de plus`,
  };

  const MonthHeader = ({ label }) => {
    return (
      <div className="rbc-month-header">
        <span className="rbc-header-label">{label}</span>
      </div>
    );
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

  const deleteEvents = () => {
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event !== selectEvent);
      setEvents(updatedEvents);
      setShowModal(false);
      setEventTitle('');
      setSelectEvent(null);
    }
  };

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
            formats={formats}
            messages={messages}
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
            components={{
              month: {
                header: MonthHeader, // Utilisez le composant personnalisé pour l'en-tête du mois
              },
            }}
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
