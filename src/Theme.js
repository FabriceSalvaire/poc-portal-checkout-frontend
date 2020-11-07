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

import { createMuiTheme } from '@material-ui/core/styles';
// import common from '@material-ui/core/colors/common';
// import grey from '@material-ui/core/colors/grey';
import { alpha } from '@material-ui/core/styles/colorManipulator';

/**************************************************************************************************/

const default_theme = createMuiTheme();

const theme_palette = {
    // The colors used to style the text.
    // text: {
    //     // The most important text.
    //     primary: 'rgba(0, 0, 0, 0.87)',
    //     // Secondary text.
    //     secondary: 'rgba(0, 0, 0, 0.54)',
    //     // Disabled text have even lower visual prominence.
    //     disabled: 'rgba(0, 0, 0, 0.38)',
    // },
    // // The color used to divide different elements.
    // divider: 'rgba(0, 0, 0, 0.12)',
    // // The background colors used to style the surfaces.
    // // Consistency between these values is important.
    // background: {
    //     paper: common.white,
    //     default: grey[50],
    // },
    // The colors used to style the action elements.
    action: {
        // The color of an active action like an icon button.
        // ==> Accessibility contrast issue 4.28 !
        // active: 'rgba(0, 0, 0, 0.54)',
        active: 'rgba(0, 0, 0, 0.70)',
        // // The color of an hovered action.
        // hover: 'rgba(0, 0, 0, 0.04)',
        // hoverOpacity: 0.04,
        // // The color of a selected action.
        // selected: 'rgba(0, 0, 0, 0.08)',
        // selectedOpacity: 0.08,
        // // The color of a disabled action.
        // disabled: 'rgba(0, 0, 0, 0.26)',
        // // The background color of a disabled action.
        // disabledBackground: 'rgba(0, 0, 0, 0.12)',
        // disabledOpacity: 0.38,
        // focus: 'rgba(0, 0, 0, 0.12)',
        // focusOpacity: 0.12,
        // activatedOpacity: 0.12,
    },
}

// Note: It overrides the theme globaly !!! ???
//       Thus it must be applied at top level ...
export const theme = createMuiTheme({
    palette: theme_palette,

    components: {
        // from material-ui/packages/material-ui/src/ToggleButtonGroup/ToggleButtonGroup.js
        MuiToggleButtonGroup: {
            styleOverrides: {
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
                        borderLeft: `1px solid ${alpha(default_theme.palette.action.active, 0.12)}`,
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
        },

        MuiToggleButton: {
            styleOverrides: {
                root: {
                    // ...default_theme.typography.button,
                    // borderRadius: default_theme.shape.borderRadius,
                    // padding: 11,
                    // border: `1px solid ${alpha(theme_palette.action.active, 0.12)}`,
                    // ==> Accessibility contrast issue !
                    // color: alpha(default_theme.palette.action.active, 0.38),
                    color: alpha(theme_palette.action.active, 0.6),
                    // '&$selected': {
                    //     color: theme_palette.action.active,
                    //     backgroundColor: alpha(theme_palette.action.active, 0.12),
                    //     '&:hover': {
                    //         backgroundColor: alpha(theme_palette.action.active, 0.15),
                    //     },
                    // },
                    // '&$disabled': {
                    //     color: alpha(theme_palette.action.disabled, 0.12),
                    // },
                    // '&:hover': {
                    //     textDecoration: 'none',
                    //     // Reset on mouse devices
                    //     backgroundColor: alpha(theme_palette.text.primary, 0.05),
                    //     '@media (hover: none)': {
                    //         backgroundColor: 'transparent',
                    //     },
                    // },
                },
                // // Pseudo-class applied to the root element if `disabled={true}`.
                // disabled: {},
                // // Pseudo-class applied to the root element if `selected={true}`.
                // selected: {},
                // // Styles applied to the `label` wrapper element.
                // label: {
                //     width: '100%', // Ensure the correct width for iOS Safari
                //     display: 'inherit',
                //     alignItems: 'inherit',
                //     justifyContent: 'inherit',
                // },
                // // Styles applied to the root element if `size="small"`.
                // sizeSmall: {
                //     padding: 7,
                //     fontSize: default_theme.typography.pxToRem(13),
                // },
                // // Styles applied to the root element if `size="large"`.
                // sizeLarge: {
                //     padding: 15,
                //     fontSize: default_theme.typography.pxToRem(15),
                // },
            },
        },
    },
});
