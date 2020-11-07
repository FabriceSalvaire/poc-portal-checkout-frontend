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

// Implement a country selector

/**************************************************************************************************/

import React, { useState } from "react";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

/**************************************************************************************************/

import * as CountryList from "../CountryList";

/**************************************************************************************************/

export default function SelectCountry(props) {
    // Fixme: really usefull ???
    const default_country_number = CountryList.name_to_data[props.default_country].number;
    const [country, set_country] = useState(default_country_number);

    // Callback to forward
    const on_change = (event) => {
        let new_country_number = event.target.value;
        set_country(new_country_number);
        props.on_change(CountryList.number_to_data[new_country_number].name);
    };

    return (
        // Aria: check !!!
        <Select
            labelId={props.labelId}
            id={props.id}
            autoWidth
            value={country}
            onChange={on_change}
        >
            { props.country_list.map((country, index) => (
                <MenuItem key={props.key_prefix + index} value={country.number}>{country.name}</MenuItem>
            ))}
        </Select>
    );
}

SelectCountry.defaultProps = {
    key_prefix: "SelectCountry",
    country_list: CountryList.country_list_iso_data,
}
