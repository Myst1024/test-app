import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Providers from "./components/Providers";
import {
  Card,
  Avatar,
  IconButton,
  TextInput,
  Button,
  Text,
} from "react-native-paper";

export default function App() {
  const [reminders, setReminders] = useState([
    { title: "title1", description: "description2", time: new Date() },
  ]);

  const createNewReminder = ({ title, description, time }) =>
    setReminders([...reminders, { title, description, time }]);

  const Reminders = reminders.map(({ title, description, time }) => {
    return <Reminder title={title} description={description} time={time} />;
  });

  return (
    <Providers>
      <View key="app" style={styles.container}>
        <NewReminder createNewReminder={createNewReminder} />
        {Reminders}
        <StatusBar style="auto" />
      </View>
    </Providers>
  );
}

const NewReminder = ({ createNewReminder }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTime, setNewTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDatePickerChange = (e, selectedTime) => {
    setShowTimePicker(false);
    setNewTime(selectedTime);
  };

  const onCreateButtonPress = () => {
    createNewReminder({
      title: newTitle,
      description: newDescription,
      time: newTime,
    });
  };

  console.log("showPicker", showTimePicker);

  return (
    <View style={{ width: "100%" }}>
      <TextInput
        label="title"
        onChangeText={(text) => {
          setNewTitle(text);
        }}
      />
      <TextInput
        label="description"
        onChangeText={(text) => {
          setNewDescription(text);
        }}
      />
      <Button
        icon="clock"
        mode="contained"
        onPress={() => setShowTimePicker(true)}
      >
        {newTime.toLocaleTimeString()}
      </Button>
      <IconButton icon="floppy" onPress={onCreateButtonPress} />
      {showTimePicker && (
        <DateTimePicker
          value={newTime}
          mode="time"
          is24Hour={false}
          onChange={onDatePickerChange}
        />
      )}
    </View>
  );
};

const Reminder = ({ title, description, time }) => {
  return (
    <Card.Title
      title={title}
      subtitle={description}
      left={(props) => <Avatar.Icon {...props} icon="star" />}
      right={(props) => <Text {...props}>{time.toLocaleTimeString()}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
  },
  reminder: {
    backgroundColor: "#F1F1F1",
    padding: 10,
    borderRadius: 5,
  },
});
