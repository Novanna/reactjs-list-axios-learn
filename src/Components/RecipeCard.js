import * as React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {makeStyles} from "@mui/styles";
import {useRef, useState} from "react";
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const RecipeCard = ({ card, doRefresh }) => {
    const classes = useStyles();
    console.log(card) //card isinya object yaampun
    
    //-------------DELETE--------------------------- //
    const deleteReqHandler = async (e, card )=> {
        e.preventDefault();
        const response = await axios.delete( 'http://localhost:1234/recipes/' + card.id );
        if(response.status===200){
          doRefresh()
        }
    }
    //---------------------------------------------//

    //---------------PUT (UPDATE)----------------- //
    const putTittle = useRef(null);
    const putContent = useRef(null);
    const putImage = useRef(null);
    const [updated, setUpdated] = React.useState(false);
    
    const putReqHandler = async (e, card)=> {
        e.preventDefault(); ///the default action of the event will not be triggered.
        const putData = {
            tittle: formData.tittle,
            content: formData.content,
            image: formData.image,
        };
        const response = await axios.put('http://localhost:1234/recipes/' + card.id, putData);
        setUpdated(true);
        if(response.status===200){
          doRefresh()
        }
    }
    ///----------------------------------------------///

    
    //--------------MODAL-----------------------------//
    const [open, setOpen] = React.useState(false);
    const handleOpen = (e) => {
      e.preventDefault();
      setFormData({
        tittle:card.tittle,
        content: card.content,
        image: card.image
      })
      setOpen(true);

    }
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
    //-----------------------------------------------//   
    const [formData, setFormData] = useState({
      tittle:'',
      content: '',
      image: ''
    });
    const handleChange = (e) => {
      let data = {...formData};
      data[e.target.name] = e.target.value;
      setFormData(data)
    };

    return (
        <> 
            <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardMedia
                        data-id={card.id}
                        className={classes.cardMedia}
                        image={card.image}
                        title={card.tittle}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography data-id={card.id} gutterBottom variant="h5" component="h2">
                            {card.tittle}
                        </Typography>
                        <Typography data-id={card.id} >
                            {card.content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button 
                        size="small"
                        variant="outlined"
                        startIcon={<EditIcon/>}
                        onClick= {handleOpen}
                        // refresh= {doRefresh}
                        >
                        Edit</Button>
                        <Button 
                            size="small"
                            variant="outlined"
                            startIcon={<DeleteIcon/>}
                            // refresh= {doRefresh}
                            onClick={(e) => {
                                const confirmBox = window.confirm(
                                    "Do you really want to delete this recipe?"
                                )
                                if (confirmBox === true) {
                                    deleteReqHandler(e, card)
                                }
                            }}
                        >
                        Delete</Button>
                    </CardActions>
                </Card>
            </Grid>
        {/* --------------------------------------------------------------- */}
        {/* -------MODAL------- */}
        <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h5" align="left" color="textPrimary" marginBottom="15px" gutterBottom>
                Edit Recipe
            </Typography>
            <Box sx={{ width: 400, maxWidth: '100%'}}>
              <FormControl>
                <InputLabel htmlFor="component-outlined">Food Name</InputLabel>
                {/* <OutlinedInput id="component-outlined" inputRef={putTittle} label="Food Name"/> */}
                <OutlinedInput id="component-outlined" name='tittle' value={formData.tittle} onChange={handleChange} label="Food Name"/>
              </FormControl>
            </Box>
            <Box component="form" sx={{ '& > :not(style)': { m: 0, width: '25ch',marginTop: 2, marginBottom:2 }}}
              noValidate autoComplete="off">
              {/* <TextField id="outlined-multiline-static" label="Food Description" multiline
                rows={3} inputRef={putContent} onChange={handleChange} value={card.content}/> */}
              <TextField id="outlined-multiline-static"  name='content' label="Food Description" multiline
                rows={3} onChange={handleChange} value={formData.content}/>
            </Box>
            <Box
              sx={{width: 400, maxWidth: '100%', marginBottom:2}}
            >
              <FormControl>
                <InputLabel htmlFor="component-outlined">Image Link</InputLabel>
                {/* <OutlinedInput id="component-outlined" inputRef={putImage} label="Image Source" /> */}
                <OutlinedInput id="component-outlined"  name='image' value={formData.image} onChange={handleChange}  label="Image Source" />
              </FormControl>
            </Box>
            {/* Button post */}
            <Button variant="contained" onClick={(e) => putReqHandler(e, card, putTittle, putContent, putImage)}>
              Update
            </Button>
            {/* ------- NOTIF UPDATED --------- */}
            <Collapse in={updated}>
              <Alert 
                action={
                  <IconButton
                    aria-label="close" color="inherit" size="small"
                    onClick={() => { setUpdated(true); }}
                  ></IconButton>
                }
                sx={{ mb: 2, marginTop: 2 }}
              >
                Updated yeay!
              </Alert>
            </Collapse>
          </Box>
        </Modal>
        </>
    );
};
export default RecipeCard;
