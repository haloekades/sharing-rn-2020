/** @format */

import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Container, Left, Header, Body, Icon, Title, Right, Content } from "native-base";
import { ItemApproval } from '../../../components';
import { getUserApporval } from "../../../utils/api/User"

export default function ApprovalList({ navigation, route }) {
    const [approvalList, setApprovalList] = useState([]);

    useEffect(() => {
        let { params } = route;
        if (params != null && params.status != null) {
            getApprovalByStatus(params.status);
        } else {
            getApprovalByStatus(null);
        }
    }, []);


    async function getApprovalByStatus (status){
        let response = await getUserApporval(status);

        console.log('approval', response)

        if (response.acknowledge === true) {
            setApprovalList(response.result)
        } else {
            Toast.show({
                text: response.message,
                duration: 1000
            });
        }
    }

    function gotoApprovalDetail(data){
        if (data != null){
            navigation.push('ApprovalDetail', {
                data: data
            });
        }
    }

    function _renderItem ({ item }) {
        return (
            <ItemApproval data={item} onClickItem={gotoApprovalDetail} />
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
                    <Title style={styles.textTitle}>Approval List</Title>
                </Body>
                <Right style={styles.iconSide} />
            </Header>
            <Content>
                <FlatList
                    style={{ paddingHorizontal: 10 }}
                    data={approvalList}
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
