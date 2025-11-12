import{test} from '@playwright/test'
import { Login } from '../Source/Pages/login'
import { search } from '../Source/Pages/search'

test('search',async({page})=>{
    const login = new Login(page)
     const ser = new search(page)
     await login.navigation()
     await ser.SerachFunctionality('Jackets')
})