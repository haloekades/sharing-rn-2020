import React, { useEffect, useState } from 'react'
import { Container, Header, Left, Body, Right, Icon, Title, Content, Card, Text, Item, View, Picker, DatePicker } from 'native-base'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default function CreateTask({ navigation }) {
    const [category, setCategory] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('')

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
            key: 'PENGURANAGN',
            label: 'PENGURANAGN'
        },
        {
            key: 'TRANSPORTASI',
            label: 'TRANSPORTASI'
        },
        {
            key: 'SEWA',
            label: 'SEWA'
        }
    ]

    function onValueChange(value){
        setCategory(value)

        let category = categoryList.find(data => data.key == value)
        if(category != null){
            setCategoryDescription(category.label)
        }

    }


    function renderCategoryList() {
        if (categoryList != null && categoryList.length > 0) {
            return (
                categoryList.map(value => {
                    return (
                        <Picker.Item label={value.label} value={value.key} />
                    )
                })
            )
        }
    }

    return (
        <Container>
            <Header>
                <Left style={styles.iconSide}>
                    <TouchableOpacity>
                        <Icon
                            type='AntDesign'
                            name='arrowleft'
                            style={{ color: 'white' }} />
                    </TouchableOpacity>
                </Left>
                <Body style={styles.iconBody}>
                    <Title>Create Task</Title>
                </Body>
                <Right style={styles.iconSide} />
            </Header>
            <Content style={{ padding: 10 }}>
                <Card style={{ padding: 16 }}>
                    <Text style={styles.textField}>Category</Text>
                    <Item style={{flex : 1, flexDirection: 'row'}}>
                        <View style={{ flex: 1 }}>
                            <Picker
                                placeholder='Select Category'
                                placeholderIconColor='black'
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: '100%' }}
                                selectedValue={category}
                                onValueChange={onValueChange.bind(this)}
                            >
                                {renderCategoryList()}
                            </Picker>

                        </View>
                    </Item>
                    <Text style={styles.textField}>Input Date</Text>
                    <Item>

                    </Item>
                    <Text style={styles.textField}>Task Name</Text>
                    <Item>

                    </Item>
                    <Text style={styles.textField}>Description</Text>
                    <Item>

                    </Item>

                </Card>
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
        justifyContent:"center"
    },
    textField: {
        marginLeft: 10,
        fontWeight: 'bold'
    }
})