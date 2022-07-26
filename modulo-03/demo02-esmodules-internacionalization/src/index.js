import TerminalController from './terminalController.js'
import database from './../database.json'
import Person from './person.js'
import { save } from './repository.js'

const DEFAULT_LANG = "pt-br"
const STOP_TERM = ":q"

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)


async function mainLoop() {
  try {
    const answer = await terminalController.question()
    if(answer === STOP_TERM) {
      terminalController.closeTerminal()
      console.log('process finished!')
      return;
    }

    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANG))
    await save(person)
    return mainLoop()
  } catch (error) {
    console.log('DEU RUIM',error)
    return mainLoop()
  }
}

await mainLoop()