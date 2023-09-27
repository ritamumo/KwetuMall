import { UserAvatarFilled, ShoppingCart } from '@carbon/icons-react';


const Navbar = () =>{
return(

    <nav>
        <ul className='nav'>
        <li>Kwetumall</li>
        <div className="flex">
        <li><UserAvatarFilled /></li>
        <li><ShoppingCart /></li>
        </div>
        </ul>
        <hr/>

    </nav>
)
}

export default Navbar