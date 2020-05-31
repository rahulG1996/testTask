import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';

const baseUrl = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=';

const Home = props => {
  const [postData, setPostData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFooter, setLoadingFooter] = useState(false);

  useEffect(() => {
    let pagenumber = pageNumber;
    fetch(baseUrl + pagenumber, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.hits) {
          pagenumber = pagenumber + 1;
          setPostData(responseData.hits);
          setSearchData(responseData.hits);
          setLoading(false);
          setPageNumber(pagenumber);
        }
      })
      .catch(err => alert(err));

    const interval = setInterval(() => {
      periodicallyHitApi();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  function periodicallyHitApi() {
    fetch(baseUrl + pageNumber, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.hits) {
          let postdata = [...postData, ...responseData.hits];
          setPostData(postdata);
          setSearchData(postdata);
        }
      })
      .catch(err => alert(err));
  }

  const _renderItem = item => {
    let items = item.item;
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Details', {items})}>
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
      </TouchableOpacity>
    );
  };

  function handleLoadMore() {
    setLoadingFooter(true);
    let pagenumber = pageNumber + 1;
    setPageNumber(pagenumber);
    fetch(baseUrl + pagenumber, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.hits) {
          //   console.warn('extra data', responseData.hits);
          let postdata = [...postData, ...responseData.hits];
          setPostData(postdata);
          setLoadingFooter(false);
        }
      });
  }

  useEffect(() => {
    console.warn(postData.length);
  });

  function searchDataMethod(e) {
    let searchAfter = searchData.filter(item => {
      return (
        item.author.includes(e) ||
        item.title.includes(e) ||
        item.url.includes(e)
      );
    });
    setPostData(searchAfter);
  }

  function _footerComponent() {
    if (loadingFooter) {
      return (
        <View style={{height: 100, justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    } else return null;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{alignItems: 'center', flex: 1}}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search ..."
            onChangeText={e => searchDataMethod(e)}
          />
        </View>
        <View style={{paddingBottom: '20%'}}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={postData}
              renderItem={item => _renderItem(item)}
              onEndReached={() => handleLoadMore()}
              onEndReachedThreshold={0.01}
              ListFooterComponent={() => _footerComponent()}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

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
  inputContainer: {
    width: '80%',
    borderWidth: 1,
    marginVertical: '5%',
    borderColor: 'gray',
    borderRadius: 10,
  },
});
