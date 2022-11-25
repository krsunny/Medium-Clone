import React from 'react'
import Card from '../Components/UI/Card'
import classes from './ErrorPage.module.css'
import {Link} from 'react-router-dom'

export default function ErrorPage() {
    let user = JSON.parse(localStorage.getItem("values"))
  return (
    <div className='conatoner'>
         <Card className={classes.card}>
            404 Page Not Found. Go to <Link style={{color:'blue',textDecoration:'underline'}} to={user?'/blog':'/'}>Homepage</Link>
        </Card>
    </div>
   
  )
}
