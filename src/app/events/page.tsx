import CalenderView from "@/components/CalenderView";
import EventListing from "@/components/EventListing";
import { Box, Container, Grid } from "@mui/material";

const Events = () => {
    return (
        <>
            <Box component="section" py={6}>
                <Container maxWidth="lg" sx={{ bgcolor: "#fdfdfd" }}>
                    <Grid container spacing={3} mb={6} p={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <EventListing />
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                            <CalenderView />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Events;
