/** @format */

import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Container, Header, Body, Title, Content, Tab, Tabs, Toast } from "native-base";
import { ItemTask, ItemApproval } from '../../components';
import { getUserTasks, getUserApporval } from '../../utils/api/User'

export default function HistoryTask({ navigation }) {
    const [taskList, setTaskList] = useState([]);
    const [approvalList, setApprovalList] = useState([]);
    const [newTaskList, setNewTaskList] = useState([]);
    const [newApprovalList, setnewApprovalList] = useState([]);


    useEffect(() => {
        getHistoryTask();
        getHistoryApproval()
    }, []);

    function getHistoryTask() {
        getTaskApproved();
        getTaskRejected();
    }

    function getHistoryApproval() {
        getApprovalApproved();
        getApprovalRejected();
    }

    useEffect(() => {
        setTaskList([...taskList, ...newTaskList])
    }, [newTaskList]);

    useEffect(() => {
        setApprovalList([...approvalList, ...newApprovalList])
    }, [newApprovalList]);

    async function getTaskApproved() {
        let response = await getUserTasks("A");
        if (response.acknowledge === true) {
            setNewTaskList(response.result)
        } else {
            Toast.show({
                text: response.message,
                duration: 1000
            });
        }
    }

    async function getTaskRejected() {
        let response = await getUserTasks("R");
        if (response.acknowledge === true) {
                setNewTaskList(response.result)
        } else {
            Toast.show({
                text: response.message,
                duration: 1000
            });
        }
    }

    async function getApprovalApproved() {
        let response = await getUserApporval("A");
        if (response.acknowledge === true) {
            setnewApprovalList(response.result)
        } else {
            Toast.show({
                text: response.message,
                duration: 1000
            });
        }
    }

    async function getApprovalRejected() {
        let response = await getUserApporval("R");
        if (response.acknowledge === true) {
            setnewApprovalList(response.result)
        } else {
            Toast.show({
                text: response.message,
                duration: 1000
            });
        }
    }

    function gotoTaskDetail(data) {
        if (data != null) {
            navigation.push('TaskDetail', {
                data: data
            });
        }
    }

    function _renderItemTask({ item }) {
        return (
            <ItemTask data={item} onClickItem={gotoTaskDetail} />
        )
    }

    function gotoApprovalDetail(data) {
        if (data != null) {
            navigation.push('ApprovalDetail', {
                data: data
            });
        }
    }

    function _renderItemApproval({ item }) {
        return (
            <ItemApproval data={item} onClickItem={gotoApprovalDetail} />
        )
    }

    return (
        <Container>
            <SafeAreaView />
            <Header noShadow>
                <Body style={{ paddingHorizontal: 16 }}>
                    <Title style={styles.textTitle}>HISTORY</Title>
                </Body>
            </Header>
            <Tabs>
                <Tab heading="Task">
                    <Content>
                        <FlatList
                            style={{ paddingHorizontal: 10 }}
                            data={taskList}
                            renderItem={_renderItemTask} />
                    </Content>
                </Tab>
                <Tab heading="Approval">
                    <Content>
                        <FlatList
                            style={{ paddingHorizontal: 10 }}
                            data={approvalList}
                            renderItem={_renderItemApproval} />
                    </Content>
                </Tab>
            </Tabs>
        </Container>
    );

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
