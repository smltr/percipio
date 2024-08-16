import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

interface Posting {
  id: number;
  title: string;
  company: string;
  description: string;
  jobType: string;
  location: string;
  salary: string;
  postedDate: string;
  deadline: string;
}

interface JobsProps {
  filters: { [key: string]: string };
}

const Jobs: React.FC<JobsProps> = ({ filters }) => {
  const [postings, setPostings] = useState<Posting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostings = async () => {
      try {
        const response = await axios.get("/api/postings", {
          params: { ...filters, page: 1, limit: 5 },
        });
        setPostings(response.data.results);
      } catch (err) {
        setError("Failed to fetch postings");
      } finally {
        setLoading(false);
      }
    };

    fetchPostings();
  }, [filters]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Stack spacing={0}>
      {postings.map((posting) => (
        <Card key={posting.id} elevation={0} style={{ padding: 0 }}>
          <CardContent>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12} sm={4} md={4}>
                <Typography variant="body1">{posting.title}</Typography>
                <Grid container justifyContent="left">
                  <Grid item>
                    <Typography variant="body2" color="textSecondary">
                      <Link
                        href={`/company/${posting.company}`}
                        underline="hover"
                      >
                        {posting.company}
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="text.disabled">
                      &nbsp;&nbsp;&nbsp;
                      {(() => {
                        const postedDate = new Date(posting.postedDate);
                        const today = new Date();
                        const diffTime = today.getTime() - postedDate.getTime();
                        const diffDays = Math.floor(
                          diffTime / (1000 * 60 * 60 * 24),
                        );

                        if (diffDays === 0) return "Today";
                        if (diffDays === 1) return "Yesterday";
                        return `${diffDays} days ago`;
                      })()}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="body2" color="textSecondary">
                  {posting.description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default Jobs;
