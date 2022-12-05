import { Text, FormControl, FormLabel, Input, Button  } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useIsDark } from '../../utils/colorMode'

export const initialValues= {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  phone: ""
}

export const validationSchema= yup.object().shape({
  firstName: yup.string().required("First Name is Required."),
  lastName: yup.string().required("Last Name is Required."),
  email: yup.string().email().required(),
  country: yup.string().required(),
  phone: yup.string().required(),
})

export const FormSection= (props)=> {
  const {label, name, type="text", setFieldValue, nationality= []}= props
  const isDark= useIsDark()

  let options= []

  if (nationality.length>0) {
    options= nationality.map(v=> {
      return {
        label: v.nationality,
        value: v.kode
      }
    })
  }

  return (
    <FormControl paddingX="4" color={isDark?"white":"black"}>
      <FormLabel >{label}</FormLabel>
      {type=="select"?
        <Select placeholder="Select Your Nationality" name={name} options={options} onChange={e=> setFieldValue(name, e.label)}selectedOptionStyle="check" />
        :<Field as={Input} name={name} type={type} options={options} height="9" variant="filled" size="md" outlineColor="gray" />
      }
      <ErrorMessage marginTop="2" color="red" name={name} component={Text}   />
    </FormControl>
  )
}

export const CheckoutButton= (props)=> {
  const { text, background, onClick }= props
  const isDark= useIsDark()

  return <Button onClick={onClick} color={isDark?"white":"black"} variant="outline" bgColor={background} width="fit-content" mx="auto" px="7" py="5" _hover={{bgColor: "whatsapp.700", color: "white"}} outline="2px solid #BFA888">{text}</Button>
}