import { Routes } from '@angular/router';
import {Home} from "./pages/home/home";
// import {AllPosts} from "./pages/all-posts/all-posts";
import { About } from './pages/about/about';
// import { Profile } from './pages/profile/profile';
import {MainLayout} from "./pages/main-layout/main-layout";
import { NotFound } from './pages/not-found/not-found';
import { AuthLayout } from './pages/auth-layout/auth-layout';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import {authGuard} from './Guards/auth-guard'

export const routes: Routes = [
    {path:'', component: MainLayout, children:[
        {path:'',redirectTo:'home', pathMatch:'full'},
        {path:'home', component: Home,title:'Home'},
        {path:'about', component: About,title:'About'},
        {path:'profile',loadComponent:() => 
            import('./pages/profile/profile') 
            .then(m => m.Profile),
            canActivate:[authGuard],
            title:'Profile'},
        {path:'all-posts',loadComponent:() => 
            import('./pages/all-posts/all-posts') 
            .then(m => m.AllPosts),
            canActivate:[authGuard],
            title:'All Posts'},
        {path: 'post/:id',
        loadComponent: () =>
          import('./pages/post-details/post-details')
            .then(m => m.PostDetails),
        canActivate: [authGuard],
        title: 'Post Details'
        
      }
    ]},
    {path: '',component: AuthLayout, children:[
        {path: 'login' , component: Login,title:'Login'},
        {path: 'register' , component: Register,title:'Register'},
    ]},
    {path:'**', component:NotFound},
];
    