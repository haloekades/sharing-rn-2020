/** @format */

import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Container, Text, Left, Header, Body, Icon, Title, Right, Content, Tab, Tabs, Toast } from "native-base";
import { ItemTask, ItemApproval } from '../../components';
import { getUserTasks, getUserApporval } from '../../utils/api/User'

export default class HistoryTask extends Component {
    state = {
        taskList: [],
        approvalList: [],
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.initTask()
        // this.initApproval()
        this.getHistoryTask();
        this.getHistoryApproval()

    }

    getHistoryTask = () => {
        this.getTaskApproved();
        this.getTaskRejected();
    }

    getHistoryApproval = () => {
        this.getApprovalApproved();
        this.getApprovalRejected();
    }

    getTaskApproved = async () => {
        let response = await getUserTasks("APPROVED");
        if (response.acknowledge === true) {
            this.setState({
                taskList : [...this.state.taskList,...response.data]
            })
        }else{
            Toast.show({
                text: response.message,
                duration: 1000
            });
        }
    }

    getTaskRejected = async () => {
        let response = await getUserTasks("REJECTED");
        if (response.acknowledge === true) {
            this.setState({
                taskList : [...this.state.taskList,...response.data]
            })
        }else{
            Toast.show({
                text: response.message,
                duration: 1000
            });
        }
    }

    getApprovalApproved = async () => {
        let response = await getUserApporval("APPROVED");
        if (response.acknowledge === true) {
            this.setState({
                approvalList : [...this.state.approvalList,...response.data]
            })
        }else{
            Toast.show({
                text: response.message,
                duration: 1000
            });
        }
    }

    getApprovalRejected = async () => {
        let response = await getUserApporval("REJECTED");
        if (response.acknowledge === true) {
            this.setState({
                approvalList : [...this.state.approvalList,...response.data]
            })
        }else{
            Toast.show({
                text: response.message,
                duration: 1000
            });
        }
    }


    initTask() {
        let data = [];

        for (let i = 4; i <= 12; i++) {
            let item = {
                category: i < 2 ? 'Perawatan' : i < 7 ? 'Sewa' : 'Pengadaan',
                name: 'Nama Task ' + i,
                description: 'Ini Description ' + i,
                date: i + ' Feb 2019',
                status: i < 4 ? 'PENDING' : i < 10 ? 'APPROVED' : 'REJECTED',
                approvedName: 'Dr. Mulyadi',
                approvedDate: i + ' Dec 2019',
                notes: 'Semoga bisa lebih baik lagi'
            }

            data.push(item)
        }

        this.setState({ taskList: data })
    }


    initApproval() {
        let data = [];

        for (let i = 4; i <= 12; i++) {
            let item = {
                category: i < 2 ? 'Perawatan' : i < 7 ? 'Sewa' : 'Pengadaan',
                name: 'Nama Task ' + i,
                description: 'Ini Description ' + i,
                date: i + ' Feb 2019',
                status: i < 4 ? 'PENDING' : i < 10 ? 'APPROVED' : 'REJECTED',
                approvedName: 'Dr. Mulyadi',
                approvedDate: i + ' Dec 2019',
                notes: 'Semoga bisa lebih baik lagi',
                requestName: 'Didi Kempot'
            }

            data.push(item)
        }

        this.setState({ approvalList: data })
    }



    gotoTaskDetail = (data) => {
        if (data != null)
            this.props.navigation.push('TaskDetail', {
                data: data
            });
    }

    _renderItemTask = ({ item }) => {
        return (
            <ItemTask data={item} onClickItem={this.gotoTaskDetail} />
        )
    }

    gotoApprovalDetail = (data) => {
        if (data != null)
            this.props.navigation.push('ApprovalDetail', {
                data: data
            });
    }

    _renderItemApproval = ({ item }) => {
        return (
            <ItemApproval data={item} onClickItem={this.gotoApprovalDetail} />
        )
    }


    render() {
        return (
            <Container>
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
                                data={this.state.taskList}
                                renderItem={this._renderItemTask} />
                        </Content>
                    </Tab>
                    <Tab heading="Approval">
                        <Content>
                            <FlatList
                                style={{ paddingHorizontal: 10 }}
                                data={this.state.approvalList}
                                renderItem={this._renderItemApproval} />
                        </Content>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
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
