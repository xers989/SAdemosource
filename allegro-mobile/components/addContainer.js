import React, { useState } from "react";
import { Overlay, Input, Button } from "react-native-elements";
import styles from "../stylesheet";

export function AddContainer({ createContainer }) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newContainerNumber, setNewContainerNumber] = useState("");
  const [newPosition, setNewPosition] = useState("");

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{ width: "90%" }}
        onBackdropPress={() => setOverlayVisible(false)}
      >
        <>
          <Input
            placeholder="Container Number"
            onChangeText={(text) => setNewContainerNumber(text)}
            autoCapitalize='none'
            autoFocus={true}
          />
          <Input
            placeholder="Position"
            onChangeText={(text) => setNewPosition(text)}
            autoCapitalize='none'
          />
          <Button
            title="Create"
            onPress={() => {
              setOverlayVisible(false);
              createContainer(newContainerNumber, newPosition);
            }}
          />
        </>
      </Overlay>
      <Button
        type="clear"
        titleStyle={styles.plusButton}
        title="&#x2b;"
        onPress={() => {
          setOverlayVisible(true);
        }}
      />
    </>
  );
}