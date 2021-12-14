import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Register() {
    const handlePress = () => {
        console.log("Press...");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Register</Text>
            <TextInput style={styles.input} placeholder='email' keyboardType='email-address' />
            <TextInput style={styles.input} placeholder='username' />
            <TextInput style={styles.input} secureTextEntry placeholder='password' />
            <TextInput style={styles.input} secureTextEntry placeholder='confirm password' />
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    heading: {
        marginTop: 40,
        fontSize: 30,
        fontWeight: "600",
        color: "black",
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 10,
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: "#bbb",
        marginTop: 10,
        padding: 10,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15
    },
    buttonText: {
        fontSize: 17,
        color: "black"
    }
});
