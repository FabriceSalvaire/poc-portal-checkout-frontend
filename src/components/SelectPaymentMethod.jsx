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

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

/**************************************************************************************************/

export default function SelectPaymentMethod(props) {
    const [method, set_method] = useState(props.default_method);

    const handle_change = (event, new_value) => {
        set_method(new_value);
        props.onChange(new_value);
    };

    return (
        <ToggleButtonGroup
            value={method}
            exclusive
            onChange={handle_change}
            aria-label="text alignment"
        >
            { props.methods.map((method, index) => (
                <ToggleButton key={props.key_prefix + index} value={method.id} aria-label="">
                    <span>{method.icon} {method.title}</span>
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}

SelectPaymentMethod.defaultProps = {
    key_prefix: "SelectPaymentMethod",
}
