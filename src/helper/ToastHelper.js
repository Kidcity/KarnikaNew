import { Alert } from "react-native";
import Toast from 'react-native-toast-message'

export function errorAlert(title, message, onPress) {
  let button_text = "OK"
  if (message == "server_error") {
    title = "Oops!"
    message = "Something went wrong."
    button_text = "Retry"
  }
  Alert.alert(title, message,
    [
      { text: button_text, onPress: (onPress) ? onPress : () => { } }
    ]
  )
}

export function successToast(message, message2) {
  // console.log("successToast() ====> ", message, message2);
  Toast.show({
    type: 'success',
    text1: message,
    text2: message2
  });
}

export function errorToast(message, message2) {
  Toast.show({
    type: 'error',
    text1: message,
    text2: message2
  });
}

export function retryAlert(onPressFunc) {
  Alert.alert("Oops!", "Something went wrong.", [
    {
      text: "Cancel"
    },
    {
      text: "Retry",
      onPress: onPressFunc
    }
  ])
}