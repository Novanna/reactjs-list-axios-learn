import * as React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {makeStyles} from "@mui/styles";
import {useRef} from "react";
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

const RecipeCard = ({ card, refresh, setRefresh }) => {
    const classes = useStyles();
    console.log(card)
    
    //-------------DELETE--------------------------- //
    // const [action, setAction] = useState("");
    const deleteReqHandler = (e, card )=> {
        e.preventDefault();
        axios.delete( 'http://localhost:1234/recipes/' + card.id );
        //Udah berhasil delete tapi gak auto refresh
        console.log(refresh);
       setRefresh(!refresh);
    }
    //---------------------------------------------//

    //---------------PUT (UPDATE)----------------- //
    const putTittle = useRef(null);
    const putContent = useRef(null);
    const putImage = useRef(null);
    const [updated, setUpdated] = React.useState(false);
    
    const putReqHandler = (e, card, putTittle, putContent, putImage )=> {
        e.preventDefault();
        
        const putData = {
            tittle: putTittle.current.value,
            content: putContent.current.value,
            image: putImage.current.value,
        };

        axios.put( 'http://localhost:1234/recipes/' + card.id, putData );
        
        // console.log('updated');
        setUpdated(true);
        // console.log(refresh);
        setRefresh(!refresh);
    }
    ///----------------------------------------------///

    
    //--------------MODAL-----------------------------//
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
    //-----------------------------------------------//   

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
        
        <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h5" align="left" color="textPrimary" marginBottom="15px" gutterBottom>
                Edit Recipe
            </Typography>
            <Box sx={{ width: 400, maxWidth: '100%'}}>
              <FormControl>
                <InputLabel htmlFor="component-outlined">Food Name</InputLabel>
                <OutlinedInput id="component-outlined" inputRef={putTittle} 
                  label="Food Name"
                />
              </FormControl>
            </Box>
            <Box component="form" sx={{ '& > :not(style)': { m: 0, width: '25ch',marginTop: 2, marginBottom:2 }}}
              noValidate autoComplete="off">
              <TextField id="outlined-multiline-static" label="Food Description" multiline
                rows={3} inputRef={putContent}/>
            </Box>
            <Box
              sx={{width: 400, maxWidth: '100%', marginBottom:2}}
            >
              <FormControl>
                <InputLabel htmlFor="component-outlined">Image Link</InputLabel>
                <OutlinedInput id="component-outlined" inputRef={putImage} label="Image Source" />
              </FormControl>
            </Box>
            {/* Button post */}
            <Button variant="contained" onClick={(e) => putReqHandler(e, card, putTittle, putContent, putImage)}>
              Update
            </Button>
            {/* ---------------- */}
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
