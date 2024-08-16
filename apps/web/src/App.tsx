import React, { useState } from "react";
import Jobs from "./components/jobs";
import PostJob from "./components/postjob";
import Filter from "./components/filter";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App: React.FC = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilter = (filters: { [key: string]: string }) => {
    setFilters(filters);
  };

  return (
    <Container maxWidth="md">
      <Box mt={2} mb={2}>
        <Typography variant="h4">dev.jobs</Typography>
        <Typography>remote dev jobs</Typography>
      </Box>
      <Divider />
      <Box mt={2} mb={2}>
        <PostJob />
        <Filter onFilter={handleFilter} />
      </Box>
      <Jobs filters={filters} />
    </Container>
  );
};

export default App;
