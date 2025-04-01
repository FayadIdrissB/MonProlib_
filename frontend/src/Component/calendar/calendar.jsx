import React, { useState, useEffect } from "react";
import "./calendar.css";

const Calendar = () => {
  const [slots, setSlots] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selection, setSelection] = useState({ start: null, end: null });

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

  const handleSelection = (day, hour) => {
    const dateClicked = new Date(currentDate);
    dateClicked.setDate(dateClicked.getDate() - dateClicked.getDay() + day);
    dateClicked.setHours(hour, 0, 0, 0);

    if (!selection.start || (selection.start && selection.end)) {
      setSelection({ start: dateClicked, end: null });
    } else if (selection.start && !selection.end) {
      setSelection({ ...selection, end: dateClicked });
    }
  };

  const renderDays = () => {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    return days.map((day, i) => {
      const dayDate = new Date(firstDayOfWeek);
      dayDate.setDate(firstDayOfWeek.getDate() + i);

      return (
        <div key={i} className="day-header">
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

  const renderSlots = () => {
    const slotElements = [];

    for (let hour = 6; hour <= 20; hour++) {
      for (let day = 0; day < 7; day++) {
        const slotTime = new Date(currentDate);
        slotTime.setDate(slotTime.getDate() - slotTime.getDay() + day);
        slotTime.setHours(hour, 0, 0, 0);

        const slot = slots.find(
          (s) => new Date(s.start).getTime() === slotTime.getTime()
        );
        const isSelected =
          selection.start && slotTime.getTime() === selection.start.getTime();

        slotElements.push(
          <div
            key={`${day}-${hour}`}
            className={`slot ${slot ? "booked" : ""} ${
              isSelected ? "selected" : ""
            }`}
            onClick={() => handleSelection(day, hour)}
          >
            {slot && (
              <div className="slot-info">
                <span>
                  {new Date(slot.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
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
    return slotElements;
  };

  return (
    <div className="calendar-container">
      <button onClick={() => navigateWeek(-1)}>Précédent</button>
      <button onClick={() => navigateWeek(1)}>Suivant</button>
      <button onClick={addSlot}>Ajouter créneau</button>
      <div className="calendar">
        <div className="days-row">{renderDays()}</div>
        <div className="slots-grid">{renderSlots()}</div>
      </div>
    </div>
  );
};

export default Calendar;
