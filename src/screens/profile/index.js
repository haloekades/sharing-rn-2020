import React,{ useEffect, useState } from 'react'
import { Container } from 'native-base'
import { SafeAreaView, Text } from 'react-native'

export default function Profile({navigation}){
    return(
        <Container>
            <SafeAreaView/>
            <Text>Profile</Text>
        </Container>
    )
}