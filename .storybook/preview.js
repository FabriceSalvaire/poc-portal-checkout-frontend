/**************************************************************************************************/

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

/**************************************************************************************************/

// https://github.com/storybookjs/storybook-addon-console

import '@storybook/addon-console';
import { setConsoleOptions } from '@storybook/addon-console';

setConsoleOptions({
panelExclude: [],
});
