import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import commonStyle from '../styles/common.style.js';

export default class DailyQuote extends React.Component {
  render() {
    return (
      <View style={styles.dailyQuoteContainer}>
        <Text
          style={{
            color: '#A3B5F8',
            fontSize: 50,
            position: 'absolute',
            left: 10,
          }}
        >
          "
        </Text>
        <Text
          style={{
            color: '#818181',
            lineHeight: 20,
            alignSelf: 'center',
            fontStyle: 'italic',
            fontSize: 14,
          }}
        >
          True happiness is to enjoy the present, without anxious dependence
          upon the future, not to amuse ourselves with either hopes or fears but
          to rest satisfied with what we have.”
        </Text>
        <Text style={styles.quoteText}>- Seneca</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dailyQuoteContainer: {
    ...commonStyle.borderCard,
    padding: 27,
    paddingRight: 20,
    paddingBottom: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  quoteText: {
    color: '#818181',
    lineHeight: 20,
    textAlign: 'right',
    fontStyle: 'italic',
    fontSize: 14,
  },
});
