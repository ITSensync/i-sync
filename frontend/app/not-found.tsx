import React from 'react'
import BasePage from './components/BasePage'
import EmptyPage from './components/EmptyPage'

export default function NotFound() {
  return (
    <BasePage>
      <div>
        <EmptyPage item='Page' image='/page-404.png' size={400}/>
      </div>
    </BasePage>
  )
}
