import React from "react";

import { PageContainer } from "components/PageContainer";
import AllEntries from "components/AllEntries";
import { useAuth } from "context/AuthProvider";

const EntriesPage = () => {
  const user = useAuth();
  return (
    <PageContainer height="100vh" w="100%">
      {user && <AllEntries />}
    </PageContainer>
  );
};

export default EntriesPage;
