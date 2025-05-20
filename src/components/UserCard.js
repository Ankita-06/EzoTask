import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserCard = ({ user }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: user.picture.large }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {`${user.name.title} ${user.name.first} ${user.name.last}`}
        </Text>
        <Text style={styles.detail}>Age: {user.dob.age}</Text>
        <Text style={styles.detail}>{user.phone}</Text>
        <Text style={styles.detail}>{user.email}</Text>
        <Text style={styles.detail}>
          {`${user.location.city}, ${user.location.country}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#4e91fc',
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
});

export default UserCard;
