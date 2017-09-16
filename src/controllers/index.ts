import { Home } from './home.js'

export interface ControllersI {
    home: Home
}

export let controllers: ControllersI = {
    home: Home.instance
}