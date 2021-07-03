import React from "react";

import { PageContainer } from "components/PageContainer";
import PlannedEntries from "components/PlannedEntries";
import { useAuth } from "context/AuthProvider";

const PlannedPage = () => {
  const user = useAuth();
  return (
    <PageContainer height="100vh" w="100%">
      {user && <PlannedEntries />}
    </PageContainer>
  );
};

export default PlannedPage;
