




import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for icons

export default function Events({ route }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isFocused = useIsFocused();

    const fetchItems = async () => {
        try {
            const response = await axios.get("http://192.168.18.34:5003/get-events");
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
                <ActivityIndicator size="large" color="#3b5998" />
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
            <Text style={styles.title}>Upcoming Events</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemName}>{item.title}</Text>
                        <Text style={styles.itemDate}>Date: {item.date}</Text>

                        {/* Description Section */}
                        <Text style={styles.sectionHeading}>
                            <Icon name="file-text" size={16} color="#ff6347" /> Description
                        </Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>

                        {/* Location Section */}
                        <Text style={styles.sectionHeading}>
                            <Icon name="location-arrow" size={16} color="#4CAF50" /> Location
                        </Text>
                        <Text style={styles.itemLocation}>{item.location}</Text>

                        {/* Category Section */}
                        <Text style={styles.sectionHeading}>
                            <Icon name="tag" size={16} color="#f39c12" /> Category
                        </Text>
                        <Text style={styles.itemCategory}>{item.category}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16, 
        backgroundColor: '#f7f7f7' 
    },
    title: { 
        fontSize: 26, 
        fontWeight: 'bold', 
        marginBottom: 20, 
        color: '#333',
        textAlign: 'center'
    },
    itemContainer: { 
        padding: 20, 
        marginVertical: 12, 
        borderRadius: 12, 
        backgroundColor: '#fff',
        borderColor: '#e4e4e4', 
        borderWidth: 1,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 5,
        elevation: 3,
    },
    itemName: { 
        fontSize: 20, 
        fontWeight: '600', 
        color: '#333',
        marginBottom: 8 
    },
    itemDate: { 
        fontSize: 16, 
        color: '#4CAF50', 
        marginBottom: 6
    },
    sectionHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 4,
        color: '#333',
    },
    itemDescription: { 
        fontSize: 14, 
        color: '#555', 
        marginBottom: 6
    },
    itemLocation: { 
        fontSize: 14, 
        color: '#777', 
        marginBottom: 6 
    },
    itemCategory: { 
        fontSize: 14, 
        color: '#888', 
        marginBottom: 10
    },
    loadingContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    errorContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    errorText: { 
        color: '#f44336', 
        fontSize: 18,
        fontWeight: 'bold'
    },
});
