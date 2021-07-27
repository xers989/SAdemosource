import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Container } from "./containerSchema";
import { useAuth } from "./authProvider";

const ContainersContext = React.createContext(null);

const OpenRealmBehaviorConfiguration = {
  type: "openImmediately",
};

const ContainersProvider = ({ children, projectPartition }) => {
  const [containers, setContainers] = useState([]);
  const { user } = useAuth();

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

  useEffect(() => {
    const config = {
      sync: {
        user: user,
        partitionValue: projectPartition,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        // The behavior to use when a realm file already exists locally,
        // i.e. you have previously opened the realm.
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };

    // open a realm for this particular project
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;

      const syncContainers = projectRealm.objects("Container");

      let sortedContainers = syncContainers.sorted("containerNumber");

      setContainers([...sortedContainers]);
      sortedContainers.addListener(() => {
        setContainers([...sortedContainers]);
      });
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setContainers([]);
      }
    };
  }, [user, projectPartition]);

  const createContainer = (newContainerNumber, newPosition) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.create(
        "Container",
        new Container({
          containerNumber: newContainerNumber,
          realm_id: projectPartition,
          position: newPosition,
        })
      );
    });
  };

  const setContainerPosition = (container, position) => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
        container.position = position;
    });
  };

  const deleteContainer = (container) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.delete(container);
      setContainers([...projectRealm.objects("Container").sorted("containerNumber")]);
    });
  };

  return (
    <ContainersContext.Provider
      value={{
        createContainer,
        deleteContainer,
        setContainerPosition,
        containers,
      }}
    >
      {children}
    </ContainersContext.Provider>
  );
};

const useContainers = () => {
  const container = useContext(ContainersContext);
  if (container == null) {
    throw new Error("useContainers() called outside of a ContainersProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return container;
};

export { ContainersProvider, useContainers };