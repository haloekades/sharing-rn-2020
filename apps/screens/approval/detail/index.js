/** @format */

import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Text, Left, Header, Body, Icon, Title, Right, Content, Card, CardItem, View, Button, Toast } from "native-base";

export default class ApprovalDetail extends Component {
    state = {
        data: null
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let nav = this.props.navigation;
        let { params } = nav.state;
        if (params != null && params.data) {
            this.setState({ data: params.data })
        }
    }

    doBack = () => {
        this.props.navigation.goBack();
    }

    renderItemDetail = (type, value) => {
        return (
            <View style={styles.viewItemDetail}>
                <Text style={{ fontWeight: 'bold' }}>{type}</Text>
                <Text style={{ marginVertical: 5 }}>{value}</Text>
            </View>)
    }

    doApproved = () =>{
        Toast.show({
            text: "Approved task success",
            duration: 2000
        });
        this.props.navigation.goBack();
    }

    doRejected = () =>{
        Toast.show({
            text: "Rejected task success",
            duration: 2000
        });
        this.props.navigation.goBack();
    }

    render() {
        let { data } = this.state;
        let statusColor = 'orange';
        if (data != null) {
            statusColor = data.status == 'APPROVED' ? 'green' : data.status == 'REJECTED' ? 'red' : 'orange';
        }

        return (
            <Container>
                <Header noShadow>
                    <Left style={styles.iconSide}>
                        <TouchableOpacity onPress={() => this.doBack()}>
                            <Icon type='AntDesign' name='arrowleft' style={{ color: 'white' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.iconBody}>
                        <Title style={styles.textTitle}>Detail Approval Task</Title>
                    </Body>
                    <Right style={styles.iconSide} />
                    {/* <Right style={[styles.iconSide, {marginRight : 5}]} >
                        <TouchableOpacity onPress={() => this.doBack()}>
                            <Icon type='AntDesign' name='edit' style={{ color: 'white' }} />
                        </TouchableOpacity>
                    </Right> */}
                </Header>
                <Content>

                    {data != null &&
                        <View style={{ margin: 10 }}>
                            <Card>
                                <CardItem>
                                    <View style={styles.viewCardTask}>
                                        {this.renderItemDetail('Name', data.requestName)}
                                    </View>
                                </CardItem>
                            </Card>
                            <Card style={{ marginTop: 10 }}>
                                <CardItem>
                                    <View style={styles.viewCardTask}>
                                        {this.renderItemDetail('Category', data.category)}
                                        {this.renderItemDetail('Title', data.name)}
                                        {this.renderItemDetail('Description', data.description)}
                                        {this.renderItemDetail('Request Date', data.date)}

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

                                        {(data.status != 'PENDING' && data.notes != null) &&
                                            <View style={styles.viewBottomNotes}>
                                                <Text style={{ fontWeight: 'bold' }}>Notes</Text>
                                                <Text style={{ marginTop: 5 }}>{data.notes}</Text>
                                            </View>
                                        }

                                        {data.status == 'PENDING' &&
                                            <View style={styles.viewBottomNotes}>
                                                <Button
                                                    onPress={() => this.doApproved()}
                                                    success block rounded style={{ marginTop: 10 }}>
                                                    <Text>Approve</Text>
                                                </Button>
                                                <Button
                                                    onPress={() =>this.doRejected()}
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
