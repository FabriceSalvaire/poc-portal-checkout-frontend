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

export default function SelectCurrencyAmount(props) {
    const [amount, set_amount] = useState(props.default_amount);

    const handle_change = (event, new_value) => {
        set_amount(new_value);
        props.onChange(new_value);
    };

    return (
        <ToggleButtonGroup
            value={amount}
            exclusive
            onChange={handle_change}
            aria-label="text alignment"
        >
            { props.amounts.map((amount, index) => (
                <ToggleButton value={amount} aria-label="">
                    {amount} {props.currency}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}

SelectCurrencyAmount.defaultProps = {
    currency: "€",
}
