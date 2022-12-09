import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { GridContainer, GridItem, Card, CardHeader, CardBody, CardFooter, Button } from '../common';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useGetReferralFiles } from './redux/getReferralFiles';
import { Divider } from '@material-ui/core';
import styles from "../common/CardStyle";

const useStyles = makeStyles(styles);

export default function PdfReader({referral_id}) {
  const classes = useStyles();
  const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [referralFiles, setReferralFiles] = useState([]);
  const {getReferralFiles, getReferralFilesError} = useGetReferralFiles();

  useEffect(() => {
    getReferralFiles(referral_id)
      .then((response) => {
        setReferralFiles(response.data);
        if(response.data.length > 0){
          setSelectedFile(`http://127.0.0.1:5000/api/referral/file/${response.data[0].saved_filename}`);
          setPageNumber(1);
        }
      });

 },[referral_id, getReferralFiles]);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};
  const onSelectFile = (index) =>{
    setSelectedFile(`http://127.0.0.1:5000/api/referral/file/${referralFiles[index].saved_filename}`);
    setPageNumber(1);
  };

	const goToPrevPage = () =>
		setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

	const goToNextPage = () =>
		setPageNumber(
			pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
		);
  return (
    <div >
      <GridContainer justifyContent="center" alignItems="center" style={{ maxWidth: '100%'}}>
        <GridItem xs={12} sm={12} md={12} style={{margin: '0'}}>
          <Card style={{width:'850px'}}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>View Files</h4>
            </CardHeader>
            <CardBody style={{width:'800px'}}>
            <GridContainer justifyContent="center" alignItems="center" >
                <GridItem xs={12} sm={12} md={12}>
                  <h4 style={{marginBottom: '0px'}}>Files</h4>
                  {referralFiles.map((prop, key) => {
                    return (
                      <Button key={key} color="transparent" onClick={() => onSelectFile(key)} style={{'textDecoration':'underline'}}>{prop.filename}</Button>
                    );
                  })}
                </GridItem>
              </GridContainer>
              <Divider></Divider>
              <GridContainer justifyContent="center" alignItems="center" style={{maxHeight:'400px', overflowY:'auto'}}>
                <GridItem xs={12} sm={12} md={12}>
                  <Document file={selectedFile} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} width={800} />
                  </Document>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter style={{justifyContent: 'center', alignItems: 'center'}}>
              <GridContainer justifyContent="center" alignItems="center" style={{ maxWidth: '100%'}}>
                <GridItem xs={12} sm={12} md={12} style={{textAlign:"center"}}>
                  Page {pageNumber} of {numPages}
                </GridItem>
                  <Button color="primary" onClick={goToPrevPage}>Prev</Button>
                  <Button color="primary" onClick={goToNextPage}>Next</Button>
                </GridContainer>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};