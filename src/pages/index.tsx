import React from "react";

import { PageContainer } from "components/PageContainer";
import MyDay from "components/MyDay";
import { useAuth } from "context/AuthProvider";

const IndexPage = () => {
  const user = useAuth();
  return (
    <PageContainer height="100vh" w="100%">
      {user && <MyDay />}
    </PageContainer>
  );
};

export default IndexPage;
