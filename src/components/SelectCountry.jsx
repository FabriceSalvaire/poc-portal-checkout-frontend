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

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

/**************************************************************************************************/

import * as CountryList from "../CountryList";

/**************************************************************************************************/

export default function SelectCountry(props) {
    const country_number = CountryList.name_to_data[props.default_country].number;

    const [country, set_country] = useState(country_number);

    const handle_change = (event) => {
        let new_country_number = event.target.value;
        set_country(new_country_number);
        props.onChange(CountryList.number_to_data[new_country_number].name);
    };

    return (
        <Select
            labelId={props.labelId}
            id={props.id}
            value={country}
            onChange={handle_change}
        >
            { props.country_list.map((country, index) => (
                <MenuItem value={country.number}>{country.name}</MenuItem>
            ))}
        </Select>
    );
}

SelectCountry.defaultProps = {
    country_list: CountryList.country_list_iso_data,
}
