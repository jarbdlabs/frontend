import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from "@material-ui/core/styles";
// core components
import { Search } from "@material-ui/icons";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { GridContainer, GridItem, Card, CardHeader, CardBody, Table, Button, CustomInput} from '../common';
import styles from "../common/CardStyle";
import { useGetSpecialties } from './redux/getSpecialties';
import { useGetFavoriteClinics } from './redux/getFavoriteClinics';

const useStyles = makeStyles(styles);

export default function FindSpecialty({
  handleNext,
  setSpecialty,
  onClickFavorite
}) {
  const classes = useStyles();
  const keyword_search = "";
  const [options, setOptions] = useState([]);
  const [clinicsArr, setClinicsArr] = useState([]);
  const [clinics, setClinics] = useState([]);
  const {getSpecialties, getSpecialtiesPending, getSpecialtiesError} = useGetSpecialties();
  const {getFavoriteClinics, getFavoriteClinicsPending, getFavoriteClinicsError} = useGetFavoriteClinics();

  useEffect(() => {
    getSpecialties(keyword_search)
      .then((response) => {
        const updatedOptions = response.data.map((p) => {
          return { name: p.name, id: p.id };
        });
        setOptions(updatedOptions);
      });

    getFavoriteClinics()
      .then((response) => {
        const updatedClinics = response.data.map((p) => {
          return { name: p.name, id: p.id, address: p.address, specialty_name: p.specialty_name, specialty_id:p.specialty_id };
        });
        const updatedClinicsArr = response.data.map((p) => {
          return [p.name, p.address, p.specialty_name]
        });
        setClinics(updatedClinics);
        setClinicsArr(updatedClinicsArr);
      });

 },[getSpecialties, getFavoriteClinics]);


  const fetchOptions = (keyword_search) => {
    getSpecialties(keyword_search)
      .then((response) => {
        const updatedOptions = response.data.map((p) => {
          return { name: p.name, id: p.id };
        });
        setOptions(updatedOptions);
      });
  };

  const onInputChange = (event, value, reason) => {
    if(reason == 'reset'){
      let selected_option = options.find(o => o.name === value);
      setSpecialty(selected_option);
      handleNext();
    } else {
      fetchOptions(value);
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <div className={classes.searchWrapper}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onInputChange={onInputChange}
            options={options.map((option) => option.name)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search by Specialty" />}
          />
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card >
            <CardHeader color="primary">
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <h4 className={classes.tableTitleWhite}>Your Favorites</h4>
              </GridItem>
            </GridContainer>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Specialty", "Location"]}
                tableData={clinicsArr}
                tableActions={[{onClick: (index) => onClickFavorite(clinics[index]), label:'SELECT'}]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};
