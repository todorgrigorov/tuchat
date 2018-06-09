import { StyleSheet, Platform } from 'react-native';
import colors from '../../../ui/colors';

export default StyleSheet.create({
    fixedHeader: {
        position: 'absolute',
        bottom: 15,
        right: 20
    },
    feedHeaderContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    feedHeaderTitle: {
        marginTop: 10,
        fontSize: 18,
        color: colors.white,
        fontWeight: 'bold',
        textShadowColor: colors.black,
        textShadowOffset: {
            width: 0,
            height: 0
        },
        textShadowRadius: .5,
        shadowOpacity: .1
    },
    feedSectionContainer: {
        borderRadius: 3,
        borderWidth: 0,
        shadowRadius: 0,
        width: '95%',
    },
    feedSectionPeopleContainer: {
        marginBottom: 10
    },
    feedSectionTitleContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    feedSectionTitle: {
        fontSize: 18,
        color: colors.darkGrey,
        textAlign: 'left',
        fontWeight: 'bold',
        flex: 1
    },
    feedSectionTitleAddIconContainer: {
        alignSelf: 'flex-end'
    },
    feedSectionDivider: {
        height: 0,
        padding: 0,
        margin: 0,
        backgroundColor: colors.white
    },
    feedSectionWrapper: {
        borderWidth: 0
    },
    feedItemTitle: {
        color: colors.black,
        paddingLeft: 10,
        marginBottom: 2
    },
    feedItemSubtitle: {
        color: colors.darkGrey,
        paddingLeft: 10,
    },
    feedItemDetail: {
        color: colors.grey,
        fontSize: 12,
        marginBottom: 15
    },
    feedItemImage: {
        width: 30,
        height: 30,
        borderRadius: 15
    }
});