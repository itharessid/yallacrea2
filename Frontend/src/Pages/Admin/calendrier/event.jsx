import React from 'react';

export const MOCK_EVENTS = [
  {
    id: 1,
    title: "Événement 1",
    start: new Date("2024/02/29T08:31:38Z"),
    end: new Date("2024/03/01T18:15:58Z"),
    description:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    color: "#C97D60",
  },
  {
    id: 2,
    title: "Événement 2",
    start: new Date("2024/03/15T13:30:02Z"),
    end: new Date("2024/03/16T17:30:20Z"),
    description:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    color: "green",
  },
];

const EventComponent = () => {
  return (
    <div>
      {MOCK_EVENTS.map(event => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p><strong>Début :</strong> {event.start.toString()}</p>
          <p><strong>Fin :</strong> {event.end.toString()}</p>
          <p><strong>Description :</strong> {event.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default EventComponent;
