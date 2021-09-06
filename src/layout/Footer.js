import React from "react";
import "antd/dist/antd.css";
import "./Content.css";

export function FooterDetail() {
  return (
    <div
      style={{ padding: 24, minHeight: 380 }}
    >
      <footer class="section-footer bg-secondary">
        <div class="container">
          <section class="footer-top padding-y-lg text-white">
            <div class="row">
              <aside class="col-md col-6">
                <h6 class="title">Brands</h6>
                <ul class="list-unstyled">
                  <li>

                    <a href="http://localhost:3000">Adidas</a>
                  </li>
                  <li>

                    <a href="http://localhost:3000/">Puma</a>
                  </li>
                  <li>

                    <a href="http://localhost:3000/">Reebok</a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/">Nike</a>
                  </li>
                </ul>
              </aside>
              <aside class="col-md col-6">
                <h6 class="title">Company</h6>
                <ul class="list-unstyled">
                  <li>

                    <a href="http://localhost:3000/">About us</a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/">Career</a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/">Find a store</a>
                  </li>
                  <li>

                    <a href="http://localhost:3000/">Rules and terms</a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/">Sitemap</a>
                  </li>
                </ul>
              </aside>
              <aside class="col-md col-6">
                <h6 class="title">Help</h6>
                <ul class="list-unstyled">
                  <li>
                    <a href="http://localhost:3000/">Contact us</a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/">Money refund</a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/">Order status</a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/">Shipping info</a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/">Open dispute</a>
                  </li>
                </ul>
              </aside>
              <aside class="col-md col-6">
                <h6 class="title">Account</h6>
                <ul class="list-unstyled">
                  <li>
                    <a href="http://localhost:3000/"> User Login </a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/"> User register </a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/"> Account Setting </a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/"> My Orders </a>
                  </li>
                </ul>
              </aside>
              <aside class="col-md">
                <h6 class="title">Social</h6>
                <ul class="list-unstyled">
                  <li>
                    <a href="http://localhost:3000/">
                      <i class="fab fa-facebook"></i> Facebook
                    </a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/">
                      <i class="fab fa-twitter"></i> Twitter
                    </a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/">
                      <i class="fab fa-instagram"></i> Instagram
                    </a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/">
                      <i class="fab fa-youtube"></i> Youtube
                    </a>
                  </li>
                </ul>
              </aside>
            </div>
          </section>

          <section class="footer-bottom text-center">
            <p class="text-muted">
              &copy; 2021 Company name, All rights reserved
            </p>
            <br />
          </section>
        </div>
      </footer>
    </div>
  );
}
