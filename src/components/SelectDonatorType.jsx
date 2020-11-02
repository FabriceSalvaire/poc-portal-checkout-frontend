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
import Tooltip from '@material-ui/core/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**************************************************************************************************/

import * as Config from "../Config";

/**************************************************************************************************/

export default function SelectDonatorType(props) {
    const [method, set_method] = useState("individual");

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
            <ToggleButton value="individual" aria-label="">
                <span><FontAwesomeIcon icon="address-card" /> {Config.messages.an_individual}</span>
            </ToggleButton>
            <Tooltip title={Config.messages.organisation_tip}>
                <ToggleButton value="organisation" aria-label="">
                    <span><FontAwesomeIcon icon="university" /> {Config.messages.an_organisation}</span>
                </ToggleButton>
            </Tooltip>
        </ToggleButtonGroup>
    );
}

SelectDonatorType.defaultProps = {
}
