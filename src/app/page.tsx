"use client";
import CreateEvent from "@/components/CreateEvent";
import { useAuth } from "@/context/AuthContext";
import { Container, Typography } from "@mui/material";

const Home = () => {
    const { user } = useAuth();

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ textAlign: "center", my: 5 }}>
                    Basic User Calendar System with Google Calendar Integration
                </Typography>
                {user && <CreateEvent />}
            </Container>
        </>
    );
};

export default Home;
