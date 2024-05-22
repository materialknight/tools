'use strict'

if ("serviceWorker" in navigator)
{
   try
   {
      navigator.serviceWorker.register('./sw.js')
   } catch (error)
   {
      console.error(`Your browser seems to support service workers, but the registration of this app's worker failed with error: ${error}`)
   }
} else
{
   console.error('Service Workers are not supported by your browser.')
}

function createLi(task) {

   const li = document.createElement('li')
   const span = document.createElement('span')
   const deleteBtn = document.createElement('button')

   span.innerText = task
   deleteBtn.innerText = 'delete'

   li.append(span, deleteBtn)

   return li
}

const taskInput = document.getElementById('task')
const form = document.forms[0]
const list = document.getElementById('to-do-list')

const STORAGE_KEY = 'to-do-list'

const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []

if (tasks.length > 0)
{
   const docFragment = new DocumentFragment()

   for (const task of tasks)
   {
      docFragment.append(createLi(task))
   }

   list.append(docFragment)
}

form.addEventListener('submit', event => {

   event.preventDefault()

   list.append(createLi(taskInput.value))

   tasks.push(taskInput.value)
   localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))

   form.reset()
})

addEventListener('click', event => {

   switch (event.target.innerText)
   {
      case 'unregister service worker':

         navigator.serviceWorker
            .getRegistration()
            .then(registration => registration.unregister())

         break

      case 'delete cache':
         console.log('hit')

         navigator.serviceWorker
            .getRegistration()
            .then(registration => registration.active.postMessage('delete cache'))

         break

      case 'delete local storage':

         localStorage.clear()

         break

      case 'delete':

         const LIs = Array.from(event.target.parentElement.parentElement.children)
         const entryToDelete = event.target.parentElement.children[0].innerText
         const indexToDelete = LIs.findIndex(li => li.children[0].innerText === entryToDelete)

         LIs[indexToDelete].remove()
         tasks.splice(indexToDelete, 1)
         localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))

         break
   }
})

HTML.li().id('someid').classes().children(
   HTML.span().text('fillertext')
)