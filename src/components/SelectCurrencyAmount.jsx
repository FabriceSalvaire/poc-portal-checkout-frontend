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

// Implement an amount selector

/**************************************************************************************************/

import React from "react";

import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';

/**************************************************************************************************/

export default function SelectCurrencyAmount(props) {
    // Callback to forward
    const on_change = (event, new_value) => {
        props.on_change(new_value);
    };

    return (
        <ToggleButtonGroup
            value={props.amount}
            exclusive
            onChange={on_change}
            aria-label={props.label}
        >
            { props.amounts.map((amount, index) => (
                <ToggleButton key={props.key_prefix + index} value={amount} aria-label={amount + props.currency}>
                    {amount} {props.currency}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}

SelectCurrencyAmount.defaultProps = {
    key_prefix: "SelectCurrencyAmount",
    currency: "€",
}
