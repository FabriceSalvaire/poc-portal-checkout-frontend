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

/**************************************************************************************************/

import React, { useState } from "react";

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

/**************************************************************************************************/

export default function InputCurrencyAmount(props) {
    const [amount, set_amount] = useState(props.default_amount);
    const [amount_error, set_amount_error] = useState(false);

    const handle_change = (event) => {
        let value = event.target.value;
        // Accept: 123 123,4 123,45
        let is_float = value.match(/^[1-9][0-9]*([,][0-9]([0-9])?)?$/);
        let amount = Number.parseFloat(value);
        console.log("amount changed:", amount, is_float);
        set_amount_error(!is_float);
        set_amount(value);
        if (is_float)
            props.onChange(value);
    };

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
    //         onChange={handle_change('amount')}
    //         error={amount_error}
    //     />
    //     <FormHelperText id="standard-amount-helper-text">Amount</FormHelperText>
    // </FormControl>

    return (
        <TextField
            id={props.id}
            name={props.name}
            label={props.label}
            variant={props.variant}
            InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>
            }}
            required
            value={amount}
            onChange={handle_change}
            error={amount_error}
            helperText={amount_error ? "Invalid amount" :  ""}
        />
    );
}

InputCurrencyAmount.defaultProps = {
}