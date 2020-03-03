import React, { Component } from 'react';
import { Image, StyleSheet } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title, Subtitle } from 'native-base';

export default class RHHeader extends Component {

    render() {
        return (
            <Header>
                {this.props.leftButton ? 
                    (<Left style={{flex: 0.1 }}>{this.props.leftButton}</Left>) : null
                }
                <Body style={{flex:1, textAlign: 'center', alignItems: 'center'}}>
                    {this.props.title ? 
                        (<Title>{this.props.title}</Title>) : null
                    }
                    {this.props.subtitle ? 
                        (<Subtitle>{this.props.subtitle}</Subtitle>) : null
                    }
                </Body>
                {this.props.rightButton ? 
                    (<Right style={{flex: 0.1 }}>{this.props.rightButton}</Right>) : null
                }
            </Header>
        );
    }
}