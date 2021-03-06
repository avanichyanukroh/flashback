import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {  Header, Title, Button, Left, Right, Body, Grid, Row, Icon, View, Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import * as Font from 'expo-font';
import { restartGameSession } from '../redux/actions';


const styles = StyleSheet.create({
    header: {
        backgroundColor: '#000028'
    },
    gridWrapper: {
        width: '70%'
    },
    rowContainer: {
        justifyContent: 'space-evenly'
    },
    title: {
        color: '#fbe555',
        alignSelf: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 24
    },
    arrowIcon: {
        color: '#ff0000'
    },
    linkText: {
        color: '#ff0000'
    },
    fontStyle: {
        fontFamily: 'Bangers',
        letterSpacing: 1
    }
  });

function GameHeader(props) {
    const dispatch = useDispatch();

    const turnCount = useSelector(store => store.turnCount);
    const timer = useSelector(store => store.timer);
    const [fontLoaded, setFontLoaded] = useState(false);

    function redirectMainMenu() {
        props.history.push('/');
        dispatch(restartGameSession());
    }
    
    async function loadFont() {
        await Font.loadAsync({
            Bangers: require('../assets/fonts/Bangers-Regular.ttf'),
        });
    }

    useEffect(() => {
        loadFont().then(() => setFontLoaded(true));
    }, []);

    return (
        <Header style={styles.header}>
            <Button iconLeft light transparent onPress={redirectMainMenu}>
                <Icon style={styles.arrowIcon} name='arrow-back' />
                <Text style={fontLoaded ? [styles.linkText, styles.fontStyle] : null}>Exit</Text>
            </Button>
            <View style={styles.gridWrapper}>
                <Grid>
                    <Row style={styles.rowContainer}>
                        <Title style={fontLoaded ? [styles.title, styles.fontStyle] : null}>
                            Turn: {Math.floor(turnCount / 2)}
                        </Title>
                        <Title style={fontLoaded ? [styles.title, styles.fontStyle] : null}>
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
