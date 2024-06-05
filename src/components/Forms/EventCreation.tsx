import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
    LocalizationProvider,
    TimePicker,
    DatePicker,
} from "@mui/x-date-pickers";
import { format } from "date-fns";

interface EventFormProps {
    open: boolean;
    handleClose: () => void;
}

interface FormData {
    eventTitle: string;
    description: string;
    participants: string;
    date: Date | null;
    time: Date | null;
    duration: string;
    sessionNotes: string;
}

interface FormErrors {
    eventTitle?: string;
    description?: string;
    participants?: string;
    date?: string;
    time?: string;
    duration?: string;
    sessionNotes?: string;
}

const EventCreation: React.FC<EventFormProps> = ({ open, handleClose }) => {
    const [formData, setFormData] = useState<FormData>({
        eventTitle: "",
        description: "",
        participants: "",
        date: null,
        time: null,
        duration: "",
        sessionNotes: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (date: Date | null) => {
        setFormData((prevData) => ({ ...prevData, date }));
    };

    const handleTimeChange = (time: Date | null) => {
        setFormData((prevData) => ({ ...prevData, time }));
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.eventTitle)
            newErrors.eventTitle = "Event title is required";
        if (!formData.description)
            newErrors.description = "Description is required";
        if (!formData.participants)
            newErrors.participants = "Participants are required";
        if (!formData.date) newErrors.date = "Date is required";
        if (!formData.time) newErrors.time = "Time is required";
        if (!formData.duration) newErrors.duration = "Duration is required";
        if (!formData.sessionNotes)
            newErrors.sessionNotes = "Session notes are required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            const formattedDate = formData.date
                ? format(formData.date, "yyyy-MM-dd")
                : "";
            const formattedTime = formData.time
                ? format(formData.time, "HH:mm")
                : "";
            console.log({
                ...formData,
                date: formattedDate,
                time: formattedTime,
            });
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Event</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="eventTitle"
                    label="Event Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.eventTitle}
                    onChange={handleChange}
                    error={!!errors.eventTitle}
                    helperText={errors.eventTitle}
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <TextField
                    margin="dense"
                    name="participants"
                    label="List of Participants"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.participants}
                    onChange={handleChange}
                    error={!!errors.participants}
                    helperText={errors.participants}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    {/* <DatePicker
                        label="Date"
                        value={formData.date}
                        onChange={handleDateChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                margin="dense"
                                fullWidth
                                variant="standard"
                                error={!!errors.date}
                                helperText={errors.date}
                            />
                        )}
                    /> */}
                    {/* <TimePicker
            label="Time"
            value={formData.time}
            onChange={handleTimeChange}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                fullWidth
                variant="standard"
                error={!!errors.time}
                helperText={errors.time}
              />
            )}
          /> */}
                </LocalizationProvider>
                <TextField
                    margin="dense"
                    name="duration"
                    label="Duration (hrs)"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={formData.duration}
                    onChange={handleChange}
                    error={!!errors.duration}
                    helperText={errors.duration}
                />
                <TextField
                    margin="dense"
                    name="sessionNotes"
                    label="Session Notes"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.sessionNotes}
                    onChange={handleChange}
                    error={!!errors.sessionNotes}
                    helperText={errors.sessionNotes}
                />
            </DialogContent>
        </Dialog>
    );
};

export default EventCreation;
