export interface DataTravel {
  data: SingleTravel
  pending: Pending
  error: Error
  status: Status
}

export interface SingleTravel {
  __v_isShallow: boolean
  __v_isRef: boolean
  _value: Data[]
}

export interface Data {
  id: string;
  name: string;
  image?: string;
  startDate: string;
  endDate: string;
  description: string;
  price: string;
  reviews: string
  payment?: string;
  notes?: string;
}

export interface Pending {
  __v_isShallow: boolean
  __v_isRef: boolean
  _rawValue: boolean
  _value: boolean
}

export interface Error {
  _key: string
  __v_isRef: boolean
}

export interface Status {
  __v_isShallow: boolean
  __v_isRef: boolean
  _rawValue: string
  _value: string
}

export interface StepsForm {
  steps: DataSteps[];
}


export interface DataSteps {
  step_no: number,
  step_valid: boolean,
  step_skip: boolean;
}

export type dataBooking = DataInfoUser[]

export interface DataInfoUser {
  id: string
  name: string
  surname: string
  age: string
  phone: string
  email: string
  gender: "Male" | "Female" | "Other";
  travel?: Data;
}

export interface FileUpload {
  name: string
  file: File
}


export interface DataThreeSteps {
  payment: string;
  notes: string;
}
 


