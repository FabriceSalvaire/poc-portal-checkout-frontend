// -*- mode: rjsx; create-lockfiles: nil -*-

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

// Implement an input to enter a currency amount

/**************************************************************************************************/

import React, { useState } from "react";

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

/**************************************************************************************************/

export default function InputCurrencyAmount(props) {
    // check amount match the regexp
    const check_amount = (amount) => {
        if (!props.required && (amount === "" || amount == null))
            return true;
        return RegExp(props.float_regexp).test(amount);
    };

    const [is_invalid_amount, set_is_invalid_amount] = useState(!check_amount(props.amount));

    // Callback to forward
    const on_change = (event) => {
        let value = event.target.value;
        let is_float = check_amount(value);
        set_is_invalid_amount(!is_float);
        if (is_float)
            // Number.parseFloat(value);
            props.on_change(value);
    };

    return (
        <TextField
            id={props.id}
            name={props.name}
            label={props.label}
            variant={props.variant}
            InputProps={
                props.currency_position === "start" ?
                    { startAdornment: <InputAdornment position="start">{props.currency}</InputAdornment> }
                :
                    { endAdornment: <InputAdornment position="end">{props.currency}</InputAdornment> }
            }
            value={props.amount}
            required={props.required}
            onChange={on_change}
            error={is_invalid_amount}
            helperText={is_invalid_amount ? props.error_text :  props.helper_text}
        />
    );
}

InputCurrencyAmount.defaultProps = {
    // currency: "$",
    // currency_position: "start",
    currency: "€",
    currency_position: "end",
    label: "Amount",
    helper_text: "Enter an amount, e.g. 123,45",
    error_text: "Invalid amount",
    // Accept: 123 123,4 123,45
    float_regexp: "^[1-9][0-9]*([,][0-9]([0-9])?)?$",
    required: false,
    amount: "",
}

/**************************************************************************************************/

// <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
//     <Input
//         id="amount"
//         endAdornment={<InputAdornment position="end">€</InputAdornment>}
//         aria-describedby="standard-amount-helper-text"
//         inputProps={{
//             'aria-label': 'amount',
//         }}
//         required
//         value={values.amount}
//         onChange={on_change('amount')}
//         error={is_invalid_amount}
//     />
//     <FormHelperText id="standard-amount-helper-text">Amount</FormHelperText>
// </FormControl>

/**************************************************************************************************/
