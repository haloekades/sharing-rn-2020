/** @format */

import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Alert, SafeAreaView, AsyncStorage } from 'react-native';
import { Container, Text, Left, Header, Body, Icon, Title, Right, Content, Button, Card, Item, Input, Toast, Picker, Form, View, DatePicker } from "native-base";
import moment from 'moment';

import { createTask } from "../../../utils/api/Task"

const { height } = Dimensions.get('window');

export default function CreateTask({ navigation, route }) {
    const [id, setId] = useState(0)
    const [title, setTitle] = useState('Create Task');
    const [category, setCategory] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState('');
    const [errorDate, setErrorDate] = useState(false);
    const [errorCategory, setErrorCategory] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);

    const categoryList = [
        {
            key: 'PENGADAAN',
            label: 'PENGADAAN'
        },
        {
            key: 'PERAWATAN',
            label: 'PERAWATAN'
        },
        {
            key: 'PENGURANGAN',
            label: 'PENGURANGAN'
        },
        {
            key: 'TRANSPORTASI',
            label: 'TRANSPORTASI'
        },
        {
            key: 'SEWA',
            label: 'SEWA'
        },
    ]

    useEffect(() => {
        let { params } = route;
        if (params != null && params.data) {
            setId(params.data.id)
            setTitle('Edit Task')
            setDataCategory(params.data.category)
            setName(params.data.name)
            setDate(moment(params.data.request_date).utc())
            setDescription(params.data.description)
            setErrorDate(false)
            setErrorCategory(false)
            setErrorName(false)
            setErrorDescription(false)
        }
    }, []);

    function setDataCategory(extraCategory) {
        let category = categoryList.find(data => data.key == extraCategory)

        if (category != null) {
            setCategory(category.key)
            setCategoryDescription(category.description)
        }
    }

    function onChangeTitle(text) {
        setName(text)
        setErrorName(false)
    }

    function onChangeDescription(text) {
        setDescription(text)
        setErrorDescription(false)
    }

    async function submitTask() {
        const dataProfile = await AsyncStorage.getItem("DATA_PROFILE");

        if (dataProfile != null && dataProfile != "") {
            let profile = JSON.parse(dataProfile);

            let responseUserId = profile.leaderId > 0 ? profile.leaderId : profile.id

            let params = {
                id: id,
                name: name,
                description: description,
                request_date: moment(date).format('YYYY-MM-DD'),
                assign_user: profile.id,
                response_user: responseUserId,
                category: category,
                status: 'W',
            }

            let response = await createTask(params)

            showToast(response.acknowledge)
        }
    }

    function showToast(isSuccess) {
        Toast.show({
            text: isSuccess ? "Input data berhasil di simpan" : "Input data gagal di simpan",
            duration: 2000
        });

        if (isSuccess)
            navigation.goBack()
    }

    function showAlert() {
        Alert.alert(
            'Konfirmasi',
            'Apakah data yang anda input sudah benar ?',
            [
                {
                    text: 'Tidak',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Ya', onPress: () =>
                        // showToast(true)
                        submitTask()
                },
            ],
            { cancelable: false },
        );
    }

    function onValueChange(value) {
        setCategory(value)

        let category = categoryList.find(data => data.key == value)
        if (category != null) {
            setCategoryDescription(category.label)
        }
    }

    function renderCategoryList() {
        if (categoryList != null && categoryList.length > 0) {
            return (categoryList.map(value => {
                return (<Picker.Item label={value.label} value={value.key} />
                )
            }))
        }
    }

    function onSelectedDate(newDate) {
        setDate(newDate)
    }

    return (
        <Container>
            <SafeAreaView />
            <Header noShadow>
                <Left style={styles.iconSide}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon type='AntDesign' name='arrowleft' style={{ color: 'white' }} />
                    </TouchableOpacity>
                </Left>
                <Body style={styles.iconBody}>
                    <Title style={styles.textTitle}>{title}</Title>
                </Body>
                <Right style={styles.iconSide} />
            </Header>
            <Content style={{ padding: 10 }}>
                <Card style={{ padding: 16 }}>
                    <Text style={styles.textField}>Category</Text>
                    <Item regular error={errorCategory}
                        style={styles.itemPicker}>
                        <View style={{ flex: 1 }}>
                            <Picker
                                note
                                mode="dialog"
                                placeholder='Select Category'
                                placeholderIconColor='black'
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: '100%' }}
                                textStyle={{ color: "black" }}
                                selectedValue={category}
                                onValueChange={onValueChange.bind(this)}>
                                {renderCategoryList()}
                            </Picker>
                        </View>
                    </Item>
                    <Text style={styles.textField}>Input Date</Text>
                    <Item regular error={errorCategory} style={styles.itemPicker}>
                        <Icon type="Entypo" name='calendar' />
                        <View style={{ flex: 1 }}>
                            <DatePicker
                                defaultDate={new Date(2018, 4, 4)}
                                minimumDate={new Date(2020, 1, 1)}
                                maximumDate={new Date(2020, 12, 31)}
                                locale={"en"}
                                formatChosenDate={date => {
                                    return moment(date).format('DD MMM YYYY')
                                }}
                                placeHolderText={date != null ? moment(date).format('DD MMM YYYY') : 'Input date'}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={onSelectedDate}
                            />
                        </View>
                    </Item>
                    <Text style={styles.textField}>Task Name</Text>
                    <Item regular error={errorName} style={styles.formItem}>
                        <Input value={name} autoFocus onChangeText={(txt) => onChangeTitle(txt)} keyboardType="default" placeholder='Input Task Name' />
                    </Item>
                    <Text style={styles.textField}>Description</Text>
                    <Item regular error={errorDescription} style={styles.formItem}>
                        <Input value={description} style={{ height: height / 5 }} autoFocus onChangeText={(txt) => onChangeDescription(txt)} keyboardType="default" placeholder='Input Description' />
                    </Item>
                </Card>
                <Button onPress={() => showAlert()} success rounded block style={styles.btnLogin}>
                    <Text>SAVE</Text>
                </Button>
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
    formItem: {
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    textField: {
        marginLeft: 10,
        fontWeight: 'bold'
    },
    btnLogin: {
        marginTop: 10,
    },
    itemPicker: {
        marginVertical: 10,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row-reverse'
    }
});
