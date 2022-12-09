import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// import PropTypes from 'prop-types';
import { GridContainer, GridItem, Card, CardHeader, CardBody, CardFooter, Button, CustomInput } from '../common';
import { FormGroup, FormControlLabel, Checkbox, Typography } from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    color: "rgba(50,50,50,.8)",
    margin: "0",
    fontSize: "18px",
    marginTop: "20px",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    fontSize: "24px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function CreateReferral() {
  const classes = useStyles();

  return (
    <div>
      <GridContainer justifyContent="center" alignItems="center" 
      style={{ maxWidth: '100%'}}s>
        <GridItem xs={12} sm={12} md={12} style={{margin: '0'}}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create Referral</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.cardCategoryWhite}>Patient Details</h4>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Email address*"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name*"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name*"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Phone*"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Diagnosis"
                    id="diagnosis"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <FormGroup>
                    <FormControlLabel
                        id="is_default"
                        name="is_default"
                        control={
                          <Checkbox color="primary"/>
                        }
                        label={<Typography component="p" variant="body2">Send Email Confirmation</Typography>} />
                  </FormGroup>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.cardCategoryWhite}>Clinic Details</h4>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Name*"
                    id="clinic-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Specialty"
                    id="specialty"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Address*"
                    id="address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
               <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="City*"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="State"
                    id="state"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="List of Items Needed for a Referral <separate by comma>*"
                    id="referral"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 3,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Button color="primary">Register</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

CreateReferral.propTypes = {};
CreateReferral.defaultProps = {};
