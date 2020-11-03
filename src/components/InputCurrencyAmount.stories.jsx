/**************************************************************************************************/

import React from "react";

import InputCurrencyAmount from "./InputCurrencyAmount";

/**************************************************************************************************/

export default {
    component: InputCurrencyAmount,
    title: "InputCurrencyAmount",
};

const Template = args => <InputCurrencyAmount {...args} />;

export const empty_amount = Template.bind({});
empty_amount.args = {
    default_amount: "",
};

export const default_amount = Template.bind({});
default_amount.args = {
    default_amount: "123,45",
};

export const invalid_amount = Template.bind({});
invalid_amount.args = {
    default_amount: "123,",
};

export const dollars = Template.bind({});
dollars.args = {
    currency: "$",
    currency_position: "start",
    default_amount: 100,
};

