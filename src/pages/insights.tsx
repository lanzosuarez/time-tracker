import React from "react";

import { PageContainer } from "components/PageContainer";
import Insights from "components/Insights";
import { useAuth } from "context/AuthProvider";

const InsightsPage = () => {
  const user = useAuth();
  return (
    <PageContainer height="100vh" w="100%">
      <Insights />
    </PageContainer>
  );
};

export default InsightsPage;
