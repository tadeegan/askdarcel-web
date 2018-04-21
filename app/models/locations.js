// import { get } from 'utils/DataService';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default: return state;
  }
}

// Turn a resource into a location - with schedule and address
export function parseLocationInformation(name, address, schedule) {
  return {
    id: address.id,
    address,
    name,
    schedule,
  };
}
