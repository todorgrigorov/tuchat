import { StyleSheet, Platform } from 'react-native';
import colors from '../../../ui/colors';

export default StyleSheet.create({
    bottomButton: {
        borderRadius: 0,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    backgroundLayout: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    background: {
        flex: 1,
        resizeMode: 'cover'
    },
    middleLayout: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: colors.black,
        opacity: .25
    },
    foregroundLayout: {
        flex: 1,
        marginTop: '40%',
        alignItems: 'center'
    },
    logo: {
        width: 140,
        height: 140,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 72,
        fontWeight: 'bold',
        color: colors.white,
        letterSpacing: .5
    },
    info: {
        fontSize: 20,
        color: colors.white,
        letterSpacing: .2
    },
    input: {
        width: '85%',
        height: 65,
        fontSize: 55,
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 5
    }
})