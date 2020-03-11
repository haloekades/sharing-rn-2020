/** @format */

import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Container, Text, Left, Header, Body, Icon, Title, Right, Content, Toast } from "native-base";
import { ItemTask } from "../../../components"
import { getUserTasks } from "../../../utils/api/User"

export default function ApprovalList({ navigation, route }) {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        let { params } = route;

        if (params != null && params.status) {
            getTaskByStatus(params.status)
        } else {
            getTaskByStatus(null)
        }
    }, []);

    async function getTaskByStatus(status) {
        let response = await getUserTasks(status);

        if (response.acknowledge === true) {
            setTaskList(response.result)
        } else {
            Toast.show({
                text: response.message,
                duration: 1000
            });
        }
    }

    function gotoTaskDetail(data){
        if (data != null) {
            navigation.push('TaskDetail', {
                data: data
            });
        }
    }

    function _renderItem ({ item }){
        return (
            <ItemTask data={item} onClickItem={gotoTaskDetail} />
        )
    }

    return (
        <Container>
            <SafeAreaView/>
            <Header noShadow>
                <Left style={styles.iconSide}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon type='AntDesign' name='arrowleft' style={{ color: 'white' }} />
                    </TouchableOpacity>
                </Left>
                <Body style={styles.iconBody}>
                    <Title style={styles.textTitle}>List Task</Title>
                </Body>
                <Right style={styles.iconSide} />
            </Header>
            <Content>
                <FlatList
                    style={{ paddingHorizontal: 10 }}
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
        justifyContent: 'center'
    },
});
