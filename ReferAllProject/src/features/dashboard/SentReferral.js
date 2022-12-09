import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Modal } from "@material-ui/core";
import styles from "../common/CardStyle";
import modalStyle from '../common/ModalStyle';

// core components
import { GridContainer, GridItem, Card, CardHeader, CardBody, Table, PdfReader, CardFooter} from '../common';
import { useSentActiveReferral } from './redux/sentActiveReferral';
import { ReviewReferral, ViewReferralNotes } from '../referral';
import { Pagination } from '@mui/material';

const useStyles = makeStyles(styles);

export default function SentReferral({tableHeaderName, status}) {
  const classes = useStyles();
  const [refresh, doRefresh] = useState(0);
  const [selectedReferralId, setSelectedReferralId] = useState(-1);
  const [openPDF, setOpenPDF] = useState(false);
  const handleOpenPDF = (index) => {
    setSelectedReferralId(referrals[index].referral_id);
    setOpenPDF(true);
  };
  const handleClosePDF = () => setOpenPDF(false);

  const [openNotes, setOpenNotes] = useState(false);
  const handleOpenNotes = (index) => {
    setSelectedReferralId(referrals[index].referral_id);
    setOpenNotes(true);
  };
  const handleCloseNotes = () => setOpenNotes(false);

  const [referral, setReferral] = useState(undefined);
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
  const {sentActiveReferral} = useSentActiveReferral();

  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
    
  useEffect(() => {
    sentActiveReferral(1, pageSize, status)
      .then((response) => {
        console.log(response.data);
        const tempReferralsArr = response.data.map((p) => {
          return [p.first_name + " " + p.last_name, p.create_date, p.clinic_name, p.status, p.updated_by_first_name + " " + p.updated_by_last_name, p.last_update]
        });
        setReferrals(response.data);
        setReferralsArr(tempReferralsArr);
        setPage(1);
      });

 },[status, refresh, sentActiveReferral]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card style={{marginTop: '18px'}}>
            <CardHeader color="primary" >
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <h4 className={classes.tableTitleWhite}>{tableHeaderName}</h4>
              </GridItem>
            </GridContainer>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Patient", "Sent Date", "Sent To", "Status", "Last Updated By", "Last Updated"]}
                tableData={referralsArr}
                tableActions={[{onClick: (index) => handleOpenNotes(index), label:'View Notes'}, {onClick: (index) => handleOpenPDF(index), label:'View Files'}, {onClick: (index) => handleOpenReview(index), label:'Review', checkStatus: true}]}
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
      <Modal open={openNotes}
        onClose={handleCloseNotes}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <ViewReferralNotes referral_id={selectedReferralId} label={'View Notes'}/>
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
