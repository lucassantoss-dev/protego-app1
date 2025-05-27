import { Platform, StyleSheet } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: 'rgb(6, 15, 27)',
    },
    viewContainerLogo: {
        flex: 1,
        backgroundColor: '#111e31',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewContainerForm: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: '5%',
    },
    modalForm: {
        marginTop: 32,
    },
    input: {
        background: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(204, 204, 204, 0.5)',
        borderRadius: 16,
        padding: 12,
        marginBottom: 24,
        minWidth: 320,
    },
    loginContainer: {
        height: 83,
        marginTop: 1,
        paddingHorizontal: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    icon: {
        backgroundColor: '#fff',
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        marginHorizontal: 30,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 1,
            },
            android: {
                elevation: 2,
            },
        }),
    },
}); 