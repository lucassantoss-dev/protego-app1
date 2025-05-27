import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: 'rgb(6, 15, 27)',
    },
    viewContainerLogo: {
        backgroundColor: '#111e31',
        paddingTop: 40,
        paddingBottom: 20,
    },
    logoImage: {
        width: 60,
        height: 40,
        marginLeft: 10,
        marginBottom: 5,
    },
    headerContent: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 6,
        paddingTop: 0,
        paddingHorizontal: '5%',
    },
    logoContent: {
        flexDirection: 'column',
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    greeting: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
    },
    personInformations: {
        marginTop: 0,
    },
    profileContent: {
        position: 'absolute',
        right: '5%',
        top: 6,
    },
    imageProfile: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        marginTop: 32,
    },
    cityContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    changeButton: {
        marginLeft: 10,
    },
    homeContainerContent: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '5%',
    },
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
        height: 96,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    iconContainer: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        marginRight: 8,
        borderRightWidth: 1,
        borderRightColor: '#e1e8ed',
    },
    rightIconContainer: {
        marginLeft: 'auto',
        padding: 10,
        backgroundColor: '#111e31',
        borderRadius: 12,
    },
});

export const CenteredContainer = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});