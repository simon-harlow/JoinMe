import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../Utils/const';
import Button from '../Button/Button';
import EventList from '../EventList/EventList';
import EventsMap from '../EventsMap/EventsMap';
import './AllEvents.scss';

const AllEvents = () => {

  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/events`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // client-side search filter for speed. If in production this would be done server-side with query params etc...
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    event.start_location.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    event.end_location.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    new Date(event.event_time).toLocaleString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false }).includes(searchQuery.trim().toLowerCase()) ||
    event.event_duration.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    event.event_distance.toString().includes(searchQuery.trim().toLowerCase()) ||
    event.intensity_level.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    event.activity_type.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    event.first_name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    event.last_name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  ).sort((a, b) => a.event_time - b.event_time);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClickCreateEvent = () => navigate(`/events/new`)

  const handleClickEvent = (eventId) => {
		navigate(`/events/${eventId}`);
	};

  const toggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'map' : 'list');
  };

  return (
		<main className="all-events">
			<header className="all-events__banner-card">
				<div className="all-events__banner-header">
					<h1 className="all-events__banner-header-title">Events</h1>
				</div>
				<div className="all-events__banner-search-create">
					<form className="all-events__banner-search">
						<input
							className="all-events__banner-search-input"
							type="text"
							placeholder="Search Events by Title, Description, Location, Distance, Date etc..."
							value={searchQuery}
							onChange={handleSearchInputChange}
						/>
					</form>
          <div className="all-events__banner-toggle">
              <Button
              onClick={toggleViewMode}
              text={viewMode === 'list' ? "Toggle Map View" : "Toggle List View"}
              bgColor="#eeeeee"
              textColor="#000000"
            />
          </div>
					<div className="all-events__banner-create">
						<Button
							onClick={handleClickCreateEvent}
							text="Create Event"
						/>
					</div>
				</div>
			</header>
			<div className="all-events__event-card">
				{viewMode === "list" ? (
					<div className="all-events__list">
						{filteredEvents.map((event) => (
							<EventList
								key={event.id}
								event={event}
								handleClickEvent={handleClickEvent}
							/>
						))}
					</div>
				) : (
					<div className="all-events__map">
						<EventsMap
							events={filteredEvents}
							handleClickEvent={handleClickEvent}
						/>
					</div>
				)}
			</div>
		</main>
  );
};

export default AllEvents;