import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {  Header, Title, Button, Left, Right, Body, Grid, Row, Icon, View } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import * as Font from 'expo-font';

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#000028'
    },
    title: {
        color: '#fbe555',
        alignSelf: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 24
    }
  });

function GameHeader() {
    const turnCount = useSelector(store => store.turnCount);
    const timer = useSelector(store => store.timer);
    const [fontLoaded, setFontLoaded] = useState(false);

    async function loadFont() {
        await Font.loadAsync({
            Bangers: require('../assets/fonts/Bangers-Regular.ttf'),
        });
    }

    useEffect(() => {
        loadFont().then(() =>setFontLoaded(true));
    }, []);

    return (
        <Header style={styles.header}>
            <Left>
                <Button transparent>
                    <Icon name='menu' />
                </Button>
            </Left>
            <View style={{borderRadius: 1, borderColor: 'green', borderWidth: 1, width: '70%'}}>
                <Grid>
                    <Row style={{justifyContent: 'space-evenly', borderRadius: 1, borderColor: 'red', borderWidth: 1}}>
                        <Title style={fontLoaded ? [styles.title, {fontFamily: 'Bangers'}] : null}>
                            Turn: {Math.floor(turnCount / 2)}
                        </Title>
                        <Title style={fontLoaded ? [styles.title, {fontFamily: 'Bangers'}] : null}>
                            Time: {timer} Sec
                        </Title>
                    </Row>
                </Grid>
            </View>
            <Right />
        </Header>
    );
}

export default GameHeader;