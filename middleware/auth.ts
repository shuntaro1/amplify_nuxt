import { Auth } from 'aws-amplify'

export default async ({
                        redirect,
                        route
                      }) => {
  const userInfo = await Auth.currentUserInfo()

  if (!userInfo && route.path !== '/signin') {
    redirect('/signin')
  }

  console.log('userInfo', userInfo)
  console.log('route.path', route.path)
  if (userInfo && route.path === '/signin') {
    redirect('/')
  }
}
