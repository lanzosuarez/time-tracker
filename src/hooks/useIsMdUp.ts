import { useBreakpointValue } from "@chakra-ui/react";

// because im using this ina lot of places, ive decided to make a hook for this
const useIsMdUp = () => useBreakpointValue({ base: false, md: true }, "md");

export default useIsMdUp;
