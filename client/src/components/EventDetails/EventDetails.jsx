import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';

import CommentsForm from '../CommentsForm/CommentsForm';
import { API_URL } from "../Utils/const";
import timeAgoDate from "../Utils/timeAgoDate";
import ActivityIcon from '../Utils/activityIcons';
import GoogleMap from '../../assets/images/google-map-placeholder.PNG';
import DeleteModal from '../DeleteModal/DeleteModal';
import Button from '../Button/Button';
import Delete from '../../assets/icons/web/close.svg';
import './EventDetails.scss'

function EventDetails({ userData }) {

  const { eventId } = useParams();
  const [event, setEvent] = useState([]);
  const [joinedUsers, setJoinedUsers] = useState([]);
  const [loggedInUserEvent, setLoggedInUserEvent] = useState(false);
  const [eventUserData, setEventUserData] = useState("");
  const [commentsData, setCommentsData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const numUsersJoinedEvent = joinedUsers.length;
  const numberOfComments = commentsData.length
  const sortedComments = commentsData.sort((a, b) => b.created_time - a.created_time);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/events/${eventId}`)
      .then(response => {
        setEvent(response.data);
        if (userData && response.data.created_by === userData.id) {
          setLoggedInUserEvent(true);
          setEventUserData(userData);
        } else {
          setLoggedInUserEvent(false);
          const createdByUserID = response.data.created_by
          axios
            .get(`${API_URL}/users/${createdByUserID}`)
            .then(response => {
              setEventUserData(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      })
    axios
      .get(`${API_URL}/events/${eventId}/users`)
      .then(response => {
        setJoinedUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (userData) {
      axios
        .get(`${API_URL}/events/${eventId}/comments`)
        .then((response) => {
          setCommentsData(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [userData, eventId]);

  // handles when a comment is added from CommentsForm
	const addComment = (comment) => {
		axios
      .get(`${API_URL}/events/${eventId}`)
			.then((response) => {
				setCommentsData([...commentsData, comment])
			})
			.catch((error) => console.log(error));
	};

  const deleteComment = (commentId) => {
		axios
      .delete(`${API_URL}/events/${eventId}/comments/${commentId}`)
			.then((result) => {
        setCommentsData(prev => {
          const filteredComments = prev.filter(comment => {
            return comment.id !== commentId;
          });
          return filteredComments;
        });
			})
			.catch((error) => console.log(error));
	};

  const handleJoinLeaveEvent = () => {
    const isJoining = joinedUsers.some(user => user.id === userData.id);
    const deleteURL = `${API_URL}/events/${eventId}/users/${userData.id}`;
    const postURL = `${API_URL}/events/${eventId}/users/`;
  
    if (isJoining) {
      axios
        .delete(deleteURL)
        .then(() => {
          axios.get(`${API_URL}/events/${eventId}/users`)
            .then(response => {
              setJoinedUsers(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios
        .post(postURL)
        .then(() => {
          axios.get(`${API_URL}/events/${eventId}/users`)
            .then(response => {
              setJoinedUsers(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  const handleClickEdit = () => {
    navigate(`/events/edit/${eventId}`)
  }

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCancelClick = () => {
    setShowModal(false);
  };

  const handleConfirmDeleteClick = () => {
    axios.delete(`${API_URL}/events/${eventId}`)
      .then(() => {
        navigate('/events');
      })
      .catch((error) => {
        console.log(error);
      });
    setShowModal(false);
  };

  return (
    <main className="event-details">

      {/* Title Card */}
      <header className="event-details__card event-details__card--title" >
        <div className="event-details__card--title-left">
          <div className="event-details__icon">
            <ActivityIcon activityType={event.activity_type} />
          </div>
        </div>
        <div className="event-details__card--title-right">
          <div className="event-details__header">
            <h1 className="event-details__header-title">{event.title}</h1>
            <p className="event-details__header-desc">{event.description}</p>
          </div>
          <div className="event-details__header-edit-button">
            {loggedInUserEvent && (
              <Button
                onClick={handleClickEdit}
                text="Edit Event"
                bgColor="#eeeeee"
                textColor="#000000"
              />
            )}
            </div>
            <div className="event-details__header-multi-button">
            {!loggedInUserEvent && (
              <Button
                onClick={handleJoinLeaveEvent}
                text={joinedUsers.some(user => user.id === userData.id) ? "Leave Event" : "Join Event"}
              />
            )}
            {loggedInUserEvent && (
              <Button
                onClick={handleDeleteClick}
                text="Delete Event"
              />
            )}
            {showModal && (
              <DeleteModal
              isOpen={showModal}
              onClose={handleCancelClick}
              handleConfirmDeleteClick={handleConfirmDeleteClick}
              handleCancelClick={handleCancelClick}
              >
                <p>Are you sure you want to delete this event?</p>
                <div className="modal__buttons">
                  <Button text="Cancel" bgColor="#eeeeee" textColor="#000000" onClick={handleCancelClick} />
                  <Button text="Delete" onClick={handleConfirmDeleteClick} />
                </div>
              </DeleteModal>
            )}
          </div>
        </div>
      </header>

      {/* Event Details Card */}
      <article className="event-details__card event-details__card--details">
        <div className="event-details__card--details-deets">
          <div className="event-details__card--details-host">
            <div className="event-details__host">
              <h6 className="event-details__host-organized">
                Organized By:
              </h6>
            </div>
            <Link to={`/users/${eventUserData.id}`}>
            <div className="event-details__host-pic">
              <img
                src={eventUserData.avatar_url}
                alt="avatar"
                className="event-details__host-pic-img"
              />
            </div>
            <div className="event-details__host-name">
              <p className="event-details__host-name-text">
                {eventUserData.first_name} {eventUserData.last_name}
              </p>
            </div>
            </Link>
          </div>
          <div className="event-details__card--details-info">
            <div className="event-details__card--details-info-left">
              <div className="event-details__field">
                <h6 className="event-details__field-name">Date & Time:</h6>
                <p className="event-details__field-value">
                  {new Date(event.event_time).toLocaleString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}
                </p>
              </div>
              <div className="event-details__field">
                <h6 className="event-details__field-name">Distance:</h6>
                <p className="event-details__field-value">{event.event_distance} km</p>
              </div>
              <div className="event-details__field">
                <h6 className="event-details__field-name">Duration:</h6>
                <p className="event-details__field-value">{event.event_duration}</p>
              </div>
            </div>
            <div className="event-details__card--details-info-right">
              <div className="event-details__field">
                <h6 className="event-details__field-name">Intensity Level:</h6>
                <p className="event-details__field-value">{event.skill_level}</p>
              </div>
              <div className="event-details__field">
                <h6 className="event-details__field-name">Start Location:</h6>
                <p className="event-details__field-value">{event.start_location}</p>
              </div>
              <div className="events-list__field">
                <h6 className="events-list__field-name">End Location:</h6>
                <p className="events-list__field-value">{event.end_location}</p>
              </div>
            </div>
          </div>
          <div className="event-details__card--details-map">
            {/* This is a placeholder map for visuals.
            In a later phase I would ike to allow the user to add location and pin for start and end locations */}
              <img className="event-details__map" src={GoogleMap} alt="google-map-vancouver"/>
          </div>
        </div>
        <div className="event-details__card--details-joined">
          <div className="event-details__joined">
              <h6 className="event-details__joined-title">{numUsersJoinedEvent} {numUsersJoinedEvent === 1 ? 'Athlete Joined:' : 'Athletes Joined:'}</h6>
          </div>
          <div className="event-details__users">
            {joinedUsers.map(user => (
                <Link to={`/users/${user.id}`} key={user.id}>
                <div className="event-details__users-joined" key={user.id}>
                  <img className="event-details__users-pic" src={user.avatar_url} alt={`${user.first_name} ${user.last_name}`} />
                  <p className="event-details__users-name">{user.first_name} {user.last_name}</p>
                </div>
                </Link>
              ))}
          </div>
        </div>
      </article>

      {/* Comments Card */}
      <article className="event-details__card event-details__card--comments" >
        <div className="event-details__comments">
            <h3 className="event-details__comments-title">{numberOfComments} {numberOfComments === 1 ? 'Comment' : 'Comments'}:</h3>
        </div>
        <div className="event-details__comments-and-form">
          <div className="old-comments-container">
            {sortedComments.map((comment) => (
              <div className="old-comments" id={comment.id} key={comment.id}>
                <div className="old-comments__left-container">
                    <img className="old-comments__profile-pic" src={comment.avatar_url} alt={comment.first_name} />
                </div>
                <div className="old-comments__right-container">
                  <div className="old-comments__title-container">
                      <h6 className="old-comments__name">{comment.first_name} {comment.last_name}</h6>
                      <p className="old-comments__date">{timeAgoDate(comment.created_time)}</p>
                  </div>
                  <div className="old-comments__text-container">
                      <p className="old-comments__text">{comment.comment}</p>
                  </div>
                  <div className="old-comments__button-container">
                  <button className="old-comments__button" onClick={() => deleteComment(comment.id)}>
                    {comment.user_id === userData.id || comment.user_id === event.created_by ? (
                      <img className="old-comments__button-icon" src={Delete} alt="delete icon" />
                    ) : null}
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="comments-form-container">
            <CommentsForm 
            userData={userData}
            eventData={event}
            addComment={addComment}
            />
          </div>
        </div>
      </article>
    </main>
  )
}

export default EventDetails