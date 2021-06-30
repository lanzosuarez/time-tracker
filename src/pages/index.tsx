import React from "react";
import { PageContainer } from "../components/PageContainer";
import UnAuthenticated from "../components/UnAuthenticated";
import Authenticated from "../components/Authenticated";

const Index = () => {
  const user = null;
  return (
    <PageContainer height="100vh" w="100%">
      {user ? <Authenticated /> : <UnAuthenticated />}
    </PageContainer>
  );
};

export default Index;
