import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Adminsidbar from '../Sidbar/Adminsidbar';
import moment from 'moment';
import 'moment/locale/fr'; // Importez la locale française pour moment
import './calendrier.css';
import axios from 'axios';

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
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: ''
  });
  const [calendrierData, setCalendrierData] = useState([]);
  const [showEventsTable, setShowEventsTable] = useState(false); // Nouvel état pour afficher le tableau des événements

  useEffect(() => {
    fetchData();
  }, []);
  const onsubmitChange = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        titre: eventTitle,
        date: eventStartDate,
        heureDebut: eventStartTime,
        heureFin: eventEndTime
      };
      const response = await axios.post("http://localhost:3001/calendrier", formData);
      console.log(response);
      setLoading(true);
    } catch (err) {
      console.log("quelque chose qui cloche");
    }
  }

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3001/calendrier");
      setCalendrierData(result.data); // Mettre à jour l'état calendrierData avec les données récupérées
      setEvents(result.data); // Mettre à jour l'état events avec les données récupérées
    } catch (err) {
      console.log("Quelque chose ne va pas lors de la récupération des données du calendrier");
    }
  }

  const toggleEventsTable = () => {
    setShowEventsTable(!showEventsTable); // Inverser l'état actuel du tableau des événements
  };

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

  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Calendrier />
  }

  return (
    <>
      <Adminsidbar />
      <div className="main-container">
        <div className="row">
          <div className="rbc-agenda-view">
            {/* Afficher le bouton pour basculer entre le calendrier et le tableau des événements */}
            <button onClick={toggleEventsTable} style={{ backgroundColor: 'rgba(121, 21, 99, 0.671)' }}>
              {showEventsTable ? 'Calendrier' : 'Agenda'}
            </button>

            {/* Afficher le tableau des événements si showEventsTable est true */}
            {showEventsTable && (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Date</th>
                    <th>Heure début</th>
                    <th>Heure fin</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={index}>
                      <td>{event.titre}</td>
                      <td>{event.date}</td>
                      <td>{event.heureDebut}</td>
                      <td>{event.heureFin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Afficher le calendrier si showEventsTable est false */}
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
                      toolbar.onNavigate('NEXT');                    };
    
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
                          {selectEvent ? 'Modifier l\'événement' : 'Ajouter un événement'}
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
                          value={eventStartDate}
                          name="date"
                          onChange={(e) => {
                            setEventStartDate(e.target.value);
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
                            onClick={deleteEvents}>Supprimer</button>
                        )}
                        <button className="btnEnr" onClick={onsubmitChange}>Enregistrer</button>
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
  
