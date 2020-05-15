import React, { useEffect, useState } from 'react'
import { Container, Text } from 'native-base'
import { SafeAreaView } from 'react-native'

export default function Home({navigation}) {
    return(
        <Container>
            <SafeAreaView/>
            <Text>Home</Text>
        </Container>
    )
}