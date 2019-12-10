import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyleSheet, Image, View, Modal } from 'react-native';
import { Container, H1, H3, Button, Text } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import menuLogo from '../assets/images/brand/logo.png';

import { getHighScore } from '../redux/APIActions';
import { setCardTheme, setError } from '../redux/actions';

import * as Font from 'expo-font';
import Picker from '../components/Picker';
import Login from '../components/Login';
import LeaderBoard from '../components/LeaderBoard';

const styles = StyleSheet.create({
    linearGradientContainer: {
        height: '100%',
        width: '100%'
    },
    headerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 8
    },
    contentContainer: {
        padding: 32
    },
    loginButton: {
        borderColor: '#61f2f5'
    },
    leaderBoardButton: {
        borderColor: '#61f2f5'
    },
    title: {
        textAlign: 'center',
        color: '#fbe555',
        fontSize: 64,
        lineHeight: 0,
        marginBottom: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 6
    },
    menuLogo: {
        height: 180,
        width: 180,
        resizeMode: 'contain',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 0,
        marginBottom: 36
    },
    highScoreText: {
        textAlign: 'center',
        color: 'white',
        marginTop: 8,
        marginBottom: 8
    },
    text: {
        textAlign: 'center',
        color: '#61f2f5'
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 16
    },
    playButton: {
        marginTop: 32,
        backgroundColor: '#ff0000'
    },
    themeButton: {
        backgroundColor: '#fbe555'
    },
    playButtonText: {
        textAlign: 'center',
        width: '100%',
        color: 'white',
        fontSize: 32
    },
    themeButtonText: {
        textAlign: 'center',
        width: '100%',
        color: 'black',
        fontSize: 32
    },
    themePicker: {
        width: '100%',
        borderRadius: 4,
        backgroundColor: '#fbe555'
    },
    fontStyle: {
        fontFamily: 'Bangers',
        letterSpacing: 1
    }
});

function MainMenu(props) {
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);
    const highScore = useSelector(store => store.highScore);
    const cardTheme = useSelector(store => store.cardTheme);

    const [fontLoaded, setFontLoaded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    function initializeGame() {
        props.history.push('/GameSession');
    }

    function handleOpenModal(content) {
        setModalContent(content);
        setModalOpen(true);
    }

    function handleCloseModal() {
        setModalOpen(false);
        dispatch(setError(null));
    }

    function renderHighScore() {
        if (!user) {
            return (
                <View>
                    <H3 style={fontLoaded ? [styles.highScoreText, styles.fontStyle] : null}>
                        Score tracking unavailable, please login to enable
                    </H3>
                </View>
            );
        }
        else if (highScore === null || highScore === '') {
            return (
                <View>
                    <H3 style={fontLoaded ? [styles.highScoreText, styles.fontStyle] : null}>
                        No high score, please play your first game
                    </H3>
                </View>
            );
        }
        else {
            return (
                <View>
                    <H3 style={fontLoaded ? [styles.highScoreText, styles.fontStyle] : null}>
                        Highest Score:
                    </H3>
                    <Text style={fontLoaded ? [{color: 'white', textAlign: 'center', marginTop: 8, marginBottom: 8, fontSize: 24}, styles.fontStyle] : null}>{highScore.score} Pts</Text>
                    
                    {/* <H3 style={fontLoaded ? [styles.highScoreText, styles.fontStyle] : null}>
                        Turn: {highScore.turn} Time: {highScore.time} Sec
                    </H3> */}
                </View>
            );
        }
    }

    function renderModalContent() {
        if (modalContent === 'login') {
            return (
                <Login handleCloseModal={handleCloseModal} />
            );
        }
        else if (modalContent === 'theme') {
            return (
                <Picker
                    handleCloseModal={handleCloseModal}
                    items={['Puppies', 'Marvel Heroes', 'DC Heroes', 'Pokemon']}
                />
            );
        }
        else if (modalContent === 'leaderBoard') {
            return (
                <LeaderBoard handleCloseModal={handleCloseModal} />
            );
        }
    }

    async function loadFont() {
        await Font.loadAsync({
            Bangers: require('../assets/fonts/Bangers-Regular.ttf'),
        });
    }

    useEffect(() => {
        if (user) {
            console.log('GET HIGH SCORE');
            dispatch(getHighScore(user._id, 'normal'));
        }
    }, [user]);

    useEffect(() => {
        loadFont().then(() =>setFontLoaded(true));
    }, []);

    return (
        <Container>
            {console.log('HIGH SCORE: ', highScore, typeof highScore, !highScore )}
            <LinearGradient
                colors={['#216583', '#48A6CF']}
                style={styles.linearGradientContainer}
            >
                <View style={styles.headerContainer}>
                    {user ?
                        (<Button style={styles.loginButton} bordered>
                            <Text style={fontLoaded ? [styles.text, styles.fontStyle] : null}>{user.username}</Text>
                        </Button>)
                        :
                        (<Button style={styles.loginButton} bordered onPress={() => handleOpenModal('login')}>
                            <Text style={fontLoaded ? [styles.text, styles.fontStyle] : null}>Login</Text>
                        </Button>)
                }
                    
                    <Button style={styles.leaderBoardButton} bordered onPress={() => handleOpenModal('leaderBoard')}>
                        <Text style={fontLoaded ? [styles.text, styles.fontStyle] : null}>Leader Board</Text>
                    </Button>
                </View>
                <View style={styles.contentContainer}>
                    <Image style={styles.menuLogo} source={menuLogo} />
                    <H1 style={fontLoaded ? [styles.title, styles.fontStyle] : null}>FlashBack</H1>
                    {renderHighScore()}
                    <Button style={[styles.button, styles.playButton]} onPress={initializeGame}>
                        <Text style={fontLoaded ? [styles.playButtonText, styles.fontStyle] : null}>Play!</Text>
                    </Button>
                    <Button style={[styles.button, styles.themeButton]} onPress={() => handleOpenModal('theme')}>
                        <Text style={fontLoaded ? [styles.themeButtonText, styles.fontStyle] : null}>Theme: {cardTheme}</Text>
                    </Button>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalOpen}
                >
                    {renderModalContent()}
                </Modal>
            </LinearGradient>
      </Container>
    );
}

export default MainMenu;
