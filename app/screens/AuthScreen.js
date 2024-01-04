import React, { useEffect, useState } from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import loginBg from "../images/logInBg.jpg";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../redux/ActionCreator";
import { changeMode } from "../redux/SliceCreator";

const AuthScreen = (props) => {
  const [authStates, setAuthStates] = useState({
    mode: "login",
    inputs: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  //REDUX STATE AND DISPATCH STARTS
  let dispatch = useDispatch();
  let data = useSelector(state =>state.finance);
  //REDUX STATE AND DISPATCH STARTS
  const isFocused = useIsFocused();


 
  useEffect(() => {
    setAuthStates({
      ...authStates,
      inputs: {
        email: "",
        password: "",
        confirmPassword: "",
      },
    });
  }, [isFocused]);

  const switchViews = () => {
    if(authStates.mode === "login"){
      dispatch(changeMode("signup"));
    }else{
      dispatch(changeMode("login"));
    }
    setAuthStates({
      ...authStates,
      mode: authStates.mode === "login" ? "signup" : "login",
      inputs: {
        email: "",
        password: "",
        confirmPassword: "",
      },
    });
  };

  const updateAuthState = (value, name) => {
    setAuthStates({
      ...authStates,
      inputs: {
        ...authStates.inputs,
        [name]: value,
      },
    });
  };

  const validAuthStates = () => {
    const email = authStates.inputs.email;
    const password = authStates.inputs.password;
    const confirmPassword = authStates.inputs.confirmPassword;
    if (email !== "" && password !== "") {
      if (authStates.mode === "login") {
        dispatch(authUser({
          mode: "login",
          user: {
            email: email,
            password: password,
            returnSecureToken: true,
          },
        }));
      } else {
        if (password === confirmPassword) {
          dispatch(
            authUser({
              mode: "signup",
              user: {
                email: email,
                password: password,
                returnSecureToken: true,
              },
            })
          );
        } else {
          alert("Password doesn't match!");
        }
      }
    } else {
      alert("Input filling incomplete!!");
    }
  };

  return (
    <View style={styles.logInView}>
      <ImageBackground
        blurRadius={10}
        source={loginBg}
        style={{ ...styles.logInView, width: "100%", flex: 1 }}
      >
        <TouchableOpacity
          onPress={() => switchViews()}
          style={{
            ...styles.btnContainer,
            backgroundColor: "#1167b1",
            width: "85%",
            paddingVertical: 8,
          }}
        >
          <Text style={styles.button}>
            {authStates.mode === "login"
              ? "Switch to sign up"
              : "Switch to log in"}
          </Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Your email adress"
          value={authStates.inputs.email}
          style={styles.input}
          onChangeText={(value) => updateAuthState(value, "email")}
        />
        <TextInput
          placeholder="Password"
          value={authStates.inputs.password}
          style={styles.input}
          onChangeText={(value) => updateAuthState(value, "password")}
        />
        {authStates.mode !== "login" && (
          <TextInput
            placeholder="Confirm password"
            value={authStates.inputs.confirmPassword}
            style={styles.input}
            onChangeText={(value) => updateAuthState(value, "confirmPassword")}
          />
        )}

        {/* <Button
        title="Log in"
        onPress={() => {
          props.navigation.navigate("Home");
        }}
       
      /> */}

        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            validAuthStates();
          }}
        >
          <Text style={styles.button}>
            {authStates.mode === "login" ? "Log in" : "Sign up"}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  logInView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "85%",
    padding: 5,
    marginTop: 10,
    backgroundColor: "#EEE",
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 4,
  },
  button: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
  },
  btnContainer: {
    flexDirection: "row",
    width: 150,
    paddingVertical: 8,
    backgroundColor: "#009688",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
export default AuthScreen;
