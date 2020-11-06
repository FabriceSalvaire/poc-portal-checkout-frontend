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

// Implement a donation occurrence selector

/**************************************************************************************************/

import React, { useState } from "react";

import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**************************************************************************************************/

import * as Config from "../Config";

/**************************************************************************************************/

export default function SelectDonationOccurrence(props) {
    // state to enforce that at least one button must be active
    const [value, set_value] = useState(props.default_donation_occurrence);

    // Callback to forward
    const on_change = (event, new_value) => {
        if (new_value !== null) {
            set_value(new_value);
            props.on_change(new_value);
        }
    };

    return (
        <ToggleButtonGroup
            value={value}
            exclusive
            onChange={on_change}
            /* aria-label="" */
        >
            <ToggleButton value="once" /* aria-label="" */ >
                <span><FontAwesomeIcon icon="hand-holding-heart" /> {Config.messages.once}</span>
            </ToggleButton>
            <ToggleButton value="monthly" /* aria-label="" */ >
                <span><FontAwesomeIcon icon="hand-holding-medical" /> {Config.messages.monthly}</span>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

SelectDonationOccurrence.defaultProps = {
    default_donation_occurrence: "once",
}
