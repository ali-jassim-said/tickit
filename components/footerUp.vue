<template>
  <div class="footerUp">
    <div class="img container">
      <img src="/img/Object.png" alt="" />
      <div class="text">
        <h2>Lorem ipsum dolor sit amet consectetur.</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur. Curabitur morbi est euismod mi
          sed morbi odio feugiat convallis. Phasellus blandit donec turpis
          adipiscing. Sed interdum leo in scelerisque elementum massa eros morbi
          lectus. Malesuada vivamus nec pharetra interdum molestie.
        </p>
        <div class="pay">
          <button>
            <img src="/img/Mobile app store badge.png" alt="">
          </button>
          <button>
            <img src="/img/Mobile app store badge.png" alt="">
          </button>
        </div>
      </div>
    </div>
    <div class="footer-down">
      <div class="one">
        <div class="logo">
          <img src="/img/logoFooter.png" alt="" />
        </div>
        <div class="text">
          <div>Site map <span>|</span></div>
          <div>Terms & Conditions <span>|</span></div>
          <div>Accessibility <span>|</span></div>
          <div>Legal <span>|</span></div>
          <div>Privacy Policy</div>
        </div>
      </div>
      <div class="two">
        <div class="text">
          <p>Copyright © 2024 Alphabet Co.</p>
          <p>All rights reserved</p>
        </div>
        <div class="icons">
          <i class="ri-twitter-fill"></i>
          <i class="ri-twitter-fill"></i>
          <i class="ri-twitter-fill"></i>
          <i class="ri-twitter-fill"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footerUp {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.footerUp .img img {
  width: 242.24px;
}

.footerUp .img {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  height: 488px;
}

.footerUp .img .text {
  width: 50%;
}

.footerUp .img .text h2 {
  color: rgba(29, 35, 41, 1);
  font-size: 48px;
  font-weight: 400;
  line-height: 48px;
  text-align: right;
}

.footerUp .img .text p {
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  text-align: right;
  color: rgba(29, 35, 41, 1);
}

.footerUp .img .text .pay {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
}

.footerUp .img .text .pay button img {
  width: 120px;
height: 40px;
border-radius: 7px;
border: 1px;
border: 1px solid rgba(166, 166, 166, 1);
margin-top: 10px;
}

.footer-down {
  width: 100%;
  padding: 24px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: rgba(20, 20, 23, 1);
  position: absolute;
  bottom: 0;
}

.footer-down .one {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-down .one .text {
  display: flex;
  gap: 24px;
  color: #fff;
  margin-top: 10px;
}

.footer-down .one .text div {
  font-size: 10.1px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  display: flex;
  gap: 16px;
  cursor: pointer;
}

.footer-down .one .text div span {
  color: rgba(255, 255, 255, 0.15);
  height: 10px;
}

.footer-down .two {
  width: 100%;
  height: 56px;
  padding: 12px 78px 12px 78px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #9e499e, #733b8b);
}

.footer-down .two .text {
  display: flex;
  align-items: center;
  gap: 48px;
  color: #fff;
}


.footer-down .two .icons {
  display: flex;
  align-content: center;
  gap: 16px;
  color: #fff;
}

.footer-down .two .icons i {
  cursor: pointer;
}


@media(max-width: 400px){
  .footer-down .two{
    height: 100%;
    flex-direction: column-reverse;
    padding: 12px 60px 12px 60px;
  }

  .footer-down .two .text{
    flex-direction: column;
    gap: 5px;
  }

  .footer-down .two .icons i{
    font-size: 25px;
  }

  .footer-down .one .text div:nth-child(1),
  .footer-down .one .text div:nth-child(3),
  .footer-down .one .text div:nth-child(4){
    display: none;
  }

  .footerUp .img{
    flex-direction: column-reverse;
    height: 100%;
  }

  .footerUp .img .text{
    width: 100%;
  }

  .container {
    padding: 30px 10px;
  }

  .footerUp .img img {
    margin-bottom: 4%;
    height: 524px;
    width: 335px;
  }

  .footerUp .img .text h2{
    margin-bottom: 15px;
  }
}
</style>
