import React from "react";

import { PageContainer } from "components/PageContainer";
import ImportantEntries from "components/ImportantEntries";
import { useAuth } from "context/AuthProvider";

const ImportantPage = () => {
  const user = useAuth();
  return (
    <PageContainer height="100vh" w="100%">
      {user && <ImportantEntries />}
    </PageContainer>
  );
};

export default ImportantPage;
