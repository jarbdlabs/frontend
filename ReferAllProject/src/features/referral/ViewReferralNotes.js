import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { GridContainer, GridItem, Card, CardHeader, CardBody, CardFooter, Table } from '../common';
import styles from "../common/CardStyle";
import { useGetReferralNote } from './redux/getReferralNote';
import { Pagination } from '@mui/material';

const useStyles = makeStyles(styles);

export default function ViewReferralNotes({referral_id, label, refresh}) {
  const classes = useStyles();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [referralNoteArr, setReferralNoteArr] = useState([]);
  const {getReferralNote} = useGetReferralNote();

  useEffect(() => {
    getReferralNote(referral_id, 1, pageSize)
      .then((response) => {;
        const tempReferralsArr = response.data.map((p) => {
          return [p.note, p.date, p.name]
        });
        setReferralNoteArr(tempReferralsArr);
        setPageCount(response.page_count);
        setPage(1);
      });
 },[refresh, referral_id, getReferralNote]);

 const handleChange = (event, value) => {
  setPage(value);
  getReferralNote(referral_id, value, pageSize)
    .then((response) => {
      setPageCount(response.page_count);
      const tempReferralsArr = response.data.map((p) => {
        return [p.note, p.date, p.name]
      });
      setReferralNoteArr(tempReferralsArr);
    });
  };

  return (
    <div >
      <GridContainer justifyContent="center" alignItems="center" style={{ maxWidth: '100%'}}>
        <GridItem xs={12} sm={12} md={12} style={{margin: '0'}}>
          <Card style={{width: label !== undefined ? '850px':'800px'}}>
            {
              label !== undefined ? (
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{label}</h4>
              </CardHeader>) : null
            }
            <CardBody style={{width:label !== undefined ? '800px':'750px', maxHeight: label !== undefined ? '500px':'100%', overflowY:'auto'}}>
              <Table
                  tableHeaderColor="primary"
                  tableHead={["Note", "Created Date", "Created By"]}
                  tableData={referralNoteArr}
                />
            </CardBody>
            <CardFooter style={{justifyContent: 'center', alignItems: 'center'}}>
              <Pagination count={pageCount} page={page} onChange={handleChange} />
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};