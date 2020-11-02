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

// https://fontawesome.com/icons/coffee?style=solid
// https://fontawesome.com/how-to-use/on-the-web/using-with/react

import { library } from '@fortawesome/fontawesome-svg-core';

import {
    faAddressCard,
    faBuilding,
    faCreditCard,
    faEnvelope,
    faHandHoldingHeart,
    faHandHoldingMedical,
    faMapMarker,
    faMoneyCheck,
    faQuestionCircle,
    faUniversity,
} from '@fortawesome/free-solid-svg-icons';

import {
} from '@fortawesome/free-regular-svg-icons';

import {
    faPaypal,
} from '@fortawesome/free-brands-svg-icons';

/**************************************************************************************************/

library.add(
    faAddressCard,
    faBuilding,
    faCreditCard,
    faEnvelope,
    faHandHoldingHeart,
    faHandHoldingMedical,
    faMapMarker,
    faMoneyCheck,
    faPaypal,
    faQuestionCircle,
    faUniversity,
);

// <FontAwesomeIcon icon={["fas", "coffee"]} />
// <FontAwesomeIcon icon={["far", "coffee"]} />
// <FontAwesomeIcon icon={["fab", "github"]} />
// const element = <FontAwesomeIcon icon={faCoffee} />
