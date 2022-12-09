import React, {useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
// core components
import { GridContainer, GridItem, Card, CardHeader, CardBody, Table, Button, CustomInput} from '../common';
import styles from "../common/CardStyle";
import { useGetClinicsBySpecialty } from './redux/getClinicsBySpecialty';

const useStyles = makeStyles(styles);

export default function SelectClinic({specialty, onClickClinic}) {
  const classes = useStyles();

  const [clinicsArr, setClinicsArr] = useState([]);
  const [clinics, setClinics] = useState([]);
  const {getClinicsBySpecialty, getFavoriteClinicsPending, getFavoriteClinicsError} = useGetClinicsBySpecialty();

  useEffect(() => {
    console.log(specialty)
    getClinicsBySpecialty(specialty.id)
      .then((response) => {
        const updatedClinics = response.data.map((p) => {
          return { name: p.name, id: p.id, address: p.address, specialty_name: p.specialty_name, specialty_id:p.specialty_id };
        });
        const updatedClinicsArr = response.data.map((p) => {
          return [p.name, p.address, "Item 1, Item 2, etc."]
        });
        setClinics(updatedClinics);
        setClinicsArr(updatedClinicsArr);
      });

 },[specialty, getClinicsBySpecialty]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <h4 className={classes.tableTitleBlack}>Chosen Specialty: {specialty.name}</h4>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card >
            <CardHeader color="primary">
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <h4 className={classes.tableTitleWhite}>Available Providers</h4>
              </GridItem>
            </GridContainer>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Location", "Items Needed"]}
                tableData={clinicsArr}
                tableActions={[{onClick: (index) => onClickClinic(clinics[index]), label:'SELECT'}]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

SelectClinic.defaultProps = {};
