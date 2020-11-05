// -*- mode: rjsx; create-lockfiles: nil -*-
// .#Foo.js files confuse create-react-app start

/***************************************************************************************************
 *
 * Portal — 
 * Copyright (C) 2020 Fabrice Salvaire
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 **************************************************************************************************/

/**************************************************************************************************/

import React, { useState, useEffect } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

// https://www.google.com/recaptcha
//   https://developers.google.com/recaptcha/docs/v3
//   https://developers.google.com/recaptcha/docs/verify
//   <script src="https://www.google.com/recaptcha/api.js?render=reCAPTCHA_site_key"></script>
// https://github.com/t49tran/react-google-recaptcha-v3
//   https://www.npmjs.com/package/react-google-recaptcha-v3
import {
    GoogleReCaptchaProvider,
    GoogleReCaptcha,
    // useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

import { loadStripe } from "@stripe/stripe-js";

/**************************************************************************************************/

// import "./App.scss";

import * as Config from "./Config";
import { theme } from "./Theme";

import FieldsetWrapper from "./components/FieldsetWrapper";
import InputCurrencyAmount from "./components/InputCurrencyAmount";
import SelectCountry from "./components/SelectCountry";
import SelectCurrencyAmount from "./components/SelectCurrencyAmount";
import SelectDonatorType from "./components/SelectDonatorType";
import SelectPaymentMethod from "./components/SelectPaymentMethod";
import SelectDonationOccurrence from "./components/SelectDonationOccurrence";

import "./components/SvgIcons";

/**************************************************************************************************/

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripe_promise = loadStripe(Config.stripe_public_api_key);

/**************************************************************************************************/

function AmountField(props) {
    const classes = useFormStyle();
    const [preset_amount, set_preset_amount] = React.useState(Config.default_amounts[0]);
    const [custom_amount, set_custom_amount] = React.useState("");

    const handle_preset_amount_change = (amount) => {
        console.log(`handle_preset_amount_change ${amount}`);
        set_preset_amount(amount);
        set_custom_amount("");
        props.on_change(amount);
    };

    const handle_custom_amount_change = (amount) => {
        console.log(`handle_custom_amount_change ${amount}`);
        set_preset_amount(null);
        set_custom_amount(amount);
        props.on_change(amount);
    };

    return (
        <Grid className={classes.grid_padding_fix} container direction="row" spacing={2}>
            <Grid item>
                <SelectCurrencyAmount
                    label={Config.messages.amount_fieldset_legend}
                    amounts={Config.default_amounts}
                    amount={preset_amount}
                    on_change={handle_preset_amount_change}
                />
            </Grid>
            <Grid item>
                <InputCurrencyAmount
                    id="amount"
                    name="amount"
                    label={Config.messages.input_amount_label}
                    variant="standard"
                    helper_text={Config.messages.input_amount_helper_text}
                    error_text={Config.messages.invalid_amount}
                    amount={custom_amount}
                    on_change={handle_custom_amount_change}
                />
            </Grid>
        </Grid>
    );
}

/**************************************************************************************************/

const useFormStyle = makeStyles((theme) => ({
    // Fixme: negative margin ???
    // https://material-ui.com/components/grid/#negative-margin
    // https://blog.logrocket.com/the-material-ui-grid-system/#:~:text=Material%2DUI%20uses%20a%20negative,spacing%3D%7B0%7D%20(default)
    "grid_padding_fix": {
        padding: theme.spacing(1),
    },
}));

// class CheckoutForm extends React.Component {
function CheckoutForm() {
    const classes = useFormStyle();
    const [on_sr, set_on_sr] = React.useState(false);
    const [values, set_values] = React.useState({
        // Step 1
        donation_occurence: "once",
        amount: null,
        reduced_amount: "", // compute_reduced_amount(default_amount),
        // Step 2
        donator_type: "individual",
        email: "john.doe@example.com",
        forname: "John",
        name: "Doe",
        organisation_name: "",
        tax_receipt: true,
        address: "",
        complement: "",
        zip_code: "",
        city: "",
        country: "France",
        // Step 3
        payment_method: "card",
    });

    const toggle_on_sr = (event) => {
        set_on_sr(event.target.checked);
    }

    const set_value = (prop, value) => {
        console.log(`value changed: ${prop} = ${value}`);
        var other_values = {};
        switch (prop) {
        case "amount":
            // compute_reduced_amount(amount)
            break;
        }
        set_values({ ...values, ...other_values, [prop]: value });
    };

    const handle_change = (prop) => (value) => {
        console.log(`handle_change ${prop} ${value}`);
        set_value(prop, value);
    };

    const handle_change_event = (prop) => (event) => {
        let value = event.target.value;
        console.log(`handle_change ${prop} ${event} ${value}`);
        set_value(prop, value);
    };

    // handle_verify(token) {
    //     console.log("recaptcha token:", token);
    // }

    // // const handle_submit = async (event) => {
    // async handle_submit(event) {
    //     event.preventDefault();

    //     const stripe = await stripe_promise;

    //     let int_amount = Math.trunc(parseFloat(this.state.amount) * 100);
    //     const data = {
    //         "date": "2020-10-26T14:24:12.709Z", // Fixme: 
    //         "int_amount": int_amount,
    //         "donator_type": "individual",
    //         "name": this.state.name,
    //         "email": this.state.email,
    //         // "callback_url": "string",
    //         "success_suffix_url": "?success=true",
    //         "cancel_suffix_url": "?canceled=true"
    //     };
    //     console.log(data);

    //     const backend_url = "https://portal-demo-backend.fabrice-salvaire.fr";
    //     const response = await fetch(backend_url + "/api/v1/donations/", {
    //         method: "POST",
    //         body: JSON.stringify(data)
    //     });

    //     const donation = await response.json();
    //     console.log(donation);

    //     // When the customer clicks on the button, redirect them to Checkout.
    //     const result = await stripe.redirectToCheckout({
    //         sessionId: donation.stripe_session_id,
    //     });

    //     if (result.error) {
    //         // If `redirectToCheckout` fails due to a browser or network
    //         // error, display the localized error message to your customer
    //         // using `result.error.message`.
    //     }
    // };

    // <GoogleReCaptcha onVerify={this.handle_verify} />

    // Note: don't wrap part of the JSX this in:
    //   https://github.com/mui-org/material-ui/issues/783 — [TextField] loses focus on rerender
    // const Step1 = () => (
    //     <React.Fragment>
    //     </React.Fragment>
    // );

    return (
        <form
            /* id="" */
            /* name="donation-checkout-form" */
            autoComplete="on"
            /* novalidate */
            label="Form"
        > {/* onSubmit={this.handle_submit} */}
            <FormControlLabel
                control={
                    <Switch
                        name="accessibility-mode-checkbox"
                        color="primary"
                        checked={on_sr}
                        onChange={toggle_on_sr}
                    />
                }
                label={Config.messages.accessibility_checkbox_title}
            />

            {/* <Step1/> */}
            <Typography component="h1" variant="h5">
                {Config.messages.title1}
            </Typography>

            <Box mt={2} mb={2} ml={2}>
                <Grid
                    container
                    direction="column"
                    spacing={1}
                >
                    <FieldsetWrapper on_sr={on_sr} legend={Config.messages.donation_occurence_fieldset_legend}>
                        <Grid className={classes.grid_padding_fix} container direction="row" spacing={2}>
                            <Grid item>
                                <SelectDonationOccurrence
                                    init_choice={values.donation_occurence}
                                    on_change={handle_change("donation_occurence")}
                                />
                            </Grid>
                        </Grid>
                    </FieldsetWrapper>
                    <AmountField on_change={handle_change("amount")}/>
                </Grid>
            </Box>

            {/* <Step2/> */}
            <Typography component="h1" variant="h5">
                {Config.messages.title2}
            </Typography>

            <Box mt={3} mb={2} ml={2}>
                <Grid container direction="column" spacing={2}>
                    <Grid className={classes.grid_padding_fix} container direction="row" spacing={2}>
                        <Grid item>
                            <Typography component="h2" variant="h6">
                                {Config.messages.i_represent}
                            </Typography>
                        </Grid>
                        <SelectDonatorType
                            on_change={handle_change("donator_type")}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="email"
                            name="email"
                            label="Email Address"
                            autoComplete="email"
                            required
                            variant="standard"
                            type="email"
                            value={values.email}
                            onChange={handle_change_event("email")}
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="tax_receipt"
                                    color="primary"
                                    checked={values.tax_receipt}
                                    onChange={handle_change_event("tax_receipt")}
                                />
                            }
                            label={Config.messages.i_would_like_to_receive_a_tax_receipt}
                        />
                    </Grid>
                    { values.donator_type === "individual" ? (
                        <Grid className={classes.grid_padding_fix} container direction="row" spacing={2}>
                            <Grid item>
                                <TextField
                                    id="forname"
                                    name="forname"
                                    label={Config.messages.forname}
                                    autoComplete="forname"
                                    required
                                    variant="standard"
                                    value={values.forname}
                                    onChange={handle_change_event("forname")}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="name"
                                    name="name"
                                    label={Config.messages.name}
                                    autoComplete="name"
                                    required
                                    variant="standard"
                                    value={values.name}
                                    onChange={handle_change_event("name")}
                                />
                            </Grid>
                        </Grid>
                    ) : (
                        <TextField
                            id="organisation_name"
                            name="organisation_name"
                            label={Config.messages.organisation_name}
                            autoComplete="organisation_name"
                            required
                            variant="standard"
                            value={values.organisation_name}
                            onChange={handle_change_event("organisation_name")}
                        />

                    ) }
                    <Grid item>
                        <TextField
                            id="address"
                            name="address"
                            label={Config.messages.address}
                            autoComplete="address"
                            required
                            variant="standard"
                            value={values.address}
                            onChange={handle_change_event("address")}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="complement"
                            name="complement"
                            label={Config.messages.complement}
                            autoComplete="complement"
                            variant="standard"
                            value={values.complement}
                            onChange={handle_change_event("complement")}
                        />
                    </Grid>
                    <Grid className={classes.grid_padding_fix} container direction="row" spacing={2}>
                        <Grid item>
                            <TextField
                                id="zip_code"
                                name="zip_code"
                                label={Config.messages.zip_code}
                                autoComplete="zip_code"
                                required
                                variant="standard"
                                value={values.zip_code}
                                onChange={handle_change_event("zip_code")}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="city"
                                name="city"
                                label={Config.messages.city}
                                autoComplete="city"
                                required
                                variant="standard"
                                value={values.city}
                                onChange={handle_change_event("city")}
                            />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <InputLabel id="contry-label">{Config.messages.country}</InputLabel>
                            <SelectCountry
                                labelId="country-label"
                                id="country"
                                default_country={values.country}
                                on_change={handle_change("country")}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            {/* <p>Reduced amout : {values.reduced_amount} €</p> */}

            {/* <Step3/> */}
            <Typography component="h1" variant="h5">
                {Config.messages.title3}
            </Typography>

            <Box mt={2} ml={2}>
                <FieldsetWrapper on_sr={on_sr} legend={Config.messages.payment_method_fieldset_legend}>
                    <SelectPaymentMethod
                        default_method={Config.payment_methods[0].id}
                        methods={Config.payment_methods}
                        on_change={handle_change("payment_method")}
                    />
                </FieldsetWrapper>
            </Box>

            <Box mt={4}>
                <Grid container justify="center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        {Config.messages.submit_title(values.amout)}
                    </Button>
                </Grid>
            </Box>
        </form>
    );
}

/**************************************************************************************************/

const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);

/**************************************************************************************************/

export default function App() {
    const [message, set_message] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            set_message("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            set_message("Order canceled -- continue to shop around and checkout when you're ready.");
        }
    }, [message]);

    // <GoogleReCaptchaProvider
    //     reCaptchaKey="[Your recaptcha key]"
    //     language="[optional_language]"
    //     useRecaptchaNet="[optional_boolean_value]"
    //     scriptProps={{
    //         async: false, // optional, default to false,
    //         defer: false // optional, default to false
    //         appendTo: "head" // optional, default to "head", can be "head" or "body",
    //         nonce: undefined // optional, default undefined
    //     }}
    // >
    //     <YourApp />
    // </GoogleReCaptchaProvider>

    // Fixme: select theme normal or AAA

    return message ? (
        <Message message={message} />
    ) : (
        <ThemeProvider theme={theme}>
            <GoogleReCaptchaProvider
                reCaptchaKey={Config.recaptcha_site_key}
            >
                <CssBaseline />
                <Container component="main" maxWidth="lg">
                    <Paper elevation={3}>
                        <Box p={3}>
                            <CheckoutForm />
                        </Box>
                    </Paper>
                </Container>
            </GoogleReCaptchaProvider>
        </ThemeProvider>
    );
}
