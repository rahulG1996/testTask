import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import moment from 'moment';

const ViewData = props => {
  const [items, setData] = useState({});

  useEffect(() => {
    console.warn('props', props.route.params.items);
    if ((props.route.params, props.route.params.items)) {
      setData(props.route.params.items);
    }
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View elevation={2} style={styles.mainConatiner}>
        <View style={styles.rowContainer}>
          <View style={styles.rowTitle}>
            <Text style={styles.rowTitleText}>Title : </Text>
          </View>
          <View style={styles.rowTextContainer}>
            <Text style={styles.rowText}>{items.title}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.rowTitle}>
            <Text style={styles.rowTitleText}>Author : </Text>
          </View>
          <View style={styles.rowTextContainer}>
            <Text style={styles.rowText}>{items.author}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.rowTitle}>
            <Text style={styles.rowTitleText}>Created At : </Text>
          </View>
          <View style={styles.rowTextContainer}>
            <Text style={styles.rowText}>
              {moment(items.created_at).format('llll')}
            </Text>
          </View>
        </View>
        {items.url ? (
          <View style={styles.rowContainer}>
            <View style={styles.rowTitle}>
              <Text style={styles.rowTitleText}>Url : </Text>
            </View>
            <View style={styles.rowTextContainer}>
              <Text
                style={[styles.rowText, {color: 'blue'}]}
                onPress={() => Linking.openURL(items.url)}>
                {items.url}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};
export default ViewData;

const styles = StyleSheet.create({
  mainConatiner: {
    backgroundColor: 'white',
    marginVertical: '3%',
    paddingVertical: '5%',
    borderRadius: 10,
    marginHorizontal: '2%',
  },
  rowContainer: {flexDirection: 'row', paddingVertical: '2%'},
  rowTitle: {width: '25%', alignItems: 'center'},
  rowTitleText: {fontSize: 16},
  rowText: {fontSize: 16, fontWeight: 'bold'},
  rowTextContainer: {width: '75%'},
});
