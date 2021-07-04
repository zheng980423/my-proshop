import {
  Button,
  Typography,
  Box,
  Container,
  Radio,
  FormControlLabel,
  RadioGroup,
  Grid,
  useMediaQuery,
  Grow,
} from '@material-ui/core';
import * as Yup from 'yup';
import { Form, Formik, useField } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as PaymentSvg } from '../svgs/payment.svg';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const PaymentScreen = ({ location, history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress, paymentMethod } = cart;
  if (!shippingAddress) {
    history.push('/shipping');
  }
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  const smallScreen = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const dispatch = useDispatch();
  return (
    <Grow in>
      <Box
        style={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="lg">
          <CheckoutSteps activeStep={2}></CheckoutSteps>
          <Formik
            initialValues={{
              paymentMethod: paymentMethod,
            }}
            validationSchema={Yup.object().shape()}
            onSubmit={(data, { resetForm, setSubmitting }) => {
              setSubmitting(true);
              const { paymentMethod } = data;
              dispatch(savePaymentMethod(paymentMethod));
              resetForm();
              setSubmitting(false);
              history.push('/placeorder');
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <Grid container justify="center" align="center" spacing={3}>
                  <Grid item xs={12} md={6}>
                    <PaymentSvg
                      style={{
                        height: largeScreen
                          ? '500px'
                          : smallScreen
                          ? '400px'
                          : '200px',
                        width: largeScreen
                          ? '500px'
                          : smallScreen
                          ? '400px'
                          : '200px',
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <>
                      <Box style={{ margin: '24px 0' }}>
                        <Typography color="textPrimary" variant="h2">
                          支付详情
                        </Typography>
                        <Typography
                          color="textSecondary"
                          gutterBottom
                          variant="body2"
                        >
                          新选择您的支付方式
                        </Typography>
                      </Box>
                      <RadioGroup
                        aria-label="paymentMethod"
                        name="paymentMethod"
                        value={values.paymentMethod}
                      >
                        <MyRadio
                          name="paymentMethod"
                          type="radio"
                          value="PayPal"
                          label="PayPal or CreditCard"
                        />
                        <MyRadio
                          name="paymentMethod"
                          type="radio"
                          value="Stripe"
                          label="Stripe"
                        />
                      </RadioGroup>
                      <Box style={{ paddingBottom: '16px' }}>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          下一步
                        </Button>
                      </Box>
                    </>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </Grow>
  );
};

export default PaymentScreen;
