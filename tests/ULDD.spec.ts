import {test} from '@playwright/test'
import{ULandDL} from '../Source/Pages/UploadDownload'

let ud! : ULandDL;

test.beforeEach(async({page})=>{
     ud = new ULandDL(page)
    await ud.Navigation()
})
test('DWD',async({page})=>{
    await ud.Download()
})
test('UPL',async({page})=>{
    await ud.Upload()
})