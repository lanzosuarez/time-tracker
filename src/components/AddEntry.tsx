import React from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/form-control";
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
} from "@chakra-ui/react";
import { useAuth } from "context/AuthProvider";
import { addNewUserEntry } from "lib/firestore";
import { Entry } from "types";

export type AddEntryFormData = Pick<
  Entry,
  "activity" | "dueDate" | "tags" | "timeSpent"
>;

const AddEntry = () => {
  const user = useAuth();
  const { control, handleSubmit, watch, reset } = useForm<AddEntryFormData>({
    defaultValues: {
      activity: "",
      dueDate: "",
      tags: "",
      timeSpent: "",
    },
  });
  const hasEntryName = !!watch()?.activity?.length;
  const onSubmit = async (data: AddEntryFormData) => {
    reset();
    await addNewUserEntry(data, user);
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
              !hasEntryName ? "1fr" : ["1fr 1fr", "1fr 1fr", "1fr 130px 180px"]
            }
            templateRows={
              !hasEntryName ? ["1fr"] : ["1fr 1fr", "1fr 1fr", "1fr"]
            }
            columnGap="1rem"
          >
            <FormControl
              gridColumn={["1/-1", "1/-1", "1/2", "1/2"]}
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

export default AddEntry;