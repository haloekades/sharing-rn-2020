/** @format */

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, RefreshControl, AsyncStorage } from 'react-native';
import { Container, Icon, Card, CardItem, Header, Body, Title, Content, Toast } from "native-base";
const { width, height } = Dimensions.get('window');
import { getUser } from "../../utils/api/User"

export default function Feeds({ navigation }) {

    const CARD_CREATE = "Create";
    const CARD_MYTASK = "My Task";
    const CARD_APPROVAL = "Approval";

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [task, setTask] = useState({ pending: 0, approved: 0, rejected: 0, });
    const [approval, setApproval] = useState({ pending: 0, approved: 0, rejected: 0, });

    useEffect(() => {
        doGetDataProfile();
    }, []);

    function _onRefresh(){
        setIsRefreshing(true)
        doGetDataProfile()
    }

    async function doGetDataProfile() {
        let response = await getUser();

        setIsRefreshing(false)

        if (response.acknowledge === true) {
            let task = {
                pending: response.data.task.pending,
                approved: response.data.task.approved,
                rejected: response.data.task.rejected,
            }

            let approval = {
                pending: response.data.approval.pending,
                approved: response.data.approval.approved,
                rejected: response.data.approval.rejected,
            }

            // this.setState({
            //     avatar: response.data.avatar,
            //     name: response.data.name,
            //     department: response.data.department,
            //     task: task,
            //     approval: approval
            // })

            setAvatar(response.data.avatar)
            setName(response.data.name)
            setDepartment(response.data.department)
            setTask(task)
            setApproval(approval)

            doSaveProfile(response.data);

        } else {
            Toast.show({
                text: response.message,
                duration: 1000
            });

        }
    }

    async function doSaveProfile(data) {
        let profile = {
            avatar: data.avatar,
            name: data.name,
            department: data.department,
            email: data.email
        };

        await AsyncStorage.setItem("DATA_PROFILE", JSON.stringify(profile))
            .then(() => {
                console.log("saved data success")
            })
            .catch(() => {
                console.log("saved data failed")
            })
    }

    function gotoProfile() {
        navigation.navigate('Profile')
    }

    function onClickCard(textCard) {
        if (textCard == CARD_CREATE)
            navigation.navigate('CreateTask');
        else if (textCard == CARD_MYTASK)
            navigation.navigate('ListTask');
        else if (textCard == CARD_APPROVAL)
            navigation.navigate('ApprovalList');
    }

    function _renderIconWithText(iconType, iconName, text) {
        return (
            <Card style={{ width: width / 3.5, height: height / 5.5 }}>
                <CardItem style={{ flex: 1, }}>
                    <TouchableOpacity
                        onPress={() => onClickCard(text)}
                        style={{ flexDirection: 'column', alignItems: "center", flex: 1 }}>
                        <Icon style={styles.icon} type={iconType} name={iconName} />
                        <Text style={[styles.textNormal, { textAlign: 'center', marginTop: 10 }]}>{text}</Text>
                    </TouchableOpacity>
                </CardItem>
            </Card>)
    }

    function gotoTaskList(status) {
        if (status != null) {
            navigation.push('ListTask', {
                status: status
            });
        }
    }

    function gotoApprovalList(status) {
        if (status != null){
            navigation.push('ApprovalList', {
                status: status
            });
        }
    }

    return (
        <Container>
            <Header noShadow>
                <Body style={{ paddingHorizontal: 16 }}>
                    <Title style={styles.textTitle}>HOME</Title>
                </Body>
            </Header>
            <Content
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={_onRefresh}
                    />
                }
                style={styles.container}>
                <TouchableOpacity
                    onPress={gotoProfile}
                    style={styles.touchProfile}>
                    <Image source={{ uri: avatar }}
                        style={styles.imageProfile} />
                    <View style={{ flexDirection: 'column', marginLeft: 16 }}>
                        <Text style={styles.textTitle}>{name}</Text>
                        <Text style={styles.textNormal}>{department}</Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.line, { marginHorizontal: 15, }]} />
                <View style={{ flexDirection: "row", backgroundColor: '#fff', padding: 10 }}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        {_renderIconWithText('Feather', 'plus-circle', CARD_CREATE)}
                    </View>

                    <View style={{ flex: 1, alignItems: "center" }}>
                        {_renderIconWithText('Feather', 'activity', CARD_MYTASK)}
                    </View>

                    <View style={{ flex: 1, alignItems: "center" }}>
                        {_renderIconWithText('Feather', 'check-circle', CARD_APPROVAL)}
                    </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Card >
                        <CardItem>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={[styles.textTitle, { marginVertical: 5 }]}>My Task</Text>
                                <TouchableOpacity
                                    onPress={() => gotoTaskList('PENDING')}
                                    style={styles.viewTotalTask}>
                                    <Icon type='Octicons' name='primitive-dot' style={{ color: 'orange' }} />
                                    <Text>PENDING</Text>
                                    <Text style={styles.textRight}>{task.pending}</Text>
                                </TouchableOpacity>
                                <View style={[styles.line, { marginVertical: 10 }]} />
                                <TouchableOpacity
                                    onPress={() => gotoTaskList('APPROVED')}
                                    style={styles.viewTotalTask}>
                                    <Icon type='Octicons' name='primitive-dot' style={{ color: 'green' }} />
                                    <Text>APPROVED</Text>
                                    <Text style={styles.textRight}>{task.approved}</Text>
                                </TouchableOpacity>
                                <View style={[styles.line, { marginVertical: 10 }]} />
                                <TouchableOpacity
                                    onPress={() => gotoTaskList('REJECTED')}
                                    style={styles.viewTotalTask}>
                                    <Icon type='Octicons' name='primitive-dot' style={{ color: 'red' }} />
                                    <Text>REJECTED</Text>
                                    <Text style={styles.textRight}>{task.rejected}</Text>
                                </TouchableOpacity>
                                <View style={[styles.line, { marginVertical: 10 }]} />
                            </View>
                        </CardItem>
                    </Card>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Card >
                        <CardItem>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={[styles.textTitle, { marginVertical: 5 }]}>Approval</Text>
                                <TouchableOpacity
                                    onPress={() => gotoApprovalList('PENDING')}
                                    style={styles.viewTotalTask}>
                                    <Icon type='Octicons' name='primitive-dot' style={{ color: 'orange' }} />
                                    <Text>PENDING</Text>
                                    <Text style={styles.textRight}>{approval.pending}</Text>
                                </TouchableOpacity>
                                <View style={[styles.line, { marginVertical: 10 }]} />
                                <TouchableOpacity
                                    onPress={() => gotoApprovalList('APPROVED')}
                                    style={styles.viewTotalTask}>
                                    <Icon type='Octicons' name='primitive-dot' style={{ color: 'green' }} />
                                    <Text>APPROVED</Text>
                                    <Text style={styles.textRight}>{approval.approved}</Text>
                                </TouchableOpacity>
                                <View style={[styles.line, { marginVertical: 10 }]} />
                                <TouchableOpacity
                                    onPress={() => gotoApprovalList('REJECTED')}
                                    style={styles.viewTotalTask}>
                                    <Icon type='Octicons' name='primitive-dot' style={{ color: 'red' }} />
                                    <Text>REJECTED</Text>
                                    <Text style={styles.textRight}>{approval.rejected}</Text>
                                </TouchableOpacity>
                                <View style={[styles.line, { marginVertical: 10 }]} />
                            </View>
                        </CardItem>
                    </Card>
                </View>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    touchProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "white"
    },
    imageProfile: {
        width: 65,
        height: 65,
        borderRadius: 50
    },
    icon: {
        fontSize: 32,
        color: '#043dab'
    },
    textTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    textNormal: {
        fontSize: 14,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#abbbbf',
    },
    viewTotalTask: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center'
    },
    textRight: {
        textAlign: 'right',
        flex: 1,
        marginHorizontal: 10
    }
});
