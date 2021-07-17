import React, { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Stack,
  SimpleGrid,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { Entry } from "types";
import useIsMdUp from "hooks/useIsMdUp";

export type EntryFormData = Pick<
  Entry,
  "activity" | "dueDate" | "tags" | "timeSpent"
>;

interface EntryFormProps {
  onSubmit: (data: EntryFormData) => {};
  defaultValues?: EntryFormData;
}

// Abstracter this entry form so i can reuse this for the future update functionality
const EntryForm: FC<EntryFormProps> = ({
  onSubmit: onSubmitProp,
  defaultValues = {
    activity: "",
    dueDate: "",
    tags: "",
    timeSpent: "0",
  },
}) => {
  const isMdUp = useIsMdUp();
  const { control, handleSubmit, watch, reset } = useForm<EntryFormData>({
    defaultValues,
  });
  const hasEntryName = !!watch()?.activity?.length;
  const onSubmit = async (data: EntryFormData) => {
    reset();
    onSubmitProp(data);
    console.log("entry added");
  };

  return (
    <Box
      id="add__entry"
      boxShadow="sm"
      bgColor="white"
      w="100%"
      p="1rem 2rem 2rem"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="2">
          <SimpleGrid
            rowGap={[2, 2, 0, 0]}
            templateColumns={
              !hasEntryName ? "1fr" : isMdUp ? "1fr 130px 180px" : "1fr 1fr"
            }
            templateRows={!hasEntryName ? "1fr" : isMdUp ? "1fr" : "1fr 1fr"}
            columnGap="1rem"
          >
            <FormControl
              gridColumn={isMdUp ? "1/2" : "1/-1"} // if md up extend to column 2
              isRequired
              id="entry"
            >
              <FormLabel>Activity</FormLabel>
              <Controller
                name="activity"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="e.g Learning Docker"
                    {...field}
                  />
                )}
              />
            </FormControl>
            {hasEntryName && (
              <>
                <FormControl isRequired id="timeSpent">
                  <FormLabel>Hours Spent</FormLabel>
                  <Controller
                    name="timeSpent"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <NumberInput {...field} precision={1} step={0.5}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    )}
                  />
                </FormControl>
                <FormControl id="duration">
                  <FormLabel>Due Date</FormLabel>
                  <Controller
                    name="dueDate"
                    control={control}
                    render={({ field }) => <Input type="date" {...field} />}
                  />
                </FormControl>
              </>
            )}
          </SimpleGrid>
          {hasEntryName && (
            <>
              <FormControl mt="1rem" id="tags">
                <FormLabel>Tags</FormLabel>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="e.g learning,bug-fixing"
                      {...field}
                    />
                  )}
                />
                <FormHelperText>Separate them with commas</FormHelperText>
              </FormControl>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export default EntryForm;
