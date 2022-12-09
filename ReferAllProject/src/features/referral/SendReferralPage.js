import React, {useState}  from 'react';
import { Stepper, Step, StepLabel, MobileStepper } from "@material-ui/core";  
import { GridContainer, GridItem, Button, TabPanel } from '../common';
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { FindSpecialty, SelectClinic, PatientDemographics} from './';

// import PropTypes from 'prop-types';

const steps = [
  'Find Specialist',
  'Select Clinic',
  'Send Referral',
];

export default function SendReferralPage() {
  const [selectedStep, setSelectedStep] = useState(0);
  const [clinic, setClinic] = useState(undefined);
  const [specialty, setSpecialty] = useState(undefined);
  const maxSteps = steps.length;

  const handleNext = () => {
    if(selectedStep === maxSteps-1){
    } else {
      setSelectedStep((prevActiveStep) => selectedStep + 1);
    }
  };

  const handleBack = () => {
    setSelectedStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onClickFavorite = (data) => { 
    setSpecialty({'name':data.specialty_name, 'id': data.specialty_id});
    setClinic({'name':data.name, 'id': data.id, 'address': data.address});
    setSelectedStep((prevActiveStep) => selectedStep + 2);
  }

  const onClickClinic = (data) => { 
    setClinic({'name':data.name, 'id': data.id, 'address': data.address});
    handleNext();
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Stepper activeStep={selectedStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <TabPanel value={selectedStep} index={0}>
            <FindSpecialty handleNext={handleNext} setSpecialty={setSpecialty} onClickFavorite={onClickFavorite}/>
          </TabPanel>
          <TabPanel value={selectedStep} index={1}>
            <SelectClinic specialty={specialty} onClickClinic={onClickClinic}/>
          </TabPanel>
          <TabPanel value={selectedStep} index={2}>
            <PatientDemographics specialty={specialty} clinic={clinic}/>
          </TabPanel>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={selectedStep}
            nextButton={
              <Button
                color="primary"
                onClick={handleNext}
                disabled={selectedStep + 1 >= maxSteps || (selectedStep === 0  && specialty === undefined) || (selectedStep === 1  && clinic === undefined)}>
                Next<KeyboardArrowRight/>
              </Button>
            }
            backButton={
              <Button color="primary" onClick={handleBack} disabled={selectedStep === 0}>
                <KeyboardArrowLeft/>Back
              </Button>
            }
          />
        </GridItem>
      </GridContainer>
    </div>
  );
};
