import React, { useEffect, useState } from 'react'
import { Container, Tabs, Tab, Content, Toast, Header , Body, Title } from 'native-base'
import { SafeAreaView, FlatList} from 'react-native'
import { ItemApproval, ItemTask } from '../../components'
import { getUserTask, getUserApproval } from '../../utils/api'

export default function History({ navigation }) {
    const [taskList, setTaskList] = useState([])
    const [approvalList, setApprovalList] = useState([])
    const [newTaskList, setNewTaskList] = useState([])
    const [newApprovalList, setNewApprovalList] = useState([])

    useEffect(() => {
        getHistoryTask()
        getHistoryApproval()
    }, [])

    useEffect(() =>{
        setTaskList([...taskList, ...newTaskList])
    }, [newTaskList])

    useEffect(() =>{
        setApprovalList([...approvalList, ...newApprovalList])
    }, [newApprovalList])

    function getHistoryTask() {
        getTaskApproved()
        getTaskRejected()
    }

    async function getTaskApproved() {
        let response = await getUserTask("A")

        if (response.acknowledge == true) {
            setNewTaskList(response.result)
        } else {
            Toast.show({
                text: response.message,
                duration: 1000
            })
        }

    }

    async function getTaskRejected() {
        let response = await getUserTask("R")

        if (response.acknowledge == true) {
            setNewTaskList(response.result)
        } else {
            Toast.show({
                text: response.message,
                duration: 1000
            })
        }
    }

    function getHistoryApproval() {
        getApprovalApproved()
        getApprovalRejected()
    }

    async function getApprovalApproved() {
        let response = await getUserApproval("A")

        if (response.acknowledge == true) {
            setNewApprovalList(response.result)
        } else {
            Toast.show({
                text: response.message,
                duration: 1000
            })
        }
    }

    async function getApprovalRejected() {
        let response = await getUserApproval("R")

        if (response.acknowledge == true) {
            setNewApprovalList(response.result)
        } else {
            Toast.show({
                text: response.message,
                duration: 1000
            })
        }
    }

    function gotoTaskDetail(data) {
        if(data != null){
            navigation.push('TaskDetail', {
                data : data,
                isUpdateData : onUpdateData
            })
        }
    }

    function onUpdateData(isUpadated){
        if(isUpadated == true){
            doGetUserTask(status)
        }
    }

    function renderItemTask({ item }) {
        return (
            <ItemTask data={item} onClickItem={gotoTaskDetail}/>
        )
    }

    function gotoApproval(data){
        if(data != null){
            navigation.push('ApprovalDetail', {
                data : data,
                isUpdatedData : onUpdateData
            })
        }
    }

    function onUpdateData(isUpdated){
        if(isUpdated == true){
            doGetUserApproval(status)
        }
    }

    function renderItemApproval({ item }) {
        return (
            <ItemApproval data={item} onClickItem={gotoApproval} />
        )
    }

    return (
        <Container>
            <SafeAreaView />
            <Header>
                <Body>
                    <Title>History</Title>
                </Body>
            </Header>
            <Tabs>
                <Tab heading="Task">
                        <FlatList
                            style={{ paddingHorizontal: 10 }}
                            data={taskList}
                            renderItem={renderItemTask}
                        />
                </Tab>
                <Tab heading="Approval">
                    <FlatList
                        style={{ paddingHorizontal: 10 }}
                        data={approvalList}
                        renderItem={renderItemApproval}
                    />
                </Tab>
            </Tabs>
        </Container>
    )
}