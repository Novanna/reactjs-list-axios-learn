import * as React from 'react';
import {useEffect, useState} from 'react';
// import Modal from 'react-modal';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import RecipeCard from './RecipeCard';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';
import useStyles from './Style';
import {Button, Container, CssBaseline, Grid, Typography} from "@mui/material";
import axios from "axios";


export default function Recipes() {
  const classes = useStyles();
  const [cards, setCards] = useState([])
  const [refresh, setRefresh] = useState(true)

  //---------------POST (ADD CARD)-------------//
  const [tittle, setTittle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); 

  const postReqHandler = async () => {
    const datapost = {tittle, content, image};
    const res = await axios.post(
      "http://localhost:1234/recipes", datapost
    );
    setRefresh(!refresh)
    console.log('posted')
    setPosted(true)
    setTittle("")
    setContent("")
    setImage("")
  }

  //deps = [] -- dijalankan hanya sekali
  useEffect(()=>{
    console.log('useEffect')
    axios.get('http://localhost:1234/recipes').then(res => {
      setCards(res.data)
    })
  },[refresh])

  const doRefresh = () => {
    console.log('doRefresh')
    setRefresh(!refresh)
  }

  //----MODAL---//
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    maxWidth: '100%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
  };
  //-----------------//

  const [posted, setPosted] = React.useState(false);

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Button variant="contained" onClick={doRefresh}>Refresh</Button> 
            <Button size="small"></Button>
            <Button variant="contained" onClick={handleOpen}>Add Recipe</Button>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              marginTop="25px"
              gutterBottom
            >
              Recipes
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Aneka macam ide resep masakan dan makanan yang simpel
              tersaji disini untuk memberi panduan dan mempermudah dalam menentukan hidangan lezat untuk
              keluarga anda
            </Typography>
            <div className={classes.heroButtons}>
            </div>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <RecipeCard key={card.id} card={card} setRefresh={setRefresh} refresh={refresh}/>
            ))}
          </Grid>
        </Container>
      </main>
      {/* -------------------------------------------------------------------- */}

      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" onClose={handleClose}>
        {/* Box modal */}
        <Box sx={style}>
          <Typography variant="h5" align="left" color="textPrimary" marginBottom="15px" gutterBottom>
              Add Recipe
          </Typography>
          {/* Box form text */}
          <Box sx={{ width: 400, maxWidth: '100%'}}>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Food Name</InputLabel>
              <OutlinedInput id="component-outlined" value={tittle} onChange={(e) => setTittle(e.target.value)}
                label="Food Name"
              />
            </FormControl>
          </Box>
          {/* Box form text area */}
          <Box component="form" sx={{ '& > :not(style)': { m: 0, width: '25ch',marginTop: 2, marginBottom:2 }}}
            noValidate autoComplete="off">
            <TextField id="outlined-multiline-static" label="Food Description" multiline
              rows={3} value={content} onChange={(e) => setContent(e.target.value)}/>
          </Box>
          {/* Box form text */}
          <Box
            sx={{width: 400, maxWidth: '100%', marginBottom:2}}
          >
            <FormControl>
              <InputLabel htmlFor="component-outlined">Image Link</InputLabel>
              <OutlinedInput id="component-outlined" value={image}
                onChange={(e) => setImage(e.target.value)}label="Image Source" />
            </FormControl>
          </Box>
          {/* Button post */}
          <Button variant="contained" onClick={postReqHandler}>
            Post
          </Button> 
          <Collapse in={posted}>
            <Alert 
              action={
                <IconButton
                  aria-label="close" color="inherit" size="small"
                  onClick={() => { setPosted(true); }}
                ></IconButton>
              }
              sx={{ mb: 2, marginTop: 2 }}
            >
              Posted!
            </Alert>
          </Collapse>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
