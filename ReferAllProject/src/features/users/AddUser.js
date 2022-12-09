import React from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import { GridContainer, GridItem, Card, CardHeader, CardBody, CardFooter, CustomInput, Button, DropdownList } from '../common';
import { FormGroup, FormControlLabel, Checkbox, Typography} from "@material-ui/core";
import styles from "../common/CardStyle";

const useStyles = makeStyles(styles);

export default function AddUser(props) {
  const classes = useStyles();
  const { handleClose } = props;
  
  return (
    <div >
      <GridContainer justifyContent="center" alignItems="center" 
      style={{ maxWidth: '100%'}}>
        <GridItem xs={12} sm={12} md={12} style={{margin: '0'}}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add New User</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.tableSubTitleBlack}>User Details</h4>
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
                    id="phone"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem className={classes.manager} xs={12} sm={12} md={6}>
                  <DropdownList labelText="Select Role" id="role"/>
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
            </CardBody>
            <CardFooter style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Button color="primary">Add User</Button>
                  <Button onClick={handleClose}>Cancel</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

AddUser.propTypes = {
  handleClose: PropTypes.func
};
AddUser.defaultProps = {};