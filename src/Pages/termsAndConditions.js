import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function TermsAndConditions({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Terms and Conditions</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.paragraph}>
          Welcome to <Text style={styles.bold}>RentALL</Text>, a rental platform
          dedicated to connecting trusted users in Cagayan de Oro City (CDO),
          Philippines. These Terms and Conditions govern your use of RentALL and
          outline your rights and responsibilities.
        </Text>

        <Text style={styles.sectionTitle}>1. Scope & Acceptance</Text>
        <Text style={styles.bullet}>
          • Exclusively serves verified residents of Cagayan de Oro City (CDO).
        </Text>
        <Text style={styles.bullet}>
          • By registering, users agree to abide by these terms and local laws.
        </Text>

        <Text style={styles.sectionTitle}>
          2. User Registration & Authentication
        </Text>
        <Text style={styles.bullet}>
          • You must be at least 18 years old and reside in Cagayan de Oro City.
        </Text>
        <Text style={styles.bullet}>
          • All users must register and create an account.
        </Text>
        <Text style={styles.bullet}>
          • You agree to provide accurate and up-to-date information during
          registration.
        </Text>
        <Text style={styles.bullet}>
          • Users must not impersonate others or misrepresent their identity.
        </Text>
        <Text style={styles.bullet}>
          • Lessors must submit valid ID (e.g., government-issued) and proof of
          CDO residency for the verification process to ensure trust and safety.
        </Text>

        <Text style={styles.sectionTitle}>3. Rental Categories & Listings</Text>
        <Text style={styles.bold}>3.1 Permitted Categories</Text>
        <Text style={styles.bullet}>• Clothing & Accessories</Text>
        <Text style={styles.bullet}>• Tools & Equipment</Text>
        <Text style={styles.bullet}>• Electronics</Text>
        <Text style={styles.bullet}>• Home Goods & Furniture</Text>

        <Text style={styles.bold}>3.2 Listing Requirements</Text>
        <Text style={styles.bullet}>
          • Accurate descriptions, clear photos, and pricing.
        </Text>
        <Text style={styles.bullet}>
          • Prohibited items: weapons, illegal goods, or hazardous materials.
        </Text>

        <Text style={styles.sectionTitle}>4. Listing and Renting</Text>
        <Text style={styles.bullet}>
          • Lessors (item owners) may list items with clear descriptions and
          accurate images.
        </Text>
        <Text style={styles.bullet}>
          • Renters must return items in the same condition and by the agreed
          return time.
        </Text>
        <Text style={styles.bullet}>
          • Late returns or damages may incur penalties or disputes.
        </Text>

        <Text style={styles.sectionTitle}>5. Payments</Text>
        <Text style={styles.bullet}>
          • RentALL does not process or facilitate payments. All financial
          transactions are handled directly between the lessor (provider) and
          renter.
        </Text>
        <Text style={styles.bullet}>
          • Renters are required to provide a down payment as agreed upon by
          both parties.
        </Text>
        <Text style={styles.bullet}>
          • The renter must submit proof of down payment (e.g., screenshot of
          bank/e-wallet transfer, receipt) to the lessor as a reference for
          verification.
        </Text>
        <Text style={styles.bullet}>
          • The remaining balance, if any, must be settled according to the
          agreement between both parties.
        </Text>
        <Text style={styles.bullet}>
          • RentALL shall not be held liable for:
        </Text>
        <Text style={styles.subBullet}> o Failed or fraudulent payments</Text>
        <Text style={styles.subBullet}>
          {" "}
          o Disputes over payment amounts, refunds, or delays
        </Text>
        <Text style={styles.subBullet}>
          {" "}
          o Issues related to damage, item returns, or non-fulfillment
        </Text>
        <Text style={styles.bullet}>
          • Users are encouraged to keep all communication and proof of
          transactions documented in case of disputes.
        </Text>

        <Text style={styles.sectionTitle}>6. Ratings and Reviews</Text>
        <Text style={styles.bullet}>
          • After each transaction, both renters and providers may leave
          reviews.
        </Text>
        <Text style={styles.bullet}>
          • Users must submit honest, respectful, and non-defamatory feedback.
        </Text>
        <Text style={styles.bullet}>
          • RentALL reserves the right to remove inappropriate reviews.
        </Text>

        <Text style={styles.sectionTitle}>7. Notifications</Text>
        <Text style={styles.bullet}>
          RentALL may send real-time notifications to users:
        </Text>
        <Text style={styles.subBullet}>
          {" "}
          • New rental inquiries or interest from renters
        </Text>
        <Text style={styles.subBullet}>
          {" "}
          • Confirmation that a listing has been marked as rented
        </Text>
        <Text style={styles.subBullet}> • Return date reminders</Text>
        <Text style={styles.subBullet}>
          {" "}
          • Admin alerts, announcements, or account-related messages
        </Text>

        <Text style={styles.sectionTitle}>8. Liability & Disputes</Text>
        <Text style={styles.bullet}>
          • <Text style={styles.bold}>User Responsibility:</Text> RentALL is not
          liable for damage/misuse of rented items.
        </Text>
        <Text style={styles.bullet}>
          • <Text style={styles.bold}>Dispute Resolution:</Text> Users and
          providers must attempt mediation via the in-app chat.
        </Text>
        <Text style={styles.bullet}>
          • Unresolved issues escalate to RentALL’s admin team for arbitration.
        </Text>

        <Text style={styles.sectionTitle}>9. Admin Dashboard Authority</Text>
        <Text style={styles.bullet}>
          • <Text style={styles.bold}>Admin Rights:</Text>
        </Text>
        <Text style={styles.subBullet}>
          {" "}
          • Suspend/terminate accounts violating T&C.
        </Text>
        <Text style={styles.subBullet}>
          {" "}
          • Resolve disputes and monitor transactions.
        </Text>
        <Text style={styles.subBullet}> • Remove inappropriate listings.</Text>

        <Text style={styles.sectionTitle}>10. Termination</Text>
        <Text style={styles.bullet}>• RentALL may suspend accounts for:</Text>
        <Text style={styles.subBullet}> • Fraudulent activity.</Text>
        <Text style={styles.subBullet}> • Repeated policy violations.</Text>
        <Text style={styles.subBullet}>
          {" "}
          • Failure to resolve disputes fairly.
        </Text>

        <Text style={styles.sectionTitle}>11. Data Privacy</Text>
        <Text style={styles.bullet}>
          • Complies with the Philippine Data Privacy Act (RA 10173).
        </Text>
        <Text style={styles.bullet}>
          • User data is collected for transaction processing and will not be
          sold.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF6EE" },
  header: {
    backgroundColor: "#1C1C1C",
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  back: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  paragraph: {
    fontSize: 15,
    marginBottom: 20,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
    color: "#000",
  },
  bullet: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
  },
  subBullet: {
    fontSize: 13,
    marginLeft: 10,
    marginBottom: 4,
    color: "#555",
  },
  bold: {
    fontWeight: "bold",
  },
});
