import React, { useEffect, useState } from 'react';
import { Container, Header, Left, Body, Right, Icon, Title, Content, Toast } from 'native-base';
import { StyleSheet, SafeAreaView, AsyncStorage, TouchableOpacity, FlatList } from 'react-native';
import ItemApproval from '../../../components/approval/ItemApproval';
import { getUserApproval } from '../../../utils/api';

export default function TaskApproval({ navigation, route }) {
    const [approvalList, setApprovalList]   = useState([]);
    const [status, setStatus]       = useState(null);

    function _renderItem({ item }) {
        return (
            <ItemApproval data={item} />
        )
    }

    useEffect(() => {
        let { params }  = route;

        if (params != null && params.status) {
            doGetUserApproval(params.status);
            setStatus(params.status);
        } else {
            doGetUserApproval(null);
            setStatus(null);
        }
    })

    async function doGetUserApproval(status = null) {
        let { acknowledge, result, message } = await getUserApproval(status);

        if (acknowledge == true) {
            setApprovalList(result);
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
                    <Title>Approval List</Title>
                </Body>
                <Right style={styles.iconSide} />
            </Header>
            <Content style={{ padding: 10 }}>
                <FlatList
                    style={styles.flatList}
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
        justifyContent: "center"
    },
    flatList: {
        paddingHorizontal: 10
    }
})