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

// Implement a donator type

/**************************************************************************************************/

import React, { useState } from "react";

import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**************************************************************************************************/

import * as Config from "../Config";

/**************************************************************************************************/

export default function SelectDonatorType(props) {
    // state to enforce that at least one button must be active
    // Fixme: but we should do value={props.donator_type} !!!
    const [value, set_value] = useState(props.default_donator_type);

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
            aria-label={props.messages.i_represent}
        >
            <ToggleButton value="individual">
                <span><FontAwesomeIcon icon="address-card" /> {props.messages.an_individual}</span>
            </ToggleButton>
            <ToggleButton value="organisation">
                <Tooltip title={props.messages.organisation_tip}>
                    <span><FontAwesomeIcon icon="university" /> {props.messages.an_organisation}</span>
                </Tooltip>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

SelectDonatorType.defaultProps = {
    default_donator_type: "individual",
}
