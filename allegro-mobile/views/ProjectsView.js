import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../components/authProvider";
import { ListItem } from "react-native-elements";

export function ProjectsView({ navigation }) {
  const { projectData } = useAuth();

  // the onClickProject navigates to the Task List with the project name
  // and project partition value
  const onClickProject = async (project) => {
    navigation.navigate("Container List", {
      name: project.name,
      projectPartition: project.partition,
    });
  };

  return (
    <View>
      {projectData.map((project) => (
        <View key={project.name}>
          <ListItem key={project.name} bottomDivider onPress={() => onClickProject(project)}>
            <ListItem.Content>
              <ListItem.Title>{project.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      ))}
    </View>
  );
}