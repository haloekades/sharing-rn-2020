/** @format */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, CardItem } from 'native-base'
import moment from 'moment';

export default class ItemTask extends Component {

    constructor(props) {
        super(props);
    }

    onClickItem = () => {
        this.props.onClickItem(this.props.data)
    }

    render() {
        let bgStatus = this.props.data.status == 'A' ? 'green' : this.props.data.status == 'R' ? 'red' : 'orange'
        let shownDateStatus = this.props.data.status == 'A' || this.props.data.status == 'R' ?
            moment(this.props.data.response_date).utc().format("DD MMM YYYY") : ''

        let dayRequest = moment(this.props.data.request_date).utc().format("DD")
        let monthRequest = moment(this.props.data.request_date).utc().format("MMM")

        return (
            <Card style={{ marginTop: 10, marginVertical: 5 }}>
                <CardItem>
                    <TouchableOpacity onPress={() => this.onClickItem()} style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.2 }}>
                            <View style={styles.viewDate}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{dayRequest}</Text>
                                <Text style={{ fontSize: 12, color: 'white' }}>{monthRequest}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.8, marginLeft: 10 }}>
                            <View style={styles.viewReverse}>
                                <View style={[styles.viewStatus, { backgroundColor: bgStatus }]}>
                                    <Text style={{ fontSize: 10, color: 'white' }}>{this.props.data.status}</Text>
                                </View>
                                <Text style={styles.textNameTask}>{this.props.data.name}</Text>
                            </View>
                            <Text style={{ fontSize: 12, marginTop: 5, alignSelf: 'flex-end' }}>{shownDateStatus}</Text>
                            <View style={[styles.viewReverse, { marginTop: 5 }]}>
                                {(this.props.data.status == 'A' || this.props.data.status == 'R') &&
                                    <Text style={{ fontSize: 12 }}>by : {this.props.data.response_user_name}</Text>
                                }
                                <Text style={styles.textCategory}>{this.props.data.category}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </CardItem>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    viewDate: {
        backgroundColor: '#1f8cdd',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flex: 1
    },
    viewStatus: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    viewReverse: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    textNameTask: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1
    },
    textCategory: {
        fontSize: 12,
        fontWeight: 'bold',
        flex: 1,
        color: '#515456'
    }
})