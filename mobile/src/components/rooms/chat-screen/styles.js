import { StyleSheet } from 'react-native';
import colors from '../../../ui/colors';

export default StyleSheet.create({
    layout: {
        backgroundColor: colors.white,
    },
    loading: {
        alignSelf: 'center',
        marginTop: '75%',
    },
    messageSeparatorContainer: {
        padding: 0,
        borderBottomWidth: .5,
        borderBottomColor: colors.grey,
        alignSelf: 'center'
    },
    messageSeparator: {
        textAlign: 'center',
        paddingVertical: 2,
        fontSize: 10,
        fontWeight: "500",
        color: colors.grey
    },
    messageContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    introMessageContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 15,
        marginBottom: 2,
        marginTop: 10,
    },
    messageAvatarContainer: {
        flex: 1,
        margin: 0,
        padding: 0,
        marginRight: 20
    },
    messageContentContainer: {
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 5
    },
    messageTitleContainer: {
        flexDirection: 'row',
    },
    daySectionContainer: {
        marginVertical: 15
    },
    daySectionBorder: {
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
        top: 9,
        backgroundColor: 'transparent'
    },
    daySectionTitle: {
        fontSize: 14,
        paddingHorizontal: 6,
        fontWeight: 'bold',
        color: colors.black,
        alignSelf: 'center',
        backgroundColor: colors.white
    },
    messageTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.black,
        paddingBottom: 5
    },
    messageSubtitle: {
        fontSize: 10,
        color: colors.grey,
        marginLeft: 5,
        marginTop: 2
    },
    messageContent: {
        fontSize: 14,
    },
    messageUrlContent: {
        color: colors.blue,
        fontWeight: '600'
    },

    introMessageIcon: {
        alignSelf: 'flex-start',
        marginBottom: 5
    },
    introMessageContent: {
        fontSize: 24,
        fontWeight: '500'
    },
    systemMessageContent: {
        fontSize: 15,
    },

    imageMessagePlaceholderContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: colors.lightGrey
    },
    imageMessagePlaceholderIcon: {
        alignSelf: 'center'
    },
    imageMessageImage: {
        borderRadius: 5
    },

    messageComposeSendContainer: {
        marginRight: 12,
        marginLeft: 10,
        marginBottom: 13
    },
    messageComposerAttachmentContainer: {
        marginLeft: 12,
        marginBottom: 13
    }
});