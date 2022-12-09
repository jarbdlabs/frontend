import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import StringFormatter from "../common/utils/StringFormatter";

import {useHistory} from 'react-router-dom';
import {useSignIn} from './redux/signIn';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {LOGIN_PAGE, ADMIN_PAGE} from './redux/constants';

import { GridContainer, GridItem, Card, CardHeader, CardBody, CardFooter, CustomInput, Button } from '../common';

import styles from "../common/CardStyle";

const useStyles = makeStyles(styles);

const validationSchema = Yup.object({
    email: Yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required(),
    password: Yup
        .string('Enter your password')
        .min(6, 'Minimum 6 characters length')
        .max(32, 'Maximum 32 characters length')
        .required(),
});

export default function SignIn() {
  const classes = useStyles();

  const history = useHistory();
  const {signIn} = useSignIn();
  const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          console.log(values);
            signIn({...values})
              .then((response) => {
                console.log("JARLOU");
                const token = response.token;
                
                if(token){
                  history.push(ADMIN_PAGE);
                } else {
                  history.push(LOGIN_PAGE);
                }
              });
        },
    });

  return (
    <div>
      <GridContainer spacing={8} justifyContent="center" alignItems="center" 
      style={{ minHeight: '100vh', maxWidth: '100%' }}>
        <GridItem xs={12} sm={12} md={4}>
              <form onSubmit={formik.handleSubmit}>
          <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Refer All</h4>
                <p className={classes.cardCategoryWhite}>Login</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12} 
                      style={{margin: '27px 0 0 0'}}>
                    <CustomInput
                      labelText="Email Address"
                      id="email"
                      type="email"
                      value={StringFormatter.removeWhitespace(formik.values.email)}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      isRequired={true}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Password"
                      id="password"
                      type="password"
                      value={StringFormatter.removeWhitespace(formik.values.password)}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      isRequired={true}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter style={{justifyContent: 'center', alignItems: 'center'}}>
                <Button color="primary" type="submit">Sign In</Button>
              </CardFooter>
          </Card>
              </form>
        </GridItem>
      </GridContainer>
    </div>
  );
};
