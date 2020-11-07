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

// Implement a selector for a payment method

/**************************************************************************************************/

import React, { useState } from "react";

import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';

/**************************************************************************************************/

export default function SelectPaymentMethod(props) {
    // state to enforce that at least one button must be active
    const [value, set_value] = useState(props.default_method);

    // Callback to forward
    const handle_change = (event, new_value) => {
        if (new_value !== null) {
            set_value(new_value);
            props.on_change(new_value);
        }
    };

    return (
        <ToggleButtonGroup
            value={value}
            exclusive
            onChange={handle_change}
            aria-label={props.messages.payment_method_fieldset_legend}
        >
            { props.methods.map((method, index) => (
                <ToggleButton key={props.key_prefix + index} value={method.id} /* aria-label="" */ >
                    <span>{method.icon} {method.title}</span>
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}

SelectPaymentMethod.defaultProps = {
    key_prefix: "SelectPaymentMethod",
}
