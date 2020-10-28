// -*- mode: rjsx; create-lockfiles: nil -*-
// .#Foo.js files confuse create-react-app start

/**************************************************************************************************/

import React, { useState, useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";

import "./App.scss";

/**************************************************************************************************/

const stripe_public_api_key = "pk_test_51HdczbBKQhCtA3D9aKEImtHELwbA2BGFlSnO4kfki1mjjs8xf0ZuptlEMy5WUn6S6YX2MUb1rUDm2pArLiV4qH9Y00b2ZFJAWk";

/**************************************************************************************************/

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripe_promise = loadStripe(stripe_public_api_key);

/**************************************************************************************************/

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "John Doe",
            email: "john.doe@example.com",
            amount: 50.00,
        };
        this.handle_change = this.handle_change.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
    }

    handle_change(event) {
        let field = event.target.name;
        let value = event.target.value;
        console.log(field, value);
        this.setState({
            ...this.state,
            [field]: value,
        });
    }

    // const handle_submit = async (event) => {
    async handle_submit(event) {
        event.preventDefault();

        const stripe = await stripe_promise;

        let int_amount = Math.trunc(parseFloat(this.state.amount) * 100);
        const data = {
            "date": "2020-10-26T14:24:12.709Z", // Fixme: 
            "int_amount": int_amount,
            "donator_type": "individual",
            "name": this.state.name,
            "email": this.state.email,
            // "callback_url": "string",
            "success_suffix_url": "?success=true",
            "cancel_suffix_url": "?canceled=true"
        };
        console.log(data);

        const response = await fetch("/api/v1/donations/", {
            method: "POST",
            body: JSON.stringify(data)
        });

        const donation = await response.json();

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

    render() {
        return (
            <div>
                <form id="checkout_form" onSubmit={this.handle_submit}>
                    <label for="name">Name</label>
                    <input name="name" type="text" value={this.state.name} onChange={this.handle_change} />
                    <label>Email</label>
                    <input name="email" type="email" value={this.state.email} onChange={this.handle_change} />
                    <label>Amount</label>
                    <span>
                        <input name="amount" type="number" min="1" step="any" value={this.state.amount} onChange={this.handle_change} />
                        <span className="currency">€</span>
                    </span>
                    <input type="submit" value="Checkout" />
                </form>
            </div>
        );
    }
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
            set_message(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    return message ? (
        <Message message={message} />
    ) : (
        <CheckoutForm />
    );
}
