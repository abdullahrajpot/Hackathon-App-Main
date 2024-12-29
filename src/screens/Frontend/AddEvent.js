import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

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
            const response = await axios.post("http://172.16.50.49:5003/add-event", {
                title,
                description,
                date,
                location,
                category,
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

            <TextInput
                style={styles.input}
                placeholder="Enter Title"
                value={title}
                onChangeText={(val) => setTitle(val)}
            />
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Enter Description"
                value={description}
                onChangeText={(val) => setDescription(val)}
            />
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Enter Date (YYYY-MM-DD)"
                value={date}
                onChangeText={(val) => setDate(val)}
            />
            {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Enter Location"
                value={location}
                onChangeText={(val) => setLocation(val)}
            />
            {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Enter Category"
                value={category}
                onChangeText={(val) => setCategory(val)}
            />
            {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

            <View style={styles.buttonContainer}>
                <Button title="Add Event" onPress={handleAddEvent} />
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
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 10,
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
});
