import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

export default function Events({ route }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isFocused = useIsFocused();

    const fetchItems = async () => {
        try {
            const response = await axios.get("http://172.16.50.49:5003/get-events");
            if (response.data.status === 'ok') {
                setItems(response.data.items);
            } else {
                Alert.alert('Error', response.data.message || 'Failed to fetch events');
            }
        } catch (err) {
            console.error("Error fetching events:", err);
            setError('Failed to connect to server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isFocused || (route.params && route.params.refresh)) {
            setLoading(true);
            fetchItems();
        }
    }, [isFocused, route.params]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Events</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemName}>{item.title}</Text>
                        <Text style={styles.itemDate}>Date: {item.date}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                        <Text style={styles.itemLocation}>Location: {item.location}</Text>
                        <Text style={styles.itemCategory}>Category: {item.category}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f0f8ff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    itemContainer: { padding: 16, marginVertical: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, backgroundColor: '#fff' },
    itemName: { fontSize: 18, fontWeight: 'bold' },
    itemDate: { fontSize: 16, color: 'green' },
    itemDescription: { fontSize: 14, color: '#555' },
    itemLocation: { fontSize: 14, color: '#555' },
    itemCategory: { fontSize: 14, color: '#555' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: { color: 'red', fontSize: 16 },
});
