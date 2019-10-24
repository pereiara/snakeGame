import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

import { createStackNavigator } from 'react-navigation-stack';

import {createAppContainer} from 'react-navigation';

const Routes = new createAppContainer(
    createStackNavigator({
        Home: Page1,
        Game: Page2,
        finish: Page3,
    }),

);

export default Routes;