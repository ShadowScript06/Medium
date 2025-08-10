
import SignInForm from '../components/SignInForm'
import Quote from '../components/Quote'

function Signin() {
  return (
     <div className='flex justify-between w-full'>
        <SignInForm/>
        <Quote/>
    </div>
  )
}

export default Signin