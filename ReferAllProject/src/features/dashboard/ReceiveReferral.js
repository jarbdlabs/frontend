import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Modal } from "@material-ui/core";
import styles from "../common/CardStyle";
import modalStyle from '../common/ModalStyle';

// core components
import { GridContainer, GridItem, Card, CardHeader, CardBody, Table, PdfReader, CardFooter} from '../common';
import { useReceivedActiveReferral } from './redux/receivedActiveReferral';
import { ReviewReferral } from '../referral';
import { Pagination } from '@mui/material';

const useStyles = makeStyles(styles);

export default function ReceiveReferral({tableHeaderName, status}) {
  const classes = useStyles();
  const pageSize = 10;
  const [refresh, doRefresh] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [openPDF, setOpenPDF] = useState(false);
  const handleOpenPDF = (index) => {
    setSelectedReferralId(referrals[index].referral_id);
    setOpenPDF(true);
  };
  const handleClosePDF = () => setOpenPDF(false);

  const [referral, setReferral] = useState(undefined);
  const [selectedReferralId, setSelectedReferralId] = useState(-1);
  const [openReview, setOpenReview] = useState(false);
  const handleOpenReview = (index) => {
    setReferral(referrals[index]);
    setSelectedReferralId(referrals[index].referral_id);
    setOpenReview(true);
  };
  const handleCloseReview = () => {
    setOpenReview(false);
  };

  const [referrals, setReferrals] = useState([]);
  const [referralsArr, setReferralsArr] = useState([]);

  const {receivedActiveReferral} = useReceivedActiveReferral();

  useEffect(() => {
    receivedActiveReferral(1, pageSize, status)
      .then((response) => {
        console.log(response.data);
        const tempReferralsArr = response.data.map((p) => {
          
          return status === "completed" ? [p.first_name + " " + p.last_name, p.create_date, p.clinic_name, p.status == 'sent' ? 'received':p.status, p.appointment_date, p.updated_by_first_name + " " + p.updated_by_last_name, p.last_update]:
          [p.first_name + " " + p.last_name, p.create_date, p.clinic_name, p.status == 'sent' ? 'received':p.status, p.updated_by_first_name + " " + p.updated_by_last_name, p.last_update]
        });
        setReferrals(response.data);
        setReferralsArr(tempReferralsArr);
        setPage(1);
        handleCloseReview();
      });

 },[status, refresh, receivedActiveReferral]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card style={{marginTop: '18px'}}>
            <CardHeader color="primary">
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <h4 className={classes.tableTitleWhite}>{tableHeaderName}</h4>
              </GridItem>
            </GridContainer>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={status === "completed" ? ["Patient", "Received Date", "Clinic Sender", "Status", "Appointment Date", "Last Updated By", "Last Update"] 
                : ["Patient", "Received Date", "Clinic Sender", "Status", "Last Updated By", "Last Update"]}
                tableData={referralsArr}
                tableActions={[{onClick: (index) => handleOpenReview(index), label:'Review'}, {onClick: (index) => handleOpenPDF(index), label:'View Files'}]}
              />
            </CardBody>
            <CardFooter style={{justifyContent: 'center', alignItems: 'center'}}>
              <Pagination count={pageCount} page={page} onChange={handleChange} />
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <Modal open={openPDF}
        onClose={handleClosePDF}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <PdfReader referral_id={selectedReferralId}/>
        </Box>
      </Modal>
      <Modal open={openReview}
        onClose={handleCloseReview}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <ReviewReferral referral_id={selectedReferralId} referral={referral} handleCloseReview={handleCloseReview} doRefreshList={doRefresh}/>
        </Box>
      </Modal>
      
    </div>
  );
};