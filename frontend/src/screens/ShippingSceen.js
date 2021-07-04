import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  useMediaQuery,
  Grow,
} from '@material-ui/core';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import { ReactComponent as AddressSvg } from '../svgs/address.svg';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ location, history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  const smallScreen = useMediaQuery(theme => theme.breakpoints.up('sm'));
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
        <Container maxWidth="md">
          <CheckoutSteps activeStep={1}></CheckoutSteps>
          <Formik
            initialValues={{
              address: shippingAddress.address,
              city: shippingAddress.city,
              postalCode: shippingAddress.postalCode,
              country: shippingAddress.country,
            }}
            validationSchema={Yup.object().shape({
              address: Yup.string().max(255).required('地址不能为空'),
              city: Yup.string().max(255).required('城市不能为空'),
              postalCode: Yup.number().required('邮政编码不能为空'),
              country: Yup.string().max(100).required('城市不能为空'),
            })}
            onSubmit={(data, { resetForm, setSubmitting }) => {
              setSubmitting(true);
              const { city, postalCode, address, country } = data;
              dispatch(
                saveShippingAddress({ address, city, postalCode, country })
              );
              // console.log(city, postalCode, address, country);
              setSubmitting(false);
              history.push('/payment');
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              touched,
              values,
            }) => (
              <Form>
                <Grid container justify="center" align="center" spacing={3}>
                  <Grid item xs={12} md={6}>
                    <AddressSvg
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
                        <Typography
                          color="textPrimary"
                          align="center"
                          variant="h2"
                        >
                          邮寄信息
                        </Typography>
                        <Typography
                          color="textSecondary"
                          align="center"
                          gutterBottom
                          variant="body2"
                        >
                          请完善您的邮寄信息
                        </Typography>
                      </Box>
                      <TextField
                        error={Boolean(touched.address && errors.address)}
                        fullWidth
                        helperText={touched.address && errors.address}
                        label="地址"
                        margin="normal"
                        name="address"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(touched.city && errors.city)}
                        fullWidth
                        helperText={touched.city && errors.city}
                        label="城市"
                        margin="normal"
                        name="city"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.city}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(touched.postalCode && errors.postalCode)}
                        fullWidth
                        helperText={touched.postalCode && errors.postalCode}
                        label="邮政编码"
                        margin="normal"
                        name="postalCode"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.postalCode}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(touched.country && errors.country)}
                        fullWidth
                        helperText={touched.country && errors.country}
                        label="国家"
                        margin="normal"
                        name="country"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.country}
                        variant="outlined"
                      />
                      <Box style={{ padingBottom: '16px', width: '100%' }}>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          style={{ width: '100%' }}
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

export default ShippingScreen;
