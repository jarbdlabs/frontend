import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Box, Modal } from "@material-ui/core";

// core components
import { GridContainer, GridItem, Card, CardHeader, CardBody, Button, Table } from '../common';

import AddUser from "./AddUser";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: 'rgb(255, 255, 255, 0.0)',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles(styles);

export default function UsersPage() {
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
              <h4 className={classes.cardTitleWhite}>Manage Users</h4>
            </GridItem>
            <GridItem xs={12} sm={12} md={4} style={{display: 'grid', justifyContent: 'end', alignItems: 'end'}}>
              <Button color="rose" onClick={handleOpen}>Add User</Button>
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
          <AddUser handleClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
};

UsersPage.propTypes = {};
UsersPage.defaultProps = {};