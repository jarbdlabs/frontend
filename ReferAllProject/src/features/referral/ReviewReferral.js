import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { GridContainer, GridItem, Card, CardHeader, CardBody, CardFooter, Button, ResponsiveDialog } from '../common';
import styles from "../common/CardStyle";
import { useGetReferralFiles } from '../common/redux/getReferralFiles';
import { useGetReferralPatient } from './redux/getReferralPatient';
import { GetApp } from '@material-ui/icons';
import FileSaver from 'file-saver';
import { useSaveReferralNote } from './redux/saveReferralNote';
import { Alert,TextareaAutosize, Snackbar } from '@mui/material';
import ViewReferralNotes from './ViewReferralNotes';
import { useUpdateReferral } from './redux/updateReferral';

const useStyles = makeStyles(styles);

export default function ReviewReferral({referral_id, handleCloseReview, doRefreshList, referral}) {
  const classes = useStyles();
  const [refresh, doRefresh] = useState(0);
  const [referralPatient, setReferralPatient] = useState(undefined);
  const [referralNote, setReferralNote] = useState('');
  const [referralFiles, setReferralFiles] = useState([]);
  const {getReferralFiles} = useGetReferralFiles();
  const {getReferralPatient} = useGetReferralPatient();
  const {saveReferralNote, dismissSaveReferralNote, saveReferralNoteSuccess} = useSaveReferralNote();
  const {updateReferral, dismissUpdateReferral, updateReferralSuccess} = useUpdateReferral();

  const handleNoteChange = (event) => {
    setReferralNote(event.target.value);
  };

  const downloadFile = (index) => {
    FileSaver.saveAs(
      `http://ec2-34-211-142-125.us-west-2.compute.amazonaws.com:80/api/referral/file/${referralFiles[index].saved_filename}`,
      referralFiles[index].filename
    );
  };

  const handleSendNotes = () => {
    saveReferralNote({'note': referralNote},referral_id)
      .then((response) => {
        if(response.status === 200){
          setReferralNote('');
          doRefresh(refresh + 1);
        }
      });
  };

  const handUpdateReferralStatus = (status) => {
    updateReferral({'status': status},referral_id)
      .then((response) => {
        if(response.status === 200){
        }
      });
  };

  const closeReferralStatus = () => {
    doRefreshList(Math.random());
    dismissUpdateReferral();
    handleCloseReview();
  };

  useEffect(() => {
    getReferralFiles(referral_id)
      .then((response) => {
        setReferralFiles(response.data);
      });
    getReferralPatient(referral_id)
      .then((response) => {
        setReferralPatient(response.data);
      });
  },[referral_id, getReferralFiles, getReferralPatient]);

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

  const handleClickOpen = (status) => {
    setStatus(status);
    setOpen(true);
  };

  const handleClose = (status) => {
    if(status === "accept"){
      handUpdateReferralStatus("accepted");
    } else if (status === "decline"){
      handUpdateReferralStatus("declined");
    }
    setOpen(false);
  };

  return (
    <div >
      <Snackbar open={updateReferralSuccess} autoHideDuration={3000} sx={{ height: "100%" }} onClose={closeReferralStatus} anchorOrigin={{vertical: "top", horizontal: "center"}}>
        <Alert onClose={closeReferralStatus} severity="success" sx={{  width: '600px' }}>
          Updated Referral Status: Success
        </Alert>
      </Snackbar>

      <Snackbar open={saveReferralNoteSuccess} autoHideDuration={3000} sx={{ height: "100%" }} onClose={dismissSaveReferralNote} anchorOrigin={{vertical: "top", horizontal: "center"}}>
        <Alert onClose={dismissSaveReferralNote} severity="success" sx={{  width: '600px' }}>
          Send Note: Success 
        </Alert>
      </Snackbar>
      <GridContainer justifyContent="center" alignItems="center" style={{ maxWidth: '100%'}}>
        <GridItem xs={12} sm={12} md={12} style={{margin: '0'}}>
          <Card style={{width:'850px'}}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Review Referral</h4>
            </CardHeader>
            <CardBody style={{width:'800px', maxHeight:'500px', overflowY:'auto'}}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <h4 className={classes.tableSubTitleBlack}>Patient Demographics</h4>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <h4 className={classes.tableContentBlackBold}>SSN: </h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                      <h5 className={classes.tableContentBlack}>{referralPatient !== undefined ? referralPatient.ssn:""}</h5>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <h4 className={classes.tableContentBlackBold}>Name: </h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                      <h5 className={classes.tableContentBlack}>{referralPatient !== undefined ? referralPatient.name:""}</h5>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <h4 className={classes.tableContentBlackBold}>Address: </h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                      <h5 className={classes.tableContentBlack}>{referralPatient !== undefined ? referralPatient.address + " longer address check":""}</h5>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <h4 className={classes.tableContentBlackBold}>Birthday: </h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                      <h5 className={classes.tableContentBlack}>{referralPatient !== undefined ? referralPatient.birthday:""}</h5>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <h4 className={classes.tableContentBlackBold}>Phone: </h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                      <h5 className={classes.tableContentBlack}>{referralPatient !== undefined ? referralPatient.phone:""}</h5>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <h4 className={classes.tableContentBlackBold}>Policy: </h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                      <h5 className={classes.tableContentBlack}>{referralPatient !== undefined ? referralPatient.policy:""}</h5>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <h4 className={classes.tableContentBlackBold}>Diagnosis: </h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                      <h5 className={classes.tableContentBlack}>{referralPatient !== undefined ? referralPatient.diagnosis:""}</h5>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <h4 className={classes.tableSubTitleBlack}>Files</h4>
                  {referralFiles.map((prop, key) => {
                    return (
                      <Button key={key} color="transparent" onClick={() => downloadFile(key)} style={{'textDecoration':'underline'}} startIcon={<GetApp/>}>{prop.filename}</Button>
                    );
                  })}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.tableSubTitleBlack} style={{marginTop:"15px"}}>Previous Referrals : </h4>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <h5 className={classes.tableContentBlack}>No data available</h5>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.tableContentBlackBold}>Notes: </h4>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextareaAutosize placeholder="Type here" 
                    value={referralNote}
                    onChange={handleNoteChange}
                    style={{width: '100%', minHeight: '50px', marginTop: '10px'}}/>
                  <Button color="primary" onClick={handleSendNotes}>Add Note</Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <ViewReferralNotes referral_id={referral_id} refresh={refresh}/>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter style={{justifyContent: 'center', alignItems: 'center'}}> 
            {
              (referral && referral.status === 'draft') ? <Button color="primary" type="button" onClick={() => handUpdateReferralStatus('sent')} style={{marginRight: '10px'}}>Send Referral</Button> :null
            }
            {
              (referral && referral.status === 'sent') ? <Button color="primary" type="button" onClick={() => handUpdateReferralStatus('under review')} style={{marginRight: '10px'}}>Ready for Review</Button> :null
            }
            {
              (referral && referral.status === 'under review') ? <Button color="primary" type="submit" onClick={() => handleClickOpen('accept')} style={{marginRight: '10px'}}>Accept</Button> :null
            }
            {
              (referral && referral.status === 'under review') ? <Button color="danger" type="submit" onClick={() => handleClickOpen('decline')} style={{marginRight: '10px'}}>Decline</Button> :null
            }
            {
              (referral && referral.status === 'accepted') ? <Button color="primary" type="submit" onClick={() => handUpdateReferralStatus('completed')} style={{marginRight: '10px'}}>Schedule</Button> :null
            }
            
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <ResponsiveDialog status={status} open={open} okLabel={"Confirm"} cancelLabel={"Cancel"} title={"Are you sure you want to "+ status.toUpperCase() + " this referral?"} message={"Please click confirm to proceed."} handleClose={handleClose}/>
    </div>
  );
};