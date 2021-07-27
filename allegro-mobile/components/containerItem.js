import React, { useState } from "react";
import { Text, ListItem } from "react-native-elements";
import { useContainers } from "./containersProvider";
import { ActionSheet } from "./actionSheet";

export function ContainerItem({ container }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const { deleteContainer, setContainerPosition } = useContainers();
  const actions = [
    {
      title: "Delete",
      action: () => {
        deleteContainer(container);
      },
    },
  ];

  //setContainerPosition(container, container.position);

  return (
    <>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (container._id) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
      />
      <ListItem key={container.id} bottomDivider onPress={() => setActionSheetVisible(true)}>
        <ListItem.Content>
          <ListItem.Title>{container.containerNumber}</ListItem.Title>
          <ListItem.Subtitle>Position: {container.position}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </>
  );
}