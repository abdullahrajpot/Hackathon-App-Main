import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function AddEvent() {
    // State variables
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});

    // Function to handle adding item
    const handleAddItem = async () => {
        const newErrors = {};

        // Validate inputs
        if (!productName) newErrors.productName = 'Product Name is required';
        if (!price) newErrors.price = 'Price is required';
        if (!description) newErrors.description = 'Description is required';
        if (!category) newErrors.category = 'Category is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Making the request to add item
        try {
            const response = await axios.post("http://172.16.50.49:5003/add-item", {
                productName,
                price: parseFloat(price),
                description,
                category,
            });

            if (response.data.status === 'ok') {
                Alert.alert('Success', 'Item added successfully');
                setProductName('');
                setPrice('');
                setDescription('');
                setCategory('');
                setErrors({});
            } else {
                Alert.alert('Error', response.data.message || 'Failed to add item');
            }
        } catch (error) {
            console.error("Error:", error);
            Alert.alert('Error', 'Failed to connect to server. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Events</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Title"
                value={productTitle}
                onChangeText={(val) => setProductName(val)}
            />
            {errors.productTitle && <Text style={styles.errorText}>{errors.productTitle}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Enter Price"
                value={price}
                keyboardType="numeric"
                onChangeText={(val) => setPrice(val)}
            />
            {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Enter Description"
                value={description}
                onChangeText={(val) => setDescription(val)}
            />
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Enter Category"
                value={category}
                onChangeText={(val) => setCategory(val)}
            />
            {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

            <View style={styles.buttonContainer}>
                <Button title="Add Item" onPress={handleAddItem} />
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
