



import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';  // Importing FontAwesome icons

export default function AddEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});

    const handleAddEvent = async () => {
        const newErrors = {};
    
        if (!title) newErrors.title = 'Title is required';
        if (!description) newErrors.description = 'Description is required';
        if (!date) newErrors.date = 'Date is required';
        if (!location) newErrors.location = 'Location is required';
        if (!category) newErrors.category = 'Category is required';
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        try {
            const token = 'your-jwt-token';  // Make sure this token is stored in your app, e.g., after login
    
            const response = await axios.post("http://192.168.18.34:5003/add-event", {
                title,
                description,
                date,
                location,
                category,
                token,  // Add the token in the request body
            });
    
            if (response.data.status === 'ok') {
                Alert.alert('Success', 'Event added successfully');
                setTitle('');
                setDescription('');
                setDate('');
                setLocation('');
                setCategory('');
                setErrors({});
            } else {
                Alert.alert('Error', response.data.message || 'Failed to add event');
            }
        } catch (error) {
            console.error("Error:", error);
            Alert.alert('Error', 'Failed to connect to server. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Event</Text>

            <View style={styles.inputContainer}>
                <Icon name="edit" size={20} color="#3b5998" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Title"
                    value={title}
                    onChangeText={(val) => setTitle(val)}
                />
            </View>
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

            <View style={styles.inputContainer}>
                <Icon name="file-text" size={20} color="#ff6347" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Description"
                    value={description}
                    onChangeText={(val) => setDescription(val)}
                />
            </View>
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

            <View style={styles.inputContainer}>
                <Icon name="calendar" size={20} color="#4CAF50" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Date (YYYY-MM-DD)"
                    value={date}
                    onChangeText={(val) => setDate(val)}
                />
            </View>
            {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

            <View style={styles.inputContainer}>
                <Icon name="location-arrow" size={20} color="#f39c12" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Location"
                    value={location}
                    onChangeText={(val) => setLocation(val)}
                />
            </View>
            {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

            <View style={styles.inputContainer}>
                <Icon name="tag" size={20} color="#8e44ad" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Category"
                    value={category}
                    onChangeText={(val) => setCategory(val)}
                />
            </View>
            {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
                    <Text style={styles.buttonText}>Add Event</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#f0f8ff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 15,
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#24243E',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 30,
    },
});
