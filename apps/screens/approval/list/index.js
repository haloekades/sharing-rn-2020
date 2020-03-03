/** @format */

import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Container, Text, Left, Header, Body, Icon, Title, Right, Content } from "native-base";
import { ItemApproval } from '../../../components';
import { getUserApporval } from "../../../utils/api/User"

export default class ApprovalList extends Component {
    state = {
        approvalList:[]
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let nav = this.props.navigation;
        let { params } = nav.state;
        if (params != null && params.status != null) {
            // this.initTask(params.status)
            this.getApprovalByStatus(params.status);
        } else {
            // this.initTask(null)
            this.getApprovalByStatus(null);
        }
    }

    getApprovalByStatus = async (status) =>{
        let response = await getUserApporval(status);

        if(response.acknowledge === true){
            this.setState({
                approvalList : response.data
            })
        }else{
            Toast.show({
                text: response.message,
                duration: 1000
            });
        }
    }

    initTask(status) {
        let data = [];
        let min = 1;
        let max = 12

        if (status != null) {
            if (status == 'PENDING') {
                min = 1;
                max = 3;
            } else if (status == 'APPROVED') {
                min = 4;
                max = 9;
            } else if (status == 'REJECTED') {
                min = 10;
                max = 12;
            }
        }

        for (let i = min; i <= max; i++) {
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

    doBack = () => {
        this.props.navigation.goBack();
    }

    gotoApprovalDetail = (data) => {
        if (data != null)
            this.props.navigation.push('ApprovalDetail', {
                data: data
            });
    }

    _renderItem =({item}) =>{
        return (
            <ItemApproval data={item} onClickItem={this.gotoApprovalDetail} />
        )
    }

    render() {
        return (
            <Container>
                <Header noShadow>
                    <Left style={styles.iconSide}>
                        <TouchableOpacity onPress={() => this.doBack()}>
                            <Icon type='AntDesign' name='arrowleft' style={{ color: 'white' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.iconBody}>
                        <Title style={styles.textTitle}>Approval List</Title>
                    </Body>
                    <Right style={styles.iconSide} />
                </Header>
                <Content>
                    <FlatList
                        style={{ paddingHorizontal: 10 }}
                        data={this.state.approvalList}
                        renderItem={this._renderItem} />
                </Content>
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
