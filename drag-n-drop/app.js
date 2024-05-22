'use strict'

const tabs = document.querySelectorAll('.tab')
const articles = document.querySelectorAll('article')
const navBtns = document.querySelector('nav')
const ul = document.querySelector('ul')

navBtns.addEventListener('click', event => {

   if (event.target.classList.contains('tab'))
   {
      for (const tab of tabs)
      {
         if (event.target.innerText === tab.innerText)
         {
            tab.classList.remove('inactive')
         }
         else
         {
            tab.classList.add('inactive')
         }
      }

      for (const article of articles)
      {
         if (event.target.innerText === article.children[0].innerText)
         {
            article.classList.replace('inactive', 'active')
         }
         else
         {
            article.classList.replace('active', 'inactive')
         }
      }

      return
   }
}, { passive: true })

ul.addEventListener('dragstart', event => {

   event.dataTransfer.clearData()

   if (event.target.tagName === 'LI')
   {
      const draggedIndex = Array
         .from(ul.children)
         .findIndex(element => element.innerText === event.target.innerText)

      event.dataTransfer.setData('text/html', draggedIndex)
   }
}, { passive: true })

ul.addEventListener('dragover', event => {

   event.preventDefault()

   event.dataTransfer.dropEffect = 'move'
})

ul.addEventListener('drop', event => {

   event.preventDefault()

   const draggedIndex = event.dataTransfer.getData('text/html')
   const draggedElement = ul.children[draggedIndex]

   const refElement = event.target
   const rect = refElement.getBoundingClientRect()
   const rectMiddleY = rect.top + (rect.height / 2)

   const dropPoint = event.clientY

   if (dropPoint < rectMiddleY)
   {
      refElement.insertAdjacentElement('beforebegin', draggedElement)
   }
   else
   {
      refElement.insertAdjacentElement('afterend', draggedElement)
   }
})


