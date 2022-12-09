import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Box, Modal } from "@material-ui/core";
import styles from "../common/CardStyle";
import modalStyle from '../common/ModalStyle';

// core components
import { GridContainer, GridItem, Card, CardHeader, CardBody, Button, Table } from '../common';

const useStyles = makeStyles(styles);

export default function ClinicsPage() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { console.log("handle Open"); setOpen(true); };
  const handleClose = () => setOpen(false);

  return (
    <div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h4 className={classes.cardTitleWhite}>Manage Clinics</h4>
            </GridItem>
            <GridItem xs={12} sm={12} md={4} style={{display: 'grid', justifyContent: 'end', alignItems: 'end'}}>
              <Button color="rose" onClick={handleOpen}>Add Clinic</Button>
            </GridItem>
          </GridContainer>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Email", "Clinic", "Role"]}
              tableData={[
                ["Ben Hubbard", "ben@gmail.com", "US Clinic", "Admin"],
                ["Jarlou Valenzuela", "jarlouv@gmail.com", "PH Clinic", "PSR"],
              ]}
              tableActions={[{onClick: (index) => handleOpen(), label:'Deactivate'}, {onClick: (index) => handleOpen(), label:'Update'}]}
            />
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
      <Modal open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          {/* <AddUser handleClose={handleClose}/> */}
        </Box>
      </Modal>
    </div>
  );
};

ClinicsPage.propTypes = {};
ClinicsPage.defaultProps = {};
