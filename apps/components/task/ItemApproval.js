/** @format */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, CardItem } from 'native-base'
import moment from 'moment';

export default class ItemApproval extends Component {

    constructor(props) {
        super(props);
    }

    onClickItem = (data) => {
        this.props.onClickItem(data)
    }

    render() {
        let bgStatus = this.props.data.status == 'A' ? 'green' : this.props.data.status == 'R' ? 'red' : 'orange';
        let shownRequestDate = moment(this.props.data.request_date).utc().format("DD MMM YYYY")

        return (
            <Card style={{ marginTop: 10, marginVertical: 5 }}>
                <TouchableOpacity onPress={() => this.onClickItem(this.props.data)} style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, }}>
                        <View style={[styles.viewReverse, { backgroundColor: bgStatus, }]}>
                            <Text style={{ fontSize: 12, color: 'white' }}>{this.props.data.status}</Text>
                            <Text style={[styles.textNameRequest, { color: 'white' }]}>{this.props.data.assign_user_name}</Text>
                        </View>
                        <View style={{ flex: 1, padding: 10 }}>
                            <Text style={styles.textNameRequest}>{this.props.data.name}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10  }}>
                                <Text style={styles.textCategory}>{this.props.data.category}</Text>
                                <Text style={{ flex: 1, textAlign: 'right'}}>{shownRequestDate}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    viewReverse: {
        flex: 1,
        flexDirection: 'row-reverse',
        padding: 10,
        alignItems: 'center',
        borderTopStartRadius: 3,
        borderTopEndRadius: 3,
    },
    textNameRequest: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1
    },
    textCategory: {
        fontWeight: 'bold',
        flex: 1,
        color: '#515456'
    }
})