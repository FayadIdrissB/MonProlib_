import React, { useState, useEffect } from "react";
import "./calendar.css";
import PopupSlot from "../popupSlot/popupSlot";

const Calendar = () => {
  const [slots, setSlots] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selection, setSelection] = useState({ start: null, end: null });
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedSlotTime, setSelectedSlotTime] = useState(null);

  useEffect(() => {
    fetchSlots();
  }, [currentDate]);

  const fetchSlots = async () => {
    const res = await fetch("http://localhost:3000/api/slotsCalendar");
    const data = await res.json();
    setSlots(data);
  };

  const addSlot = async () => {
    if (!selection.start || !selection.end) return;
    const res = await fetch("http://localhost:3000/api/slotsCalendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ start: selection.start, end: selection.end }),
    });
    await res.json();
    setSelection({ start: null, end: null });
    fetchSlots();
  };

  const deleteSlot = async (id) => {
    await fetch(`http://localhost:3000/api/slotsCalendar/${id}`, {
      method: "DELETE",
    });
    fetchSlots();
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(newDate);
  };

  // Mise à jour de handleSelection pour gérer heures et minutes
  const handleSelection = (day, hour, minute) => {
    const dateClicked = new Date(currentDate);
    dateClicked.setDate(dateClicked.getDate() - dateClicked.getDay() + day);
    dateClicked.setHours(hour, minute, 0, 0);
    openPopup(dateClicked);
  };

  const renderDays = () => {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const today = new Date();

    return days.map((day, i) => {
      const dayDate = new Date(firstDayOfWeek);
      dayDate.setDate(firstDayOfWeek.getDate() + i);

      const isToday =
        dayDate.getDate() === today.getDate() &&
        dayDate.getMonth() === today.getMonth() &&
        dayDate.getFullYear() === today.getFullYear();

      return (
        <div key={i} className={`day-header ${isToday ? "today" : ""}`}>
          {day}{" "}
          {dayDate.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "numeric",
            year: "2-digit",
          })}
        </div>
      );
    });
  };

  const openPopup = (slotTime) => {
    setSelectedSlotTime(slotTime);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  // Mise à jour de saveSlot pour récupérer l'activité sélectionnée depuis le Popup
  const saveSlot = async (title, description, activite) => {
    await fetch("http://localhost:3000/api/slotsCalendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start: selectedSlotTime,
        end: new Date(selectedSlotTime.getTime() + 60 * 60 * 1000),
        title,
        description,
        activite,
      }),
    });
    closePopup();
    fetchSlots();
  };

  const renderSlots = () => {
    const slotElements = [];

    for (let hour = 6; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        slotElements.push(
          <div key={`hour-${hour}-${minute}`} className="hour-cell">
            {hour}h{minute === 0 ? "00" : "30"}
          </div>
        );

        for (let day = 0; day < 7; day++) {
          const slotTime = new Date(currentDate);
          slotTime.setDate(slotTime.getDate() - slotTime.getDay() + day);
          slotTime.setHours(hour, minute, 0, 0);

          const slot = slots.find(
            (s) => new Date(s.start).getTime() === slotTime.getTime()
          );
          const isSelected =
            selection.start && slotTime.getTime() === selection.start.getTime();

          slotElements.push(
            <div
              key={`${day}-${hour}-${minute}`}
              className={`slot ${slot ? "booked" : ""} ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => handleSelection(day, hour, minute)}
            >
              {slot && (
                <div className="slot-info">
                  <span>
                    {new Date(slot.start).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span>{slot.title}</span>
                  <span>{slot.description}</span>
                  <span>{slot.activity}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSlot(slot._id);
                    }}
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          );
        }
      }
    }

    return slotElements;
  };

  return (
    <div className="calendar-container">
      <button
        className="calandar-container-button"
        onClick={() => navigateWeek(-1)}
      >
        Précédent
      </button>
      <button
        className="calandar-container-button"
        onClick={() => navigateWeek(1)}
      >
        Suivant
      </button>
      <div className="calendar">
        <div className="days-row">
          <div className="hour-column-header"></div>
          {renderDays()}
        </div>
        <div className="slots-grid">{renderSlots()}</div>
      </div>

      <PopupSlot
        visible={popupVisible}
        onClose={closePopup}
        onSave={saveSlot}
        slotTime={selectedSlotTime || new Date()}
      />
    </div>
  );
};

export default Calendar;
