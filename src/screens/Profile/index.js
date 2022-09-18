import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  Alert,
} from "react-native";

const Profile = () => {
  const [name, setName] = useState("Vinnie");
  const [email, setEmail] = useState("vinnie@gmail.com");
  const [password, setPassword] = useState("Abc123#");

  //* mock
  const cpf = useMemo(() => {
    return "12312312312";
  }, []);

  async function saveChanges() {
    const data = {
      name,
      email,
      password,
    };

    Alert.alert("Salvar alterações", "Alterações salvas com sucesso!", [
      { text: "OK", onPress: () => console.log("Ok pressed") },
    ]);
  }

  async function deleteAccount() {
    Alert.alert(
      "Excluir conta",
      "Tem certeza que deseja excluir essa conta? Essa ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelar"),
          style: "cancel",
        },
        { text: "Excluir", onPress: () => console.log("Excluir") },
      ]
    );
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Perfil</Text>
        <Text style={styles.headeText}>Visualize ou altere seus dados</Text>
      </View>
      <View>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder={"Nome"}
          placeholderTextColor={"#666"}
          onChangeText={(text) => setName(text)}
          defaultValue={name}
        />
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder={"Email"}
          placeholderTextColor={"#666"}
          onChangeText={(text) => setEmail(text)}
          defaultValue={email}
        />
      </View>
      <View>
        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          placeholder={"CPF"}
          placeholderTextColor={"#666"}
          defaultValue={cpf}
          editable={false}
        />
      </View>
      <View>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder={"Senha"}
          placeholderTextColor={"#666"}
          onChangeText={(text) => setPassword(text)}
          defaultValue={password}
        />
      </View>
      <View style={styles.footer}>
        <Button
          onPress={deleteAccount}
          title="Excluir conta"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Pressable style={styles.button} onPress={saveChanges}>
          <Text style={styles.buttonText}>Salvar alterações</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
    // margin: 10,
  },
  headerTitle: {
    fontSize: 38,
    fontFamily: "Poppins_600SemiBold",
    marginTop: 0,
  },
  headeText: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },

  label: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    marginTop: 5,
    color: "#004997",
  },
  input: {
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    color: "#000",
    borderColor: "#004997",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#004997",
    margin: 20,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  footer: {
    // alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
