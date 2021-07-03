import React from "react";
import { PageContainer } from "components/PageContainer";
import UnAuthenticated from "components/UnAuthenticated";

const Index = () => {
  return (
    <PageContainer height="100vh" w="100%">
      <UnAuthenticated />
    </PageContainer>
  );
};

export default Index;
