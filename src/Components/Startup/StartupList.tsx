import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack, Pagination } from '@mui/material';

interface Startup {
  id: number;
  name: string;
  shortDescription: string;
}

const StartupList = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [page, setPage] = useState(1);
  
  const startupsPerPage = 2; 

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await axios.get('/api/startups');
        setStartups(response.data);
      } catch (error) {
        console.error('Error fetching startups:', error);
        setStartups([]);
      }
    };

    fetchStartups();
  }, []);

  if (startups.length === 0) {
    return <div>No startups found.</div>;
  }

  const totalPages = Math.ceil(startups.length / startupsPerPage);

  const startIndex = (page - 1) * startupsPerPage;
  const endIndex = startIndex + startupsPerPage;
  const startupsToDisplay = startups.slice(startIndex, endIndex);

  return (
    <div>
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Stack>
      <Typography variant="h4" gutterBottom>
        Startup List
      </Typography>

      {startupsToDisplay.length === 0 ? (
        <div>No startups found for this page.</div>
      ) : (
        startupsToDisplay.map((startup: Startup) => (
          <Box key={startup.id} sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  {startup.name}
                </Typography>
                <Typography variant="body2">
                  {startup.shortDescription}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))
      )}
    </div>
  );
};

export default StartupList;
