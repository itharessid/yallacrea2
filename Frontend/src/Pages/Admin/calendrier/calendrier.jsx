import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { MOCK_EVENTS } from './event'; 
import Adminsidbar from '../Sidbar/Adminsidbar';

const localizer = momentLocalizer(moment);

function Calendrier() {
  const formats = {
    agendaDateFormat: (date, culture, localizer) =>
      localizer.format(date, 'DD/MM/YYYY', culture), 
  };

  return (
    <>
      <Adminsidbar/>
      <div className="main-container">
        <div className="row">
          <div className="Calendrier" style={{ padding: '14px' }}>
            <Calendar
              localizer={localizer}
              startAccessor="start"
              events={MOCK_EVENTS} // Utiliser directement MOCK_EVENTS
              endAccessor="end"
              style={{ height: '1000px' }}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.color,
                },
              })}
              onSelectEvent={(event) => alert(event.title)}
              views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
              formats={formats}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Calendrier;
