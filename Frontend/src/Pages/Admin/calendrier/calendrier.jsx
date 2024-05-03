import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Adminsidbar from '../Sidbar/Adminsidbar';
import moment from 'moment';
import 'moment/locale/fr'; // Importez la locale française pour moment
import './calendrier.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

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
  const [calendrierData, setCalendrierData] = useState([]);
  const [showEventsTable, setShowEventsTable] = useState(false); // Nouvel état pour afficher le tableau des événements
  const [loading, setLoading] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false); // Nouvel état pour afficher la modal des détails de l'événement

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3001/calendrier");
      const formattedEvents = result.data.map(event => ({
        ...event,
        start: new Date(event.date), // Assurez-vous que event.date est une chaîne de date au format ISO ou une date valide
        end: new Date(event.date), // Si la durée de l'événement est différente, ajustez la propriété end en conséquence
      }));
      setCalendrierData(formattedEvents);
      setEvents(formattedEvents);
    } catch (err) {
      console.error("Erreur lors de la récupération des données du calendrier :", err);
    }
  };

  const toggleEventsTable = () => {
    setShowEventsTable(!showEventsTable);
  };

  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find(event => event.id === eventId);
    if (eventToEdit) {
      setShowModal(true);
      setSelectEvent(eventToEdit);
      setEventTitle(eventToEdit.titre);
      setEventStartTime(moment(eventToEdit.heureDebut).format('HH:mm'));
      setEventEndTime(moment(eventToEdit.heureFin).format('HH:mm'));
      setEventStartDate(moment(eventToEdit.date).format('DD-MM-YYYY'));
    }
  };

  const handleSelectedEvent = async (event) => {
    try {
      setShowModal(true);
      const eventDetails = await fetchEventData(event.id);
      setSelectEvent(eventDetails);
      setEventTitle(eventDetails.titre);
      setEventStartTime(moment(eventDetails.heureDebut).format('HH:mm'));
      setEventEndTime(moment(eventDetails.heureFin).format('HH:mm'));
      setEventStartDate(moment(eventDetails.date).format('YYYY-MM-DD'));
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'événement :', error);
    }
  };
  
  const fetchEventData = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:3001/calendrier/${eventId}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des détails de l\'événement :', error);
    }
  };
  

  const onsubmitChange = async () => {
    try {
      const eventData = {
        id: selectEvent ? selectEvent.id : null,
        titre: eventTitle,
        date: moment(selectedDate).format('YYYY-MM-DD'),
        heureDebut: eventStartTime,
        heureFin: eventEndTime,
      };

      const eventDateTime = moment(`${eventData.date} ${eventStartTime}`, 'YYYY-MM-DD HH:mm');
      const currentDateTime = moment();
      if (eventDateTime.isBefore(currentDateTime)) {
        alert("Vérifier la date et les heures de l'évènement !");
        return;
      }

      let response;
      if (selectEvent) {
        response = await axios.put(`http://localhost:3001/calendrier/${selectEvent.id}`, eventData);
      } else {
        response = await axios.post('http://localhost:3001/calendrier', eventData);
      }

      if (response && response.status === 200) {
        fetchData();
        closeModal();
      } else {
        console.error('Erreur lors de la création/modification de l\'événement');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour/ajout de l\'événement :', error);
    }
  };

  const formatTime = (timeString) => {
    return moment(timeString, 'HH:mm').format('HH:mm');
  };

  const handleMonthViewClick = (event) => {
    setShowEventDetailsModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
    setEventStartTime(moment(event.start).format('HH:mm'));
    setEventEndTime(moment(event.end).format('HH:mm'));
    setEventStartDate(moment(event.start).format('YYYY-MM-DD'));
  };

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3001/calendrier/${eventId}`);
      const updatedEvents = events.filter((event) => event.id !== eventId);
      setEvents(updatedEvents);
      setShowModal(false);
      setEventTitle('');
      setEventStartTime('');
      setEventEndTime('');
      setEventStartDate('');
      setSelectEvent(null);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement :', error);
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
          <div className="rbc-agenda-view">
            <button onClick={toggleEventsTable} style={{ backgroundColor: 'rgba(121, 21, 99, 0.671)' }}>
              {showEventsTable ? 'Calendrier' : 'Agenda'}
            </button>
            {showEventsTable && (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Date</th>
                    <th>Heure début</th>
                    <th>Heure fin</th>
                    <th>Opérations</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={index}>
                      <td>{event.titre}</td>
                      <td>{moment(event.date).format('DD/MM/YYYY')}</td>
                      <td>{formatTime(event.heureDebut)}</td>
                      <td>{formatTime(event.heureFin)}</td>
                      <td>
                        <button onClick={() => deleteEvent(event.id)}>
                          <FontAwesomeIcon icon={faTrash} style={{ color: 'white' }}/>
                        </button>
                        <button style={{ backgroundColor: "rgba(121, 21, 99, 0.67)" }} onClick={() => handleEditEvent(event.id)}>
                          <FontAwesomeIcon icon={faEdit}style={{ color: 'white' }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!showEventsTable && (
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
                      setCurrentDate(new Date());
                      toolbar.onNavigate('TODAY');
                    };

                    const changeView = (view) => {
                      setView(view);
                    };

                    const label = () => {
                      const date = moment(currentDate);
                      return (
                        <span className="rbc-toolbar-label">
                          {date.format('DD/MM/YYYY')}
                        </span>
                      );
                    };

                    return (
                      <div className="rbc-toolbar">
                        <div className="rbc-btn-group">
                          <button type="button" onClick={goToBack}>Précédent</button>
                          <button type="button" onClick={goToCurrent}>Aujourd'hui</button>
                          <button type="button" onClick={goToNext}>Suivant</button>
                          {label()}
                          <button type="button" onClick={() => changeView('month')}>Mois</button>
                          <button type="button" onClick={() => changeView('week')}>Semaine</button>
                          <button type="button" onClick={() => changeView('day')}>Jour</button>
                        </div>
                      </div>
                    );
                  },
                }}
                view={view}
                onView={(newView) => setView(newView)}
              />
            )}

            {showModal && (
              <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">
                        {selectEvent ? 'Modifier l\'affaire' : 'Ajouter un affaire'}
                      </h5>
                      <button className="btnCloture" onClick={closeModal}>Fermer</button>
                    </div>
                    <div className="form-group">
                      <label>Titre</label>
                      <input
                        className='form-control'
                        id="eventTitle"
                        type="text"
                        name="titre"
                        value={eventTitle}
                        onChange={(e) => {
                          setEventTitle(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        className='form-control'
                        id="eventStartDate"
                        type="date"
                        value={selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : ''}
                        name="date"
                        onChange={(e) => {
                          setSelectedDate(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Heure début</label>
                      <input
                        className='form-control'
                        id="eventStartTime"
                        type="time"
                        name="heureDebut"
                        value={eventStartTime}
                        onChange={(e) => {
                          setEventStartTime(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Heure de fin</label>
                      <input
                        className='form-control'
                        id="eventEndTime"
                        type="time"
                        value={eventEndTime}
                        name="heureFin"
                        onChange={(e) => {
                          setEventEndTime(e.target.value);
                        }}
                      />
                    </div>
                    <div className="modal-footer">
                      {selectEvent && (
                        <button
                          type="button"
                          className="btnSupp"
                          onClick={() => deleteEvent(selectEvent.id)}
                        >
                          Supprimer
                        </button>
                      )}
                      <button className="btnEnr" onClick={onsubmitChange}>
                        Enregistrer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div> 
      </div>
    </>
  );
}

export default Calendrier;
