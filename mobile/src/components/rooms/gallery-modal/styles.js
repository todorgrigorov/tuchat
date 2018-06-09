import { StyleSheet, Platform } from 'react-native';
import colors from '../../../ui/colors';

export default StyleSheet.create({
    modal: {
        height: 170,
        borderTopWidth: 1,
        borderTopColor: colors.white,
        backgroundColor: colors.lightGrey
    },
    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        padding: 5,
        alignSelf: 'center'
    },
    image: {
    }
});