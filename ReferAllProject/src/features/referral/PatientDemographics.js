import React, {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import StringFormatter from "../common/utils/StringFormatter";
// core components
import { GridContainer, GridItem, Card, CardBody, CustomInput, Button, DatePickers, CardFooter } from '../common';
import { FormGroup, FormControlLabel, Checkbox, Typography, Divider} from "@material-ui/core";
import { AttachFile, PictureAsPdf } from '@material-ui/icons';
import styles from "../common/CardStyle";
import { DropzoneAreaBase } from 'material-ui-dropzone';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSendReferral } from './redux/sendReferral';
import { useHistory } from 'react-router-dom';
import { ADMIN_PAGE } from '../authentication/redux/constants';
import { Alert, Snackbar } from '@mui/material';

const useStyles = makeStyles(styles);
const validationSchema = Yup.object({
  // email: Yup
  //     .string('Enter your email')
  //     .email('Enter a valid email')
  //     .required(),
  // password: Yup
  //     .string('Enter your password')
  //     .min(6, 'Minimum 6 characters length')
  //     .max(32, 'Maximum 32 characters length')
  //     .required(),
});

export default function PatientDemographics({specialty, clinic}) {
  const classes = useStyles();
  const filesLimit = 10;
  const history = useHistory();
  const [fileObjects, setFileObjects] = useState([]);
  const {sendReferral, sendReferralSuccess, dismissSendReferral, sendReferralError} = useSendReferral();
  const closeSendReferral = () => {
    dismissSendReferral();
    history.push(ADMIN_PAGE);

  };
  const formik = useFormik({
    initialValues: {
        first_name: '',
        last_name: '',
        ssn: '',
        birthday: '',
        address: '',
        phone: '',
        policy: '',
        diagnosis: '',
        is_default: false
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
    }
  });

  const handleSendReferral = (values) => {
    values['clinic_receiver_id'] = clinic.id
    values['status'] = 'sent'
    console.log(values);
    console.log(fileObjects);
    const data = {
      'files': fileObjects,
      'json': JSON.stringify(values)
    };
    sendReferral(data)
      .then((response) => {
        console.log(response);
      });
  };

  const handleSaveDraft = (values) => {
    values['clinic_receiver_id'] = clinic.id;
    values['status'] = 'pending';
    console.log(values);
    console.log(fileObjects);
    const data = {
      'files': fileObjects,
      'json': JSON.stringify(values)
    };
    sendReferral(data)
      .then((response) => {
        console.log(response);
      });
  };

  const handlePreviewIcon = (fileObject, classes) => {
    const {type} = fileObject.file
    const iconProps = {
      className : classes.image,
    }

    switch (type) {
      case "application/pdf":
        return <PictureAsPdf {...iconProps} />
      default:
        return <AttachFile {...iconProps} />
    }
  }

  return (
    <div>
      <Snackbar open={sendReferralSuccess} autoHideDuration={3000} sx={{ height: "100%" }} onClose={closeSendReferral} anchorOrigin={{vertical: "top", horizontal: "center"}}>
        <Alert onClose={closeSendReferral} severity="success" sx={{  width: '600px' }}>
          Send Referral to {clinic.name} : Success 
        </Alert>
      </Snackbar>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <h4 className={classes.tableTitleBlack}>{clinic.name}</h4>
        <h5 className={classes.tableSubTitleBlack }>{specialty.name}</h5>
        <h5 className={classes.tableSubTitleBlack}>{clinic.address}</h5>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <form onSubmit={formik.handleSubmit}>
          <Card >
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <h4 className={classes.tableSubTitleBlack}>Patient Demographics</h4>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="First Name*"
                        id="first_name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isRequired={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                      labelText="Last Name*"
                      id="last_name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      isRequired={true}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="SSN*"
                        id="ssn"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={StringFormatter.removeWhitespace(formik.values.ssn)}
                        isRequired={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <DatePickers id={"birthday"} label={"Birthday"}
                      value={StringFormatter.removeWhitespace(formik.values.birthday)} 
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      formControlProps={{
                        fullWidth: true,
                      }}></DatePickers>
                    </GridItem>
                  </GridContainer>
                  
                  <CustomInput
                    labelText="Address"
                    id="address"
                    value={formik.values.address} 
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  
                  <CustomInput
                    labelText="Phone*"
                    id="phone"
                    value={StringFormatter.removeWhitespace(formik.values.phone)} 
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isRequired={true}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  <CustomInput
                    labelText="Policy"
                    id="policy"
                    value={formik.values.policy} 
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  <CustomInput
                    labelText="Diagnosis* Separated by comma"
                    id="diagnosis"
                    value={formik.values.diagnosis} 
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isRequired={true}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <h4 className={classes.tableSubTitleBlack}>Items Needed</h4>
                  <h5 className={classes.tableContentBlack}>Item 1</h5>
                  <h5 className={classes.tableContentBlack}>Item 2</h5>
                  <h5 className={classes.tableContentBlack}>Item 3</h5>
                  <Divider style={{width:'100%', marginTop: '15px', marginBottom:'15px'}} />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <DropzoneAreaBase
                  acceptedFiles={[".pdf"]}
                    fileObjects={fileObjects}
                    showPreviews={true}
                    showFileNamesInPreview={true}
                    showPreviewsInDropzone={false}
                    filesLimit={filesLimit}
                    onAdd={newFileObjs => {
                      setFileObjects([].concat(fileObjects, newFileObjs));
                    }}
                    onDelete={deleteFileObj => {
                      const index = fileObjects.indexOf(deleteFileObj);
                      fileObjects.splice(index,1);
                      console.log('onDelete', deleteFileObj);
                    }}
                    getPreviewIcon={handlePreviewIcon}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12} style={{marginTop: '30px'}}>
                <FormGroup>
                  <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          key={Math.random()}
                          type="checkbox"
                          name="is_default"
                          value={formik.values.is_default}
                          defaultChecked={formik.values.is_default}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                      }
                      label={<Typography component="p" variant="body2">I have supplied all required items requested by this clinic for a referral.</Typography>} />
                  </FormGroup>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter style={{justifyContent: 'center', alignItems: 'center'}}>
              <Button color="primary" onClick={() => handleSendReferral(formik.values)} disabled={!formik.values.is_default}>Send Referral</Button>
              <Button color="primary" onClick={() => handleSaveDraft(formik.values)} disabled={!formik.values.is_default}>Save Draft</Button>
            </CardFooter>
          </Card>

          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
};

PatientDemographics.propTypes = {};
PatientDemographics.defaultProps = {};
