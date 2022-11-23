import { FormLabel } from "@chakra-ui/form-control"
import { Heading, Flex, Box, VStack, List, ListItem } from "@chakra-ui/layout"
import { Text, Checkbox, Button, FormControl, Input, Radio } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { useFormik } from "formik"
import { useEffect } from "react"
import { useState } from "react"
import * as yup from "yup"

const departureInitialValue= {
  passengers: [
    {
      fullname: "",
      country: "",
      phone: "",
      gender: ""
    },
    {
      fullname: "",
      country: "",
      phone: "",
      gender: ""
    },
  ]
}

const validationSchema= yup.object().shape({
  passengers: yup.array().of(yup.object().shape({
    fullname: yup.string().required(),
    country: yup.string().required(),
    phone: yup.string().required(),
    gender: yup.string().required()
  }))
})

const ErrorMessage= ({form, index, keys, text})=> {
  try {
    if (form.errors.passengers?.at(index)[keys] && form.touched.passengers?.at(index)[keys]) {
      return <Text>{text} is Required</Text>
    } 
    throw null
  } catch (e) {
    return null
  }
}

const FormInput= ({children, title})=> {
  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      {children}
    </FormControl>
  )
}

const OrderDetailPage= ()=> {
  const [agreetnc, setAgreetnc]= useState(false)
  const [isReturn, setIsReturn]= useState(true)

  const departureForm= useFormik({
    initialValues: departureInitialValue,
    validationSchema,
    onSubmit: (values)=> {
      console.log(values);
    }
  })

  const returnForm= useFormik({
    initialValues: departureInitialValue,
    validationSchema
  })

  function submitForm() {
    departureForm.handleSubmit()

    if (isReturn) {
      returnForm.handleSubmit()
    }
  }

  useEffect(()=> {
    // departureForm.handleSubmit()
  }, [])

  return (
    <>
      <Flex paddingX={["8", "20"]} pt="10" flexDirection={["column", "row"]} mb="7">

        <Box width={["full", "60%"]} bg="#032340" mr={[0, 6]} p="7" h="fit-content">
          <Text>Passengers</Text>  

          <Box>
            <Text>Destination</Text>
            {
              departureInitialValue.passengers.map((_, k)=> (
                <Box key={k} mb="8">
                  <FormInput title="Fullname">
                    <Input type="text" name={`passengers.${k}.fullname`} value={departureForm.values.passengers[k].fullname} onChange={departureForm.handleChange} />
                    <ErrorMessage form={departureForm} index={k} keys="fullname" text="Fullname" />
                  </FormInput>

                  <FormInput title="Country">
                    <Select></Select>
                    <ErrorMessage form={departureForm} index={k} keys="country" text="Country" />
                  </FormInput>

                  <FormInput title="Mobile Phone">
                    <Input type="number" name={`passengers.${k}.phone`} value={departureForm.values.passengers[k].phone} onChange={departureForm.handleChange} />
                    <ErrorMessage form={departureForm} index={k} keys="phone" text="Mobile Phone" />
                  </FormInput>

                  <FormInput title="Gender">
                    <Radio mr="3" value="male" name={`passengers.${k}.gender`} onChange={departureForm.handleChange} >Male</Radio>
                    <Radio value="female" name={`passengers.${k}.gender`} onChange={departureForm.handleChange} >Female</Radio>
                    <ErrorMessage form={departureForm} index={k} keys="gender" />
                  </FormInput>
                </Box>
              ))
            }
          </Box>

          {isReturn&&<Box>
            <Text>Return</Text>
            <Button onClick={()=> returnForm.setValues(departureForm.values)}>Same as Above</Button>
            {
              departureInitialValue.passengers.map((_, k)=> (
                <Box key={k} mb="8">
                  <FormInput title="Fullname">
                    <Input type="text" name={`passengers.${k}.fullname`} value={returnForm.values.passengers[k].fullname} onChange={returnForm.handleChange} />
                    <ErrorMessage form={returnForm} index={k} keys="fullname" text="Fullname" />
                  </FormInput>

                  <FormInput title="Country">
                    <Select></Select>
                    <ErrorMessage form={returnForm} index={k} keys="country" text="Country" />
                  </FormInput>

                  <FormInput title="Mobile Phone">
                    <Input type="number" name={`passengers.${k}.phone`} value={returnForm.values.passengers[k].phone} onChange={returnForm.handleChange} />
                    <ErrorMessage form={returnForm} index={k} keys="phone" text="Mobile Phone" />
                  </FormInput>

                  <FormInput title="Gender">
                    <Radio mr="3" value="male" name={`passengers.${k}.gender`} onChange={returnForm.handleChange} >Male</Radio>
                    <Radio value="female" name={`passengers.${k}.gender`} onChange={returnForm.handleChange} >Female</Radio>
                    <ErrorMessage form={returnForm} index={k} keys="gender" />
                  </FormInput>
                </Box>
              ))
            }
          </Box>}
        </Box>
        
        <VStack width={["full", "40%"]} bg="#032340" p="7" gap="3" align="left" h="fit-content">
          <Heading size={["lg"]} >Booking Info</Heading>  

          <Box>
            <Text textAlign="center">Booked By</Text>

            <List borderBottom="1px solid #fff">
              <ListItem>Name</ListItem>
              <ListItem>Email</ListItem>
              <ListItem>Nationality</ListItem>
              <ListItem>Phone Number</ListItem>
            </List>
          </Box>

          <Box>
            <Text textAlign="center">Depart</Text>

            <List borderBottom="1px solid #fff">
              <ListItem>Name</ListItem>
              <ListItem>Email</ListItem>
              <ListItem>Nationality</ListItem>
              <ListItem>Phone Number</ListItem>
              <ListItem w="full">
                <Flex justify="space-between">
                  <Text>Ticket Fee</Text>
                  <Text>IDR 300.000</Text>
                </Flex>
              </ListItem>
            </List>
          </Box>

          <Box>
            <Text textAlign="center">Return</Text>

            <List borderBottom="1px solid #fff">
              <ListItem>Name</ListItem>
              <ListItem>Email</ListItem>
              <ListItem>Nationality</ListItem>
              <ListItem>Phone Number</ListItem>
              <ListItem>
                <Flex justify="space-between">
                  <Text>Ticket Fee</Text>
                  <Text>IDR 300.000</Text>
                </Flex>
              </ListItem>
            </List>

            <Flex justify="space-between">
              <Text>Total</Text>
              <Text>IDR 600.000</Text>
            </Flex>
          </Box>

        </VStack>
      </Flex>

      <Flex flex="1" justify="center">
        <Checkbox mr="3" onChange={e=> setAgreetnc(e.target.value)}>I Agree to Terms and Condition</Checkbox>

        <Button onClick={()=> submitForm()}>Proceed to Payment</Button>
      </Flex>
    </>
  )
}

export default OrderDetailPage