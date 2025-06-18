import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";

export default function OtpScreen({ navigation, route }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isResending, setIsResending] = useState(false);
  const email = route?.params?.email || "";
  const userData = route?.params?.userData || null; // For resending OTP

  // Refs for auto-focus
  const inputs = Array.from({ length: 6 }, () => useRef(null));

  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 5) {
        inputs[index + 1].current.focus();
      }
      if (!text && index > 0) {
        inputs[index - 1].current.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      Alert.alert("Error", "Please enter the 6-digit OTP.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Registration complete!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.message || "Invalid OTP");
      }
    } catch (error) {
      Alert.alert("Error", "Network error");
    }
  };

  const handleResend = async () => {
    if (!userData) {
      Alert.alert("Error", "Cannot resend OTP. Please restart registration.");
      return;
    }
    setIsResending(true);
    try {
      let formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        if (key === "validID" && value) {
          formData.append("validID", {
            uri: value.uri,
            name: "valid_id.jpg",
            type: "image/jpeg",
          });
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("OTP resent", "Check your email for the new OTP.");
        setOtp(["", "", "", "", "", ""]);
        inputs[0].current.focus();
      } else {
        Alert.alert("Error", data.message || "Failed to resend OTP.");
      }
    } catch (e) {
      Alert.alert("Error", "Network error");
    }
    setIsResending(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>✉️</Text>
        </View>
        <Text style={styles.message}>
          We've sent a one-time password (OTP) to your email.
          Please check your inbox and enter the code to continue.
        </Text>
      </View>

      <View style={styles.otpBoxes}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputs[index]}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
            value={digit}
            returnKeyType={index === 5 ? "done" : "next"}
            onSubmitEditing={() => {
              if (index < 5) {
                inputs[index + 1].current.focus();
              } else {
                Keyboard.dismiss();
              }
            }}
          />
        ))}
      </View>

      <Text style={styles.resend}>
        OTP not received?{" "}
        <Text
          style={{ color: "#F5A623" }}
          onPress={isResending ? null : handleResend}
        >
          {isResending ? "Resending..." : "RESEND"}
        </Text>
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef7ee",
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  iconBox: {
    backgroundColor: "#000",
    padding: 40,
    borderRadius: 100,
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
    color: "#fff",
  },
  message: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
  otpBoxes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  input: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  resend: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});