import React,{ useEffect, useState } from 'react'
import { Container } from 'native-base'
import { SafeAreaView , Text} from 'react-native'

export default function Home({navigation}){
    return(
        <Container>
            <SafeAreaView/>
            <Text>Home</Text>
        </Container>
    )
}