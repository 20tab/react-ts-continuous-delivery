import Enzyme from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'
import 'isomorphic-fetch'

// Enzyme Adapter
Enzyme.configure({ adapter: new EnzymeAdapter() })

// Configure env variables
process.env.API_URL = 'https://localhost:8443'
