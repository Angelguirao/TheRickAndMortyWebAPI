import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Container,
  Paper,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

// Define styles using makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBar: {
    backgroundColor: '#1a237e',
  },
  header: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  searchInput: {
    marginBottom: theme.spacing(2),
  },
  card: {
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
}));

const HumanCharactersPage: React.FC = () => {
  const classes = useStyles();
  const [characters, setCharacters] = useState<any[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const itemsPerPage = 9;

  // Function to fetch character data
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/');
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching human characters:', error);
    }
  };
  
  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Filter characters based on search term
  useEffect(() => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [searchTerm, characters]);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">Rick and Morty</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" align="center" className={classes.header}>
          Human Characters
        </Typography>
        <TextField
          label="Search Characters"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchInput}
        />
        <Grid container spacing={3}>
          {filteredCharacters
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((character) => (
              <Grid item xs={12} sm={6} md={4} key={character.id}>
                <Paper className={classes.card}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={character.name}
                      height="300"
                      image={character.image}
                      title={character.name}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {character.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Species: {character.species}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Status: {character.status}
                      </Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
            ))}
        </Grid>
        <Pagination
          count={Math.ceil(filteredCharacters.length / itemsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          style={{ marginTop: '20px' }}
        />
      </Container>
    </div>
  );
};

export default HumanCharactersPage;
