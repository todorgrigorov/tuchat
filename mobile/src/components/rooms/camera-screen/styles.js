import { StyleSheet, Platform } from 'react-native';
import colors from '../../../ui/colors';

export default StyleSheet.create({
    camera: {
        flex: 5,
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 20
    },
    centerButtonContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        opacity: .8
    },
    emptyContainer: {
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});