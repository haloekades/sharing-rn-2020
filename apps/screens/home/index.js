/** @format */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, RefreshControl, AsyncStorage } from 'react-native';
import { Container, Icon, Card, CardItem, Header, Body, Title, Content, Toast } from "native-base";
const { width, height } = Dimensions.get('window');
import { getUser } from "../../utils/api/User"
import { log } from 'react-native-reanimated';

export default class Feeds extends Component {

    state = {
        isRefreshing: false,
        avatar: '',
        name: '',
        department: '',
        task: {
            pending: 0,
            approved: 0,
            rejected: 0,
        },
        approval: {
            pending: 0,
            approved: 0,
            rejected: 0,
        },
    }

    constructor(props) {
        super(props)
    }

    CARD_CREATE = "Create";
    CARD_MYTASK = "My Task";
    CARD_APPROVAL = "Approval";


    componentDidMount() {
        log('ekades tes')
        this.doGetDataProfile();
    }

    _onRefresh = () => {
        this.setState({
            isRefreshing: true,
        })
        log('ekades tes')
        this.doGetDataProfile();
    }

    doGetDataProfile = async () => {
        let response = await getUser();

        this.setState({ isRefreshing: false })

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

            this.setState({
                avatar: response.data.avatar,
                name: response.data.name,
                department: response.data.department,
                task: task,
                approval: approval
            })

            this.doSaveProfile(response.data);

        } else {
            Toast.show({
                text: response.message,
                duration: 1000
            });

        }
    }

    doSaveProfile = async (data) => {
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

    gotoProfile = () => {
        this.props.navigation.navigate('Profile')
    }

    onClickCard = (textCard) => {
        if (textCard == this.CARD_CREATE)
            this.props.navigation.navigate('CreateTask');
        else if (textCard == this.CARD_MYTASK)
            this.props.navigation.navigate('ListTask');
        else if (textCard == this.CARD_APPROVAL)
            this.props.navigation.navigate('ApprovalList');
    }

    _renderIconWithText = (iconType, iconName, text) => {
        return (
            <Card style={{ width: width / 3.5, height: height / 5.5 }}>
                <CardItem style={{ flex: 1, }}>
                    <TouchableOpacity
                        onPress={() => this.onClickCard(text)}
                        style={{ flexDirection: 'column', alignItems: "center", flex: 1 }}>
                        <Icon style={styles.icon} type={iconType} name={iconName} />
                        <Text style={[styles.textNormal, { textAlign: 'center', marginTop: 10 }]}>{text}</Text>
                    </TouchableOpacity>
                </CardItem>
            </Card>)
    }

    gotoTaskList = (status) => {
        if (status != null)
            this.props.navigation.push('ListTask', {
                status: status
            });
    }

    gotoApprovalList = (status) => {
        if (status != null)
            this.props.navigation.push('ApprovalList', {
                status: status
            });
    }

    render() {
        let { isRefreshing, avatar, name, department, task, approval } = this.state;

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
                            onRefresh={this._onRefresh}
                        />
                    }
                    style={styles.container}>
                    <TouchableOpacity
                        onPress={this.gotoProfile}
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
                            {this._renderIconWithText('Feather', 'plus-circle', this.CARD_CREATE)}
                        </View>

                        <View style={{ flex: 1, alignItems: "center" }}>
                            {this._renderIconWithText('Feather', 'activity', this.CARD_MYTASK)}
                        </View>

                        <View style={{ flex: 1, alignItems: "center" }}>
                            {this._renderIconWithText('Feather', 'check-circle', this.CARD_APPROVAL)}
                        </View>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Card >
                            <CardItem>
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <Text style={[styles.textTitle, { marginVertical: 5 }]}>My Task</Text>
                                    <TouchableOpacity
                                        onPress={() => this.gotoTaskList('PENDING')}
                                        style={styles.viewTotalTask}>
                                        <Icon type='Octicons' name='primitive-dot' style={{ color: 'orange' }} />
                                        <Text>PENDING</Text>
                                        <Text style={styles.textRight}>{task.pending}</Text>
                                    </TouchableOpacity>
                                    <View style={[styles.line, { marginVertical: 10 }]} />
                                    <TouchableOpacity
                                        onPress={() => this.gotoTaskList('APPROVED')}
                                        style={styles.viewTotalTask}>
                                        <Icon type='Octicons' name='primitive-dot' style={{ color: 'green' }} />
                                        <Text>APPROVED</Text>
                                        <Text style={styles.textRight}>{task.approved}</Text>
                                    </TouchableOpacity>
                                    <View style={[styles.line, { marginVertical: 10 }]} />
                                    <TouchableOpacity
                                        onPress={() => this.gotoTaskList('REJECTED')}
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
                                        onPress={() => this.gotoApprovalList('PENDING')}
                                        style={styles.viewTotalTask}>
                                        <Icon type='Octicons' name='primitive-dot' style={{ color: 'orange' }} />
                                        <Text>PENDING</Text>
                                        <Text style={styles.textRight}>{approval.pending}</Text>
                                    </TouchableOpacity>
                                    <View style={[styles.line, { marginVertical: 10 }]} />
                                    <TouchableOpacity
                                        onPress={() => this.gotoApprovalList('APPROVED')}
                                        style={styles.viewTotalTask}>
                                        <Icon type='Octicons' name='primitive-dot' style={{ color: 'green' }} />
                                        <Text>APPROVED</Text>
                                        <Text style={styles.textRight}>{approval.approved}</Text>
                                    </TouchableOpacity>
                                    <View style={[styles.line, { marginVertical: 10 }]} />
                                    <TouchableOpacity
                                        onPress={() => this.gotoApprovalList('REJECTED')}
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
