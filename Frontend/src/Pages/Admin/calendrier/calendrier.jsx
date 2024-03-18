import React, { useState, useEffect } from 'react';
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
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [selectEvent, setSelectEvent] = useState(null);
  const [view, setView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date()); // État pour suivre la date actuelle

  // Effet pour filtrer les événements en fonction de la date sélectionnée
  useEffect(() => {
    if (selectedDate) {
      const filteredEvents = events.filter((event) =>
        moment(event.start).isSame(selectedDate, 'day')
      );
      setEvents(filteredEvents);
    }
  }, [selectedDate]);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };

  const handleSelectedEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
    setEventStartTime(moment(event.start).format('HH:mm'));
    setEventEndTime(moment(event.end).format('HH:mm'));
    setEventStartDate(moment(event.start).format('YYYY-MM-DD'));
  };

  const saveEvent = () => {
    if (eventTitle && eventStartDate && eventStartTime && eventEndTime) {
      const startDateTime = moment(`${eventStartDate}T${eventStartTime}`).toDate();
      const endDateTime = moment(`${eventStartDate}T${eventEndTime}`).toDate(); // Utilisez la date de début pour la date de fin
      
      if (selectEvent) {
        const updatedEvent = { ...selectEvent, title: eventTitle, start: startDateTime, end: endDateTime };
        const updatedEvents = events.map((event) =>
          event === selectEvent ? updatedEvent : event
        );
        setEvents(updatedEvents);
      } else {
        const newEvent = {
          title: eventTitle,
          start: startDateTime,
          end: endDateTime,
        };
        setEvents([...events, newEvent]);
      }
      setShowModal(false);
      setEventTitle('');
      setEventStartTime('');
      setEventEndTime('');
      setEventStartDate('');
      setSelectEvent(null);
    }
  };

  const deleteEvents = () => {
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event !== selectEvent);
      setEvents(updatedEvents);
      setShowModal(false);
      setEventTitle('');
      setEventStartTime('');
      setEventEndTime('');
      setEventStartDate('');
      setSelectEvent(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEventTitle('');
    setEventStartTime('');
    setEventEndTime('');
    setEventStartDate('');
    setSelectEvent(null);
  };

  return (
    <>
      <Adminsidbar />
      <div className="main-container">
        <div className="row">
          <Calendar
            formats={{
              monthHeaderFormat: 'DD MMMM YYYY',
              agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
                `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
            }}
            messages={{
              allDay: 'Toute la journée',
              previous: 'Précédent',
              next: 'Suivant',
              today: "Aujourd'hui",
              month: 'Mois',
              week: 'Semaine',
              day: 'Jour',
              agenda: 'Agenda',
              date: 'Date',
              time: 'Heure',
              event: 'Événement',
              showMore: (total) => `+ ${total} de plus`,
            }}
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
                header: ({ label }) => (
                  <div className="rbc-month-header">
                    <span className="rbc-header-label">{label}</span>
                  </div>
                ),
              },
              toolbar: (toolbar) => {
                const goToBack = () => {
                  toolbar.onNavigate('PREV');
                };

                const goToNext = () => {
                  toolbar.onNavigate('NEXT');
                };

                const goToCurrent = () => {
                  setCurrentDate(new Date()); // Mettre à jour la date actuelle
                  toolbar.onNavigate('TODAY');
                };

                const changeView = (view) => {
                  setView(view);
                };

                const label = () => {
                  const date = moment(currentDate); // Utiliser la date actuelle
                  return (
                    <span className="rbc-toolbar-label">
                      {date.format('DD/MM/YYYY')}
                    </span>
                  );
                };

                return (
                  <div className="rbc-toolbar">
                    <span className="rbc-btn-group">
                      <button type="button" onClick={goToBack}>Précédent</button>
                      <button type="button" onClick={goToCurrent}>Aujourd'hui</button>
                      <button type="button" onClick={goToNext}>Suivant</button>
                      {label()}
                      <button type="button" onClick={() => changeView('month')}>Mois</button>
                      <button type="button" onClick={() => changeView('week')}>Semaine</button>
                      <button type="button" onClick={() => changeView('day')}>Jour</button>
                      <button type="button" onClick={() => changeView('agenda')}>Agenda</button>
                    </span>
                  </div>
                );
              },
            }}
            view={view} // Propriété view pour suivre la vue actuelle
            onView={(newView) => setView(newView)} // Gestionnaire d'événements pour la vue
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
                  <div className="form-group">
                      <label>Titre</label>
                      <input
                        className='form-control'
                        id="eventTitle"
                        type="text"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        className='form-control'
                        id="eventStartDate"
                        type="date"
                        value={eventStartDate}
                        onChange={(e) => setEventStartDate(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Heure de début</label>
                      <input
                        className='form-control'
                        id="eventStartTime"
                        type="time"
                        value={eventStartTime}
                        onChange={(e) => setEventStartTime(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Heure de fin</label>
                      <input
                        className='form-control'
                        id="eventEndTime"
                        type="time"
                        value={eventEndTime}
                        onChange={(e) => setEventEndTime(e.target.value)}
                      />
                    </div>
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
