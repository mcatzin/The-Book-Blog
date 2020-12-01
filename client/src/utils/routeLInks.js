export const RouteLinks = {
  common: [
    {
      icon: 'home',
      text: 'Home',
      link: '/'
    },
    {
      icon: 'sign-in',
      text: 'Log-in',
      link: '/login',
      restricted: true,
    }
  ],
  admin: [
    {
      icon: 'sign-out',
      text: 'Log-out',
      link: '/logout',
    },
    {
      icon: 'clipboard',
      text: 'Admin Posts',
      link: '/admin/posts'
    },
    {
      icon: 'plus',
      text: 'Add posts',
      link: '/admin/posts/create'
    }
  ]
}