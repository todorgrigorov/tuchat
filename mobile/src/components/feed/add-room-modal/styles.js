import { StyleSheet, Platform } from 'react-native';
import colors from '../../../ui/colors';

export default StyleSheet.create({
    modal: {
        height: 250,
        width: '100%',
        borderTopWidth: .5,
        borderTopColor: colors.grey,
        backgroundColor: colors.lightGrey,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    nameInput: {
        fontSize: 24,
        paddingTop: 5,
        marginHorizontal: 15,
        flex: 1
    },
    purposeInput: {
        fontSize: 20,
        marginHorizontal: 15,
        flex: 3
    },
    button: {
        borderRadius: 0,
        alignSelf: 'center',
        width: '100%',
        bottom: 0,
        left: 0,
    }
});