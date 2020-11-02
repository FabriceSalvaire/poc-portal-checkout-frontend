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

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// "fade" is the public api for "alpha"
import { fade } from '@material-ui/core/styles/colorManipulator';

/**************************************************************************************************/

const default_theme = createMuiTheme();

// Note: It overrides the theme globaly !!! ???
//       Thus it must be applied at top level ...
export const theme = createMuiTheme({
    overrides: {
        // from material-ui/packages/material-ui/src/ToggleButtonGroup/ToggleButtonGroup.js
        MuiToggleButtonGroup: {
            // root: {
            //     display: 'inline-flex',
            //     borderRadius: default_theme.shape.borderRadius,
            // },
            /* Styles applied to the root element if `orientation="vertical"`. */
            // vertical: {
            //     flexDirection: 'column',
            // },
            /* Styles applied to the children. */
            // grouped: {},
            /* Styles applied to the children if `orientation="horizontal"`. */
            groupedHorizontal: {
                '&:not(:first-child)': {
                    // marginLeft: -1,
                    marginLeft: default_theme.spacing(2),
                    // borderLeft: '1px solid transparent',
                    borderLeft: `1px solid ${fade(default_theme.palette.action.active, 0.12)}`,
                    // borderTopLeftRadius: 0,
                    borderTopLeftRadius: default_theme.shape.borderRadius,
                    // borderBottomLeftRadius: 0,
                    borderBottomLeftRadius: default_theme.shape.borderRadius,
                },
                '&:not(:last-child)': {
                    // borderTopRightRadius: 0,
                    borderTopRightRadius: default_theme.shape.borderRadius,
                    // borderBottomRightRadius: 0,
                    borderBottomRightRadius: default_theme.shape.borderRadius,
                },
                '&.Mui-selected + &.Mui-selected': {
                    // borderLeft: 0,
                    borderLeft: '1px solid',
                    // marginLeft: 0,
                    marginLeft: default_theme.spacing(2),
                },
            },
            /* Styles applied to the children if `orientation="vertical"`. */
            // groupedVertical: {
            //     '&:not(:first-child)': {
            //         marginTop: -1,
            //         borderTop: '1px solid transparent',
            //         borderTopLeftRadius: 0,
            //         borderTopRightRadius: 0,
            //     },
            //     '&:not(:last-child)': {
            //         borderBottomLeftRadius: 0,
            //         borderBottomRightRadius: 0,
            //     },
            //     '&.Mui-selected + &.Mui-selected': {
            //         borderTop: 0,
            //         marginTop: 0,
            //     },
            // },
        },

        // MuiToggleButton: {
        //     root: {
        //         ...default_theme.typography.button,
        //         borderRadius: default_theme.shape.borderRadius,
        //         padding: 11,
        //         border: `1px solid ${alpha(default_theme.palette.action.active, 0.12)}`,
        //         color: alpha(default_theme.palette.action.active, 0.38),
        //         '&$selected': {
        //             color: default_theme.palette.action.active,
        //             backgroundColor: alpha(default_theme.palette.action.active, 0.12),
        //             '&:hover': {
        //                 backgroundColor: alpha(default_theme.palette.action.active, 0.15),
        //             },
        //         },
        //         '&$disabled': {
        //             color: alpha(default_theme.palette.action.disabled, 0.12),
        //         },
        //         '&:hover': {
        //             textDecoration: 'none',
        //             // Reset on mouse devices
        //             backgroundColor: alpha(default_theme.palette.text.primary, 0.05),
        //             '@media (hover: none)': {
        //                 backgroundColor: 'transparent',
        //             },
        //         },
        //     },
        //     /* Pseudo-class applied to the root element if `disabled={true}`. */
        //     disabled: {},
        //     /* Pseudo-class applied to the root element if `selected={true}`. */
        //     selected: {},
        //     /* Styles applied to the `label` wrapper element. */
        //     label: {
        //         width: '100%', // Ensure the correct width for iOS Safari
        //         display: 'inherit',
        //         alignItems: 'inherit',
        //         justifyContent: 'inherit',
        //     },
        //     /* Styles applied to the root element if `size="small"`. */
        //     sizeSmall: {
        //         padding: 7,
        //         fontSize: default_theme.typography.pxToRem(13),
        //     },
        //     /* Styles applied to the root element if `size="large"`. */
        //     sizeLarge: {
        //         padding: 15,
        //         fontSize: default_theme.typography.pxToRem(15),
        //     },
        // },
    },
});
