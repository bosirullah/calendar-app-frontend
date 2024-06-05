"use client";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const CalenderView = () => {
    const [events, setEvents] = useState<any>([]);
    const { accessToken, isAuthenticated, setIsAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                if (isAuthenticated) {
                    const response = await axios.get(
                        "http://localhost:5000/events/getEvents",
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    setEvents(response.data);
                    // console.log("event = ", events);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        // Fetch events after authentication
        if (isAuthenticated) {
            fetchEvents();
        } else {
            router.push("/");
        }
    }, [isAuthenticated]);

    // const handleSelect = (info: any) => {
    //     const { start, end } = info;
    //     const eventNamePrompt = prompt("Enter, event name");
    //     if (eventNamePrompt) {
    //         setEvents([
    //             ...events,
    //             {
    //                 start,
    //                 end,
    //                 title: eventNamePrompt,
    //                 id: uuid(),
    //             },
    //         ]);
    //     }
    // };

    const handleSelect = (info: any) => {
        const { start, end } = info;
        const eventNamePrompt = prompt("Enter event name");
        if (eventNamePrompt) {
            const newEvent = {
                start,
                end,
                title: eventNamePrompt,
                id: uuid(),
            };
            setEvents([...events, newEvent]);

            // Optionally, send the new event to your backend API
            // axios.post("/api/events", newEvent).catch((error) => {
            //     console.error("Error saving event:", error);
            // });
        }
    };

    return (
        <>
            <Box>
                {isAuthenticated && (
                    <FullCalendar
                        editable
                        selectable
                        events={events}
                        select={handleSelect}
                        headerToolbar={{
                            start: "today prev next",
                            end: "dayGridMonth dayGridWeek dayGridDay",
                        }}
                        eventContent={(info) => <EventItem info={info} />}
                        plugins={[daygridPlugin, interactionPlugin]}
                        // views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
                    />
                )}
            </Box>
        </>
    );
};

export default CalenderView;

const EventItem = ({ info }: any) => {
    const { event } = info;
    return (
        <Box sx={{ background: "red" }} px={2}>
            <p>{event.title}</p>
        </Box>
    );
};
