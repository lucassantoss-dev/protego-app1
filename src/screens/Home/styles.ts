import { StyleSheet } from 'react-native';
import { colors, metrics, fonts } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.primary,
        padding: metrics.basePadding,
        paddingTop: metrics.basePadding * 2,
    },
    title: {
        ...fonts.bold,
        color: colors.white,
        fontSize: 20,
    },
    content: {
        padding: metrics.basePadding,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: metrics.baseRadius,
        padding: metrics.basePadding,
        marginBottom: metrics.baseMargin,
        elevation: 2,
    },
    cardTitle: {
        ...fonts.medium,
        color: colors.text,
        marginBottom: metrics.baseSpacing,
        fontSize: 16,
    },
    cardDescription: {
        ...fonts.regular,
        color: colors.gray,
        fontSize: 14,
    },
}); 