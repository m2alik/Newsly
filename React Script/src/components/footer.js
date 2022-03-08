import React, { Component } from 'react'

import  './footer.css'
class Footer extends Component {
    constructor(){
        super()
    }

    render() {
        return (
        <div className='footer'>
                <footer class="footer">
     <div class="container">
      <div class="row">
        <div class="footer-col">
          <h4>Loisirs</h4>
          <ul>
            <li><a href="#">Lecture</a></li>
            <li><a href="#">Handball</a></li>
            <li><a href="#">Musique</a></li>
            <li><a href="#">Coaching</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="#">1minehb@gmail.com</a></li>
            <li><a href="#">+213-774-910-540</a></li>
            <li><a href="#">Cité 40 logts Larbaa Nath Irathen Tizi Ouzou</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Carriére</h4>
          <ul>
            <li><a href="#">CSNI</a></li>
            <li><a href="#">ISC</a></li>
            <li><a href="#">HBCTO</a></li>
            <li><a href="#">JSA</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>follow us</h4>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
     </div>
  </footer>
        </div>
        )
    }
}


export default Footer;
