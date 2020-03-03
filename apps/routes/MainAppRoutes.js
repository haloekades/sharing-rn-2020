/** @format */

// import { createStackNavigator } from 'react-navigation-stack';
import { CreateTask, ListTask, TaskDetail, ApprovalList, ApprovalDetail } from "../screens";
import { MainNav } from "./MainRoutes"


import { createStackNavigator } from '@react-navigation/stack';
import { createCompatNavigatorFactory } from '@react-navigation/compat';

export const MainApp = createCompatNavigatorFactory(createStackNavigator)({
    Main: {
        screen: MainNav,
        navigationOptions: { headerShown: false }
    },
    CreateTask: {
        screen: CreateTask,
        navigationOptions: { headerShown: false }
    },
    ListTask: {
        screen: ListTask,
        navigationOptions: { headerShown: false }
    },
    TaskDetail: {
        screen: TaskDetail,
        navigationOptions: { headerShown: false }
    },
    ApprovalList: {
        screen: ApprovalList,
        navigationOptions: { headerShown: false }
    },
    ApprovalDetail: {
        screen: ApprovalDetail,
        navigationOptions: { headerShown: false }
    }
})