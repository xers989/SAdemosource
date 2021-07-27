import React, { useState, useEffect } from "react";
import { View } from "react-native";

import { useContainers } from "../components/containersProvider";
import { ContainerItem } from "../components/containerItem";
import { AddContainer } from "../components/addContainer";

export function ContainersView({ navigation, route }) {
  const { name } = route.params;

  const [overlayVisible, setOverlayVisible] = useState(false);

  const { containers, createContainer } = useContainers();

  useEffect(() => {
    navigation.setOptions({
      headerRight: function Header() {
        return <AddContainer createContainer={createContainer} />;
      },
      title: `Containers`,
    });
  }, []);

  return (
    <View>
      {containers.map((container) =>
        container ? <ContainerItem key={`${container._id}`} container={container} /> : null
      )}
    </View>
  );
}