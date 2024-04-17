import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AppState, Dimensions } from "react-native";
import * as FileSystem from "expo-file-system";
import * as SecureStore from "expo-secure-store";

const AppContext = React.createContext();
const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [signUpErrorMsg, setSignUpErrorMsg] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [signUpData, setSignUpData] = useState([]);
  const [signInData, setSignInData] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [coffees, setCoffees] = useState(null);
  const [filteredCoffees, setFilteredCoffees] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [categories, setCategories] = useState(null);
  const [usernameMsg, setUsernameMsg] = useState(null);
  const [emailMsg, setEmailMsg] = useState(null);
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [registerBtn, setRegisterBtn] = useState(true);
  const [orderData, setorderData] = useState(null);

  //setting the signup data
  const signUpDataChange = (text, name) => {
    setSignUpData({ ...signUpData, [name]: text });
    //checkRegisterBtn();
  };

  //setting the signin data
  const signInDataChange = (text, name) => {
    setSignInData({ ...signInData, [name]: text });
  };

  const checkRegisterBtn = () => {
    if (
      signUpData?.username?.length < 3 ||
      signUpData?.password?.length < 6 ||
      signUpData?.password == undefined ||
      signUpData?.username == undefined ||
      signUpData?.email == undefined ||
      emailMsg != null
    ) {
      setRegisterBtn(true);
    } else {
      setRegisterBtn(false);
    }
  };

  useEffect(() => {
    checkRegisterBtn();
  }, [signUpData, emailMsg]);

  //checking jwtToken existence
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setUserToken(result);
    } else {
      console.log("No values stored under that key.");
    }
  }

  useEffect(() => {
    getValueFor("jwtToken");
    //getValueForProfileImage("profileImage");
  }, []);

  //find all coffees
  const findCoffees = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.8:1337/api/coffees?populate=*",
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "*",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setCoffees(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  //find all categories
  const findCategories = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.8:1337/api/categories?populate=*",
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "*",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setCategories(response.data);
      return response;
    } catch (error) {
      setSignUpError(true);
      console.log(error);
    }
  };

  //registeration process
  const register = async () => {
    try {
      setIsLoading(true);
      setRegisterBtn(true);
      setSignUpError(false);
      setSignUpErrorMsg(null);
      const response = await axios.post(
        "http://192.168.1.8:1337/api/auth/local/register?populate=*",
        signUpData
      );
      if (profileImage) uploadToStrapi(response.data.user.id);
      setUserToken(response.data.jwt);
      save("jwtToken", response.data.jwt);
      fetchProfile();
      setIsLoading(false);
      setRegisterBtn(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      setRegisterBtn(false);
      setSignUpError(true);
      setSignUpErrorMsg(error.response.data.error.message);
      console.error(error.response.data.error.message);
    }
  };

  //login process
  const login = async () => {
    try {
      setIsLoading(true);
      setSignUpError(false);
      setSignUpErrorMsg(null);
      const response = await axios.post(
        "http://192.168.1.8:1337/api/auth/local",
        signInData
      );
      setUserToken(response.data.jwt);
      save("jwtToken", response.data.jwt);
      fetchProfile();
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      setSignUpError(true);
      setSignUpErrorMsg(error.response.data.error.message);
      console.error(error.response.data.error.message);
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("jwtToken");
    setUserToken(null);
  };

  //set value in store
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  //upload image to the registered user
  const uploadToStrapi = async (id) => {
    try {
      let uploading = await FileSystem.uploadAsync(
        `http://192.168.1.8:1337/api/upload`,
        profileImage.uri,
        {
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "files",
          parameters: {
            refId: String(id),
            ref: "plugin::users-permissions.user",
            field: "files",
          },
        }
      );
      // const response = JSON.parse(uploading.body);
      // console.log(response[0].url);
      //save("profileImage", response[0].url);
      return uploading;
    } catch (error) {
      console.log("Error", error);
      return error;
    }
  };

  //fetch user data
  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://192.168.1.8:1337/api/users/me", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        params: {
          "populate[orders][populate]": "*",
          "populate[files][populate]": "*",
        },
      });
      setProfileData(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  //make an order
  const makeOrder = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.8:1337/api/orders",
        {
          data: {
            details: [orderData],
            users_permissions_user: {
              connect: [profileData?.id],
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      //console.log(response?.data.data.id);
      //attachOrder(response.data.data.id);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  //attach order to user

  const attachOrder = async (id) => {
    try {
      const response = await axios.put(
        `http://192.168.1.8:1337/api/orders/${id}`,
        {
          data: {
            users: {
              connect: 1,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });

  return (
    <AppContext.Provider
      value={{
        dimensions,
        isLoading,
        userToken,
        setUserToken,
        setIsLoading,
        signUpData,
        setSignUpData,
        signUpDataChange,
        signInDataChange,
        profileImage,
        setProfileImage,
        register,
        findCoffees,
        coffees,
        findCategories,
        categories,
        login,
        fetchProfile,
        profileData,
        filteredCoffees,
        setFilteredCoffees,
        searchTimeout,
        setSearchTimeout,
        checkRegisterBtn,
        usernameMsg,
        setUsernameMsg,
        emailMsg,
        setEmailMsg,
        passwordMsg,
        setPasswordMsg,
        registerBtn,
        setRegisterBtn,
        signUpError,
        setSignUpError,
        signUpErrorMsg,
        signOut,
        makeOrder,
        orderData,
        setorderData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider, AppContext };
