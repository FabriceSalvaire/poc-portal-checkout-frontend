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

/***************************************************************************************************
 *
 * WAI-ARIA was checked with
 *   - Google Lighthouse
 *   - https://github.com/ziolko/aria-devtools on Chrome
 *   - https://wave.webaim.org on Chrome (found issues on country selector ???)
 *   => But it must be commissioned by relevant users of accessibility technologies !
 *
 **************************************************************************************************/

/**************************************************************************************************/

import React, { useState, useEffect } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import CssBaseline from "@material-ui/core/CssBaseline";
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
// https://styled-system.com
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';

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
import { accessibility_theme } from "./AccessibilityTheme";

// import FieldsetWrapper from "./components/FieldsetWrapper";
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

const useFormStyle = makeStyles((theme) => ({
    // Fixme: negative margin ???
    // https://material-ui.com/components/grid/#negative-margin
    // https://blog.logrocket.com/the-material-ui-grid-system/#:~:text=Material%2DUI%20uses%20a%20negative,spacing%3D%7B0%7D%20(default)
    "grid_padding_fix": {
        padding: theme.spacing(1),
    },
}));

/**************************************************************************************************/

function AmountField(props) {
    // Manage preset and custom amount fields
    const classes = useFormStyle();

    // Internal states
    const [preset_amount, set_preset_amount] = useState(props.default_preset_amount);
    const [custom_amount, set_custom_amount] = useState("");

    // Forward change
    const emit_amount_change = (amount, is_valid) => {
        props.on_change(amount, is_valid);
    };

    // Callback
    const on_preset_amount_change = (amount) => {
        console.log(`on_preset_amount_change ${amount}`);
        set_preset_amount(amount);
        set_custom_amount("");
        emit_amount_change(amount, true);
    };

    // Callback
    const on_custom_amount_change = (amount, is_valid) => {
        console.log(`on_custom_amount_change ${amount}`);
        set_preset_amount(null);
        set_custom_amount(amount);
        emit_amount_change(amount, is_valid);
    };

    return (
        <Grid className={classes.grid_padding_fix} container direction="row" spacing={2}>
            <Grid item>
                <SelectCurrencyAmount
                    label={Config.messages.amount_fieldset_legend}
                    amounts={Config.default_amounts}
                    amount={preset_amount}
                    on_change={on_preset_amount_change}
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
                    on_change={on_custom_amount_change}
                />
            </Grid>
        </Grid>
    );
}

/**************************************************************************************************/

function Step1(props) {
    const classes = useFormStyle();

    // Callback to forward change
    const on_change = (prop) => (value) => {
        // console.log(`on_change ${prop} ${value}`);
        props.on_change(prop, value);
    };

    const on_amount_change = (amount, is_valid) => {
        props.on_amount_change(amount, is_valid);
    };

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
                {Config.messages.title1}
            </Typography>

            <Box mt={2} mb={2} ml={2}>
                <Grid
                    container
                    direction="column"
                    spacing={1}
                >
                    <Grid className={classes.grid_padding_fix} container direction="row" spacing={2}>
                        <Grid item>
                            <SelectDonationOccurrence
                                messages={Config.messages}
                                default_donation_occurrence={props.values.donation_occurrence}
                                on_change={on_change("donation_occurrence")}
                            />
                        </Grid>
                    </Grid>
                    <AmountField
                        default_preset_amount={props.values.amount}
                        on_change={on_amount_change}
                    />
                </Grid>
            </Box>
        </React.Fragment>
    );
}

/**************************************************************************************************/

function Step2(props) {
    const classes = useFormStyle();

    const set_value = (prop, value) => {
        // console.log(`value changed: ${prop} = ${value}`);
        props.on_change(prop, value);
    };

    // Callback
    const on_change = (prop) => (value) => {
        // console.log(`on_change ${prop} ${value}`);
        set_value(prop, value);
    };

    // Callback
    const on_change_event = (prop) => (event) => {
        let value = event.target.value;
        // console.log(`on_change ${prop} ${event} ${value}`);
        set_value(prop, value);
    };

    const on_toggle_event = (prop) => (event) => {
        let value = event.target.checked;
        // console.log(`on_change ${prop} ${event} ${value}`);
        set_value(prop, value);
    };

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
                {Config.messages.title2}
            </Typography>

            <Box mt={3} mb={2} ml={2} width="50em">
                <Grid container direction="column" spacing={2}>
                    <Grid className={classes.grid_padding_fix} container direction="row" spacing={2}>
                        <Grid item>
                            <Typography component="h2" variant="h6" aria-hidden="true">
                                {Config.messages.i_represent}
                            </Typography>
                        </Grid>
                        <SelectDonatorType
                            messages={Config.messages}
                            default_donator_type={props.values.default_donator_type}
                            on_change={on_change("donator_type")}
                        />
                    </Grid>
                    {/* <Grid item> */}
                    {/*     <fieldset> */}
                    {/*         <legend>{Config.messages.i_represent}</legend> */}
                    {/*         <SelectDonatorType */}
                    {/*             messages={Config.messages} */}
                    {/*             default_donator_type={props.values.default_donator_type} */}
                    {/*             on_change={on_change("donator_type")} */}
                    {/*         /> */}
                    {/*     </fieldset> */}
                    {/* </Grid> */}
                    <Grid item>
                        <TextField
                            id="email"
                            name="email"
                            label="Email Address"
                            autoComplete="email"
                            required
                            variant="standard"
                            fullWidth
                            type="email"
                            value={props.values.email}
                            onChange={on_change_event("email")}
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="tax_receipt"
                                    color="primary"
                                    checked={props.values.tax_receipt}
                                    onChange={on_toggle_event("tax_receipt")}
                                />
                            }
                            label={Config.messages.i_would_like_to_receive_a_tax_receipt}
                        />
                    </Grid>
                    { props.values.donator_type === "individual" ? (
                        <Grid className={classes.grid_padding_fix} container direction="row" spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="forname"
                                    name="forname"
                                    label={Config.messages.forname}
                                    autoComplete="forname"
                                    required
                                    variant="standard"
                                    fullWidth
                                    value={props.values.forname}
                                    onChange={on_change_event("forname")}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label={Config.messages.name}
                                    autoComplete="name"
                                    required
                                    variant="standard"
                                    fullWidth
                                    value={props.values.name}
                                    onChange={on_change_event("name")}
                                />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item>
                            <TextField
                                id="organisation_name"
                                name="organisation_name"
                                label={Config.messages.organisation_name}
                                autoComplete="organisation_name"
                                required
                                variant="standard"
                                fullWidth
                                value={props.values.organisation_name}
                                onChange={on_change_event("organisation_name")}
                            />
                        </Grid>
                    ) }
                    <Grid item>
                        <TextField
                            id="address"
                            name="address"
                            label={Config.messages.address}
                            autoComplete="address"
                            required
                            variant="standard"
                            fullWidth
                            value={props.values.address}
                            onChange={on_change_event("address")}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="complement"
                            name="complement"
                            label={Config.messages.complement}
                            autoComplete="complement"
                            variant="standard"
                            fullWidth
                            value={props.values.complement}
                            onChange={on_change_event("complement")}
                        />
                    </Grid>
                    <Grid className={classes.grid_padding_fix} container direction="row" spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                id="zip_code"
                                name="zip_code"
                                label={Config.messages.zip_code}
                                autoComplete="zip_code"
                                required
                                variant="standard"
                                fullWidth
                                value={props.values.zip_code}
                                onChange={on_change_event("zip_code")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="city"
                                name="city"
                                label={Config.messages.city}
                                autoComplete="city"
                                required
                                variant="standard"
                                fullWidth
                                value={props.values.city}
                                onChange={on_change_event("city")}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel id="contry-label">{Config.messages.country}</InputLabel>
                            <SelectCountry
                                labelId="country-label"
                                id="country"
                                default_country={props.values.country}
                                on_change={on_change("country")}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}

/**************************************************************************************************/

function Step3(props) {
    const on_change = (prop) => (value) => {
        // console.log(`on_change ${prop} ${value}`);
        props.on_change(prop, value);
    };

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
                {Config.messages.title3}
            </Typography>

            <Box mt={2} ml={2}>
                <SelectPaymentMethod
                    messages={Config.messages}
                    default_method={props.values.payment_method}
                    methods={Config.payment_methods}
                    on_change={on_change("payment_method")}
                />
            </Box>
        </React.Fragment>
    );
}

/**************************************************************************************************/

const step_defaults_prod = {
    // Step1
    // donation_occurrence: "once",
    donation_occurrence: SelectDonationOccurrence.defaultProps.default_donation_occurrence,
    amount: Config.default_amounts[0],
    is_amount_valid: true,

    // Step2
    email: "",
    donator_type: SelectDonatorType.defaultProps.default_donator_type,
    // donator_type: "individual",
    forname: "",
    name: "",
    organisation_name: "",
    tax_receipt: true,
    address: "",
    complement: "",
    zip_code: "",
    city: "",
    country: "France",

    // Step3
    payment_method: Config.payment_methods[0].id,
};

const step_defaults_dev = {
    // Step1
    // donation_occurrence: "once",
    donation_occurrence: SelectDonationOccurrence.defaultProps.default_donation_occurrence,
    amount: Config.default_amounts[0],
    is_amount_valid: true,

    // Step2
    email: "john.doe@example.com",
    donator_type: SelectDonatorType.defaultProps.default_donator_type,
    // donator_type: "individual",
    forname: "John",
    name: "Doe",
    organisation_name: "",
    tax_receipt: true,
    address: "1 road",
    complement: "",
    zip_code: "75000",
    city: "Paris",
    country: "France",

    // Step3
    payment_method: Config.payment_methods[0].id,
};

// const step_defaults = step_defaults_prod;
const step_defaults = step_defaults_dev;

/**************************************************************************************************/

function CheckoutForm(props) {
    // Fixme: state design
    //   We must store field values in a state
    //   we must pass default values, else we would have to get it from the DOM ...
    const [values, set_values] = useState(step_defaults);

    const on_change = (prop, value) => {
        console.log(`on_change ${prop} ${value}`);
        set_values({...values, [prop]: value});
    };

    const on_amount_change = (value, is_valid) => {
        console.log(`on_amount_change ${value} ${is_valid}`);
        set_values({...values, amount: value, is_amount_valid: is_valid});
    };

    const on_submit = (event) => {
        event.preventDefault();
        // console.log("Form values are", values);
        props.on_submit(values);
    };

    return (
        <React.Fragment>
            <form
        /* id="" */
        /* name="donation-checkout-form" */
        /* novalidate */
                autoComplete="on"
                label="Form"
                onSubmit={on_submit}
            >
                <Step1 values={values} on_change={on_change} on_amount_change={on_amount_change} />
                <Step2 values={values} on_change={on_change} />
                <Config.messages.defiscalisation_text donator_type={values.donator_type} amount={values.amount} />
                <Step3 values={values} on_change={on_change} />

                <Box mt={4}>
                    <Grid container justify="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={!values.is_amount_valid}
                        >
                            {Config.messages.submit_title(values.amount)}
                        </Button>
                    </Grid>
                </Box>
            </form>
        </React.Fragment>
    );
}

/**************************************************************************************************/

const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);

/**************************************************************************************************/

function CheckoutProcess(props) {
    const [data, set_data] = useState({});
    const [checkout_state, set_checkout_state] = useState("form");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            set_checkout_state("stripe_sucess");
        }

        if (query.get("canceled")) {
            set_checkout_state("stripe_canceled");
        }
    }, [checkout_state]);

    const on_submit = (values) => {
        console.log("Form values are", values);
        set_checkout_state("captcha");
        set_data(values);
    };

    const redirect_to_stripe = async () => {
        console.log("Redirect to Stripe", data);

        const stripe = await stripe_promise;

        let now = new Date();
        let int_amount = Math.trunc(parseFloat(data.amount) * 100);
        const backend_data = {
            date: now.toISOString(),
            int_amount: int_amount,
            donator_type: data.donator_type,
            name: data.name,
            email: data.email,
            callback_url: "string",
            success_suffix_url: "?success=true",
            cancel_suffix_url: "?canceled=true"
        };
        console.log(backend_data);

        // const backend_url = "https:portal-demo-backend.fabrice-salvaire.fr";
        const backend_url = "http://127.0.0.1:8000";
        const response = await fetch(backend_url + "/api/v1/donations/", {
            method: "POST",
            body: JSON.stringify(backend_data)
        });

        const donation = await response.json();
        // Fixme: handle error
        // {"detail":[
        //   {"loc":["body","date"],"msg":"field required","type":"value_error.missing"},
        //   {"loc":["body","int_amount"],"msg":"field required","type":"value_error.missing"}
        // ]}
        console.log(donation);

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: donation.stripe_session_id,
        });

        if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
        }
    };

    const on_recaptcha_verify = (token) => {
        console.log("recaptcha token:", token);
        set_checkout_state("stripe");
        set_data({ ...data, recaptcha_token: token });
        redirect_to_stripe();
    };

    const Span = styled('span')(compose(spacing));

    switch (checkout_state) {
    case "form":
        return ( <CheckoutForm on_submit={on_submit}/> );

    case "captcha":
        return (
            <Container maxWidth="lg">
                <p>
                    <CircularProgress />
                    <Span ml={3}>Verify Captcha ...</Span>
                </p>
                <GoogleReCaptcha onVerify={on_recaptcha_verify} />
            </Container>
        );

    case "stripe":
        return (
            <Container maxWidth="lg">
                <p>
                    <CircularProgress />
                    <Span ml={3}>You will be redirected to <strong>stripe.com</strong> to checkout ...</Span>
                </p>
            </Container>
        );

    case "stripe_sucess":
        // "Order canceled -- continue to shop around and checkout when you're ready."
        const message = "Order placed! You will receive an email confirmation.";
        return (
            <Message message={message} />
        );

    default:
    }
};

/**************************************************************************************************/

export default function App() {
    const [on_accessibility_mode, set_on_accessibility_mode] = useState(false);

    const toggle_accessibility_mode = (event) => {
        set_on_accessibility_mode(event.target.checked);
    };

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

    return (
        <ThemeProvider theme={on_accessibility_mode ? accessibility_theme : theme}>
             <GoogleReCaptchaProvider
                reCaptchaKey={Config.recaptcha_site_key}
             >
                {/* <CssBaseline /> */}
                 <ScopedCssBaseline>
                     <Container component="main" maxWidth="lg">
                         <Paper elevation={3}>
                             <Box p={3}>
                                 <Box mb={3}>
                                     <FormControlLabel
                                         control={
                                             <Switch
                                                 name="accessibility-mode-checkbox"
                                                 color="primary"
                                                 checked={on_accessibility_mode}
                                                 onChange={toggle_accessibility_mode}
                                             />
                                         }
                                         label={Config.messages.accessibility_checkbox_title}
                                     />
                                 </Box>
                                 <CheckoutProcess />
                             </Box>
                         </Paper>
                     </Container>
                 </ScopedCssBaseline>
             </GoogleReCaptchaProvider>
        </ThemeProvider>
    );
}
