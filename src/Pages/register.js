import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  StatusBar,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("+63");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validID, setValidID] = useState(null);

  // OTP states
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Use your computer's local IP address here!
  const BACKEND_URL = "http://192.168.1.61:5000"; // <-- CHANGE THIS

  // Request permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Camera roll permissions are needed to upload an ID."
        );
      }
    })();
  }, []);

  // Image picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.IMAGE],
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setValidID(result.assets[0]);
    }
  };

  // Send registration data to backend, which sends OTP to email
  const sendOtp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill out all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }
    try {
      let formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("birthday", birthday);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("password", password);
      if (validID) {
        formData.append("validID", {
          uri: validID.uri,
          name: validID.fileName || "valid_id.jpg",
          type: validID.type || "image/jpeg",
        });
      }

      const response = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setIsOtpSent(true);
        setOtpModalVisible(true);
        Alert.alert("OTP sent", "Check your email for the code.");
      } else {
        Alert.alert("Error", data.message || "Failed to send OTP.");
      }
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  // Verify OTP with backend
  const verifyOtp = async () => {
    if (!otp) {
      Alert.alert("Missing OTP", "Please enter the OTP sent to your email.");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpModalVisible(false);
        Alert.alert("Registration Success", "Your account has been created.");
        navigation.navigate("Login");
      } else {
        Alert.alert("Invalid OTP", data.message || "Please try again.");
      }
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Registration</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 5 }]}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, { flex: 1, marginLeft: 5 }]}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 5 }]}
            placeholder="MM/DD/YYYY"
            value={birthday}
            onChangeText={setBirthday}
          />
          <TextInput
            style={[styles.input, { flex: 1, marginLeft: 5 }]}
            placeholder="Phone No."
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.input} onPress={pickImage}>
          <Text style={{ color: validID ? "#000" : "#888" }}>
            {validID ? "ID selected" : "Upload or capture image"}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Text style={styles.terms}>
          By clicking next, you agree to our{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("TermsAndConditions")}
          >
            Terms and Conditions
          </Text>
        </Text>

        <TouchableOpacity style={styles.button} onPress={sendOtp}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginLink}>
            Already have an account? <Text style={styles.link}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* OTP Modal */}
      <Modal
        visible={otpModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setOtpModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              Enter OTP sent to your email
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="numeric"
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
            />
            <TouchableOpacity style={styles.button} onPress={verifyOtp}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOtpModalVisible(false);
                setOtp("");
              }}
            >
              <Text style={{ color: "#F5A623", marginTop: 10, textAlign: "center" }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6EE",
  },
  header: {
    backgroundColor: "#1C1C1C",
    paddingVertical: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  form: {
    padding: 24,
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#1C1C1C",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    marginVertical: 14,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  terms: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },
  link: {
    color: "#F5A623",
    fontWeight: "bold",
  },
  loginLink: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    width: "80%",
    alignItems: "center",
  },
});