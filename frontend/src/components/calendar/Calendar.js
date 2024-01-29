import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม ",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const kabisa = (yearin) => {
    return (
      (yearin % 4 === 0 && yearin % 100 !== 0 && yearin % 400 !== 0) ||
      (yearin % 100 === 0 && yearin % 400 === 0)
    );
  };

  const fevral = (yearin) => {
    return kabisa(yearin) ? 29 : 28;
  };

  const daysOfMonth = () => {
    return [31, fevral(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  };

  const hafta = (sol, ma) => {
    let haftakuni = new Date(sol, ma).getDay();
    switch (haftakuni) {
      case 0:
        haftakuni = 6;
        break;
      case 1:
        haftakuni = 0;
        break;
      case 2:
        haftakuni = 1;
        break;
      case 3:
        haftakuni = 2;
        break;
      case 4:
        haftakuni = 3;
        break;
      case 5:
        haftakuni = 4;
        break;
      case 6:
        haftakuni = 5;
        break;
      default:
        haftakuni = new Date(sol, ma).getDay();
        break;
    }
    return haftakuni;
  };

  const daysGenerator = () => {
    let days = [];
    for (let k = 0; k < daysOfMonth().length; k++) {
      days.push([]);
      for (let i = 1; i <= daysOfMonth()[k]; i++) {
        if (days[k].length < hafta(year, k)) {
          i -= i;
          days[k].push("");
          continue;
        }
        days[k].push(i);
      }
    }
    return days;
  };

  const getCurrentYear = () => {
    setYear(new Date().getFullYear());
  };

  useEffect(() => {
    getCurrentYear();
  }, []);

  const isToday = (kun, oy) => {
    const today = new Date();
    const dayInTable = new Date(year, oy, kun);
    return today.toDateString() === dayInTable.toDateString();
  };

  const isEventDay = (kun, index) => {
    const event = events.find((event) => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === kun &&
        eventDate.getMonth() + 1 === index + 1 &&
        eventDate.getFullYear() === year
      );
    });
    return event !== undefined;
  };
  const isbugun = (kun, oy) => {
    const today = new Date();
    const dayintable = new Date(year, oy, kun);
    return today.toDateString() === dayintable.toDateString() ? true : false;
  };

  const isSaturday = (kun, oy) => {
    const dayInTable = new Date(year, oy, kun);
    return dayInTable.getDay() === 0;
  };
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addEvent, setAddEvent] = useState(null);
  const handleClick = (kun, index) => {
    const event = events.find((event) => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === kun &&
        eventDate.getMonth() + 1 === index + 1 &&
        eventDate.getFullYear() === year
      );
    });

    if (event) {
      setSelectedEvent({
        day: kun,
        month: monthNames[index],
        year: year,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
      });
      // เปิด modal ที่นี่
    } else {
      setAddEvent({
        day: kun,
        month: monthNames[index],
        year: year,
      }); // รีเซ็ต state ถ้าไม่มีเหตุการณ์
    }
  };

  const Event = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/calendar/event/${storedUserData.user.id}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to add event. Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setEvents(data)
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };
  Event();

  const handleAddEvent = async (eventDetails) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/calendar/addevent/${storedUserData.user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...eventDetails,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add event. Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setAddEvent(null);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const [eventDetails, setEventDetails] = useState({
    description: "",
    startDate: "",
    endDate: "",
  });
  return (
    <div className="flex">
      <div className="min-w-48 px-2">My Events</div>
      <div className=" p-2 mx-4 bg-gray-100 rounded-lg shadow flex">
        {selectedEvent && (
          // Modal สำหรับแสดงข้อมูลเหตุการณ์
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={() => setSelectedEvent(null)}>
            <div className="bg-white p-4 rounded shadow-lg">
              <p className="text-xl font-semibold mb-2">
                {`${selectedEvent.day} ${selectedEvent.month} ${selectedEvent.year}`}
              </p>
              <p>{`Description: ${selectedEvent.description}`}</p>
              <p>{`startDate: ${selectedEvent.startDate}`}</p>
              <p>{`endDate: ${selectedEvent.endDate}`}</p>
              <button onClick={() => setSelectedEvent(null)}>Close</button>
            </div>
          </div>
        )}

        {addEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg">
              <form>
                <p className="text-xl font-semibold mb-2">
                  {`${addEvent.day} ${addEvent.month} ${addEvent.year}`}
                </p>
                <input
                  type="text"
                  placeholder="Event Description"
                  onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
                />
                <input
                  type="datetime-local"
                  placeholder="Start Date and Time"
                  onChange={(e) => setEventDetails({ ...eventDetails, startDate: e.target.value })}
                />
                <input
                  type="datetime-local"
                  placeholder="End Date and Time"
                  onChange={(e) => setEventDetails({ ...eventDetails, endDate: e.target.value })}
                />
                <button type="button" className="mr-4" onClick={() => handleAddEvent(eventDetails)}>
                  Add Event
                </button>
                <button type="button" onClick={() => setAddEvent(null)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
        <div className="flex flex-wrap justify-center">
          <div className="flex flex-wrap w-full h-12 p-1 m-1 text-xl font-bold bg-white rounded-lg shadow-lg">
            <p
              className="w-1/3 p-1 text-center text-green-900 shadow-md cursor-pointer hover:text-green-600 hover:shadow-inner bg-gray-50 rounded-l-md"
              onClick={() => setYear((prevYear) => prevYear - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block w-6 h-8 m-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            </p>
            <p className="w-1/3 p-1 text-center text-green-900 shadow-md bg-gray-50">
              {year}
            </p>
            <p
              className="w-1/3 p-1 text-center text-green-900 shadow-md cursor-pointer hover:text-green-600 hover:shadow-inner bg-gray-50 rounded-r-md"
              onClick={() => setYear((prevYear) => prevYear + 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block w-6 h-8 m-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </p>
          </div>
          {monthNames.map((month, index) => (
            <div
              key={index}
              className="p-1 m-1 font-sans bg-white rounded shadow-md lg:w-72 w-80 bg-blend-luminosity bg-gradient-to-b from-green-50 via-white to-green-50"
            >
              <p className="p-1 text-xl font-semibold text-center text-indigo-800">
                {month}
              </p>
              <div className="p-1 m-1">
                <div className="grid grid-cols-7 font-semibold text-green-800 border-b-2">
                  {dayNames.map((days, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="grid place-items-center"
                      style={{ color: days === "Su" ? "red" : "inherit" }}
                    >
                      <p>{days}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 font-semibold text-center text-gray-800">
                  {daysGenerator()[index].map((kun, kunIndex) => (
                    <div
                      key={kunIndex}
                      className={`${isToday(kun, index) ? "ring-green-400 ring-4 rounded-full" : ""} 
                                ${isEventDay(kun, index) ? "ring-yellow-400 bg-red-200 ring-2 rounded-full cursor-pointer" : ""}
                                ${isSaturday(kun, index) ? "text-red-500" : ""}
                                ${!isbugun(kun, index) ? "hover:bg-green-100 rounded-full" : ""}
                              `}
                      onClick={() => handleClick(kun, index)}
                    >
                      <p>{kun}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Calendar;
