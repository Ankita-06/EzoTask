import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Alert,
} from 'react-native';
import UserCard from '../components/UserCard';
import { fetchUsers } from '../config/api';

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadUsers = async (pageNumber = 1) => {
    if (pageNumber === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const newUsers = await fetchUsers(pageNumber, 10);
      if (pageNumber === 1) {
        setUsers(newUsers);
      } else {
        setUsers(prev => [...prev, ...newUsers]);
      }
      setPage(pageNumber);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch users');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore) {
      loadUsers(page + 1);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadUsers(1);
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator style={{ margin: 10 }} size="large" />;
  };

  if (loading && page === 1) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <UserCard user={item} />}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
};

export default UserListScreen;
