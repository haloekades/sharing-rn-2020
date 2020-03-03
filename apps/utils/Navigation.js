/** @format */

import { NavigationActions, StackActions } from '@react-navigation/compat';

export const navigate = (props, routeName, params, key) => {
    // const pushAction = StackActions.push({ routeName, params });
    const pushAction = NavigationActions.navigate({ routeName, params, key });

    props.navigation.dispatch(pushAction);
}

export const back = (props) => {
    const popAction = StackActions.pop({ n: 1 });

    props.navigation.dispatch(popAction);
}

export const reset  = (props) => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });

    props.navigation.dispatch(resetAction);
}

export const replace = (props, routeName) => {
    props.navigation.replace(routeName);
}