import React, { useEffect, useState } from 'react';
import { Container, Header, Left, Body, Right, Icon, Title, Content, Toast } from 'native-base';
import { StyleSheet, SafeAreaView, AsyncStorage, TouchableOpacity, FlatList } from 'react-native';
import ItemTask from '../../../components/task/ItemTask';
import { getUserTask } from '../../../utils/api';

export default function TaskList({ navigation, route }) {
    const [taskList, setTaskList]   = useState([]);
    const [status, setStatus]       = useState(null);

    function _renderItem({ item }) {
        return (
            <ItemTask data={item} />
        )
    }

    useEffect(() => {
        let { params }  = route;

        if (params != null && params.status) {
            doGetUserTask(params.status);
            setStatus(params.status);
        } else {
            doGetUserTask(null);
            setStatus(null);
        }
    })

    async function doGetUserTask(status = null) {
        let { acknowledge, result, message } = await getUserTask(status);

        if (acknowledge == true) {
            setTaskList(result);
        } else {
            Toast.show({text: message, duration: 1000})
        }
    }

    return (
        <Container>
            <SafeAreaView />
            <Header>
                <Left style={styles.iconSide}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Icon
                            type='AntDesign'
                            name='arrowleft'
                            style={{ color: 'white' }} />
                    </TouchableOpacity>
                </Left>
                <Body style={styles.iconBody}>
                    <Title>Task List</Title>
                </Body>
                <Right style={styles.iconSide} />
            </Header>
            <Content style={{ padding: 10 }}>
                <FlatList
                    style={styles.flatList}
                    data={taskList}
                    renderItem={_renderItem} />
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    iconSide: {
        flex: 0.5,
        paddingHorizontal: 5
    },
    iconBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    flatList: {
        paddingHorizontal: 10
    }
})