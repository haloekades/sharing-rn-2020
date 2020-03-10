/** @format */

import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, Modal, Dimensions } from 'react-native';
import { Container, Text, Left, Header, Body, Icon, Title, Right, Content, Card, CardItem, View, Button, Toast, Input, Item } from "native-base";
import moment from 'moment';
import { TouchableHighlight } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

import { approvedTask, rejectedTask } from "../../../utils/api/Task"

export default function ApprovalDetail({ navigation, route }) {
    const [data, setData] = useState(null);
    const [statusColor, setStatusColor] = useState('orange');
    const [showModal, setShowModal] = useState(false);
    const [modalShowType, setModalShowType] = useState('') // A / R
    const [responseMessage, setResponseMessage] = useState('')
    const [errorResponseMessage, setErrorResponseMessage] = useState(false)

    useEffect(() => {
        let { params } = route;
        if (params != null && params.data) {
            setData(params.data)
            setStatusColor(params.data.status == 'A' ? 'green' : params.data.status == 'R' ? 'red' : 'orange')
        }
    }, []);

    function renderItemDetail(type, value) {
        return (
            <View style={styles.viewItemDetail}>
                <Text style={{ fontWeight: 'bold' }}>{type}</Text>
                <Text style={{ marginVertical: 5 }}>{value}</Text>
            </View>)
    }

    async function doApproved() {
        let params = {
            id: data.id,
            response_user: data.response_user,
            response_message: responseMessage,
        }

        console.log('req approve', params)
        let response = await approvedTask(params)
        console.log('res approve', response)

        setShowModal(false)

        if (response.acknowledge == true) {
            Toast.show({
                text: "Approved task success",
                duration: 2000
            });

            navigation.goBack();
        } else {
            Toast.show({
                text: response.message,
                duration: 2000
            });
        }
    }

    async function doRejected() {
        let params = {
            id: data.id,
            response_user: data.response_user,
            response_message: responseMessage,
        }

        let response = await rejectedTask(params)

        setShowModal(false)

        if (response.acknowledge == true) {
            Toast.show({
                text: "Rejected task success",
                duration: 2000
            });

            navigation.goBack();
        } else {
            Toast.show({
                text: response.message,
                duration: 2000
            });
        }
    }

    function showReqDate(date) {
        return moment(date).utc().format('DD MMM YYYY');
    }

    function onChangeMessageModal(text) {
        setResponseMessage(text)
        setErrorResponseMessage(text.length < 1)
    }

    function onSubmit() {
        if (modalShowType == 'A') {
            doApproved()
        } else if (modalShowType == 'R') {
            doRejected()
        }
    }

    return (
        <Container>
            <SafeAreaView />
            <Modal
                animationType="slide"
                presentationStyle='formSheet'
                transparent={false}
                visible={showModal}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                }}>
                <View style={{ marginHorizontal: 20, marginVertical: 40 }}>
                    <View>
                        <TouchableHighlight
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => {
                                setShowModal(false)
                                setResponseMessage('')
                            }}>
                            <Icon type="AntDesign" name="close" style={{ color: 'black' }} />
                        </TouchableHighlight>

                        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Input {modalShowType == 'A' ? 'Approve' : 'Rejected'} response</Text>
                        <Item regular error={errorResponseMessage} style={{ marginTop: 30 }}>
                            <Input value={responseMessage} style={{ height: height / 5 }} autoFocus onChangeText={(txt) => onChangeMessageModal(txt)} placeholder='Input your response' />
                        </Item>
                        <Button
                            onPress={() => onSubmit()}
                            success block rounded style={{ marginTop: 30 }}>
                            <Text>Submit</Text>
                        </Button>

                    </View>
                </View>
            </Modal>
            <Header noShadow>
                <Left style={styles.iconSide}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon type='AntDesign' name='arrowleft' style={{ color: 'white' }} />
                    </TouchableOpacity>
                </Left>
                <Body style={styles.iconBody}>
                    <Title style={styles.textTitle}>Detail Approval Task</Title>
                </Body>
                <Right style={styles.iconSide} />
            </Header>
            <Content>

                {data != null &&
                    <View style={{ margin: 10 }}>
                        <Card>
                            <CardItem>
                                <View style={styles.viewCardTask}>
                                    {renderItemDetail('Name', data.assign_user_name)}
                                </View>
                            </CardItem>
                        </Card>
                        <Card style={{ marginTop: 10 }}>
                            <CardItem>
                                <View style={styles.viewCardTask}>
                                    {renderItemDetail('Category', data.category)}
                                    {renderItemDetail('Title', data.name)}
                                    {renderItemDetail('Description', data.description)}
                                    {renderItemDetail('Request Date', showReqDate(data.request_date))}

                                </View>
                            </CardItem>
                        </Card>
                        <Card style={{ marginTop: 10 }}>
                            <CardItem>
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Status</Text>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={{ fontWeight: 'bold', color: statusColor }}>{data.status}</Text>
                                        </View>
                                    </View>

                                    {(data.status != 'W' && data.response_message != null) &&
                                        <View style={styles.viewBottomNotes}>
                                            <Text style={{ fontWeight: 'bold' }}>Notes</Text>
                                            <Text style={{ marginTop: 5 }}>{data.response_message}</Text>
                                        </View>
                                    }

                                    {data.status == 'W' &&
                                        <View style={styles.viewBottomNotes}>
                                            <Button
                                                onPress={() => {
                                                    setShowModal(true)
                                                    setModalShowType('A')
                                                    // doApproved()
                                                }
                                                }
                                                success block rounded style={{ marginTop: 10 }}>
                                                <Text>Approve</Text>
                                            </Button>
                                            <Button
                                                onPress={() => {
                                                    setShowModal(true)
                                                    setModalShowType('R')
                                                    // doRejected()
                                                }
                                                }
                                                danger block rounded style={{ marginTop: 10 }}>
                                                <Text>Rejected</Text>
                                            </Button>
                                        </View>
                                    }
                                </View>
                            </CardItem>
                        </Card>
                    </View>
                }
            </Content>
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
    viewCardTask: {
        flexDirection: 'column',
        flex: 1,
        marginBottom: 10
    },
    viewItemDetail: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingVertical: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    viewBottomNotes: {
        flex: 1,
        marginTop: 15,
        paddingVertical: 10,
        borderTopColor: 'black',
        borderTopWidth: 1
    },
});
